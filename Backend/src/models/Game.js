import Player from "./Player.js";
import Board from "./Board.js";
import Question from "./Question.js";
import QuestionManager from "../data/QuestionManager.js";
import GameRepository from "../data/GameRepository.js";


const GAMESTATUS = {
  LOBBY: "LOBBY",
  STARTED: "STARTED",
  FINISHED: "FINISHED",
};

class Game {
  constructor({
    id,
    status,
    player1,
    player2,
    board,
    turn,
    playerIdTurn,
    diceNumber,
    lastQuestion,
    questions,
    winner,
  }) {
    this.id = id;
    this.status = status || GAMESTATUS.LOBBY;

    this.player1 = player1
      ? new Player(player1.id, player1.name, player1.color, player1.position)
      : null;
    this.player2 = player2
      ? new Player(player2.id, player2.name, player2.color, player2.position)
      : null;

    this.board = board ? new Board(board.totalCells, player1, player2) : null;

    this.turn = turn || 0;

    this.playerIdTurn = playerIdTurn || null;

    this.diceNumber = diceNumber || 0;

    this.lastQuestion = lastQuestion || null;

    this.questions = new QuestionManager();
  }

  static async getGameById(id) {
    const gameData = await GameRepository.getGameById(id);
    return new Game(gameData);
  }

  async save() {
    await GameRepository.updateGame(this);
  }

  joinGame(player) {
    if (this.status !== GAMESTATUS.LOBBY) {
      throw new Error("Game already started");
    } else if (this.status === GAMESTATUS.STARTED) {
      throw new Error("Game is full");
    } else {
      if (!this.player1) {
        this.player1 = player;
      } else {
        this.player2 = player;
      }
      if (this.player1 && this.player2) {
        this.status = GAMESTATUS.STARTED;
        this._startGame();
      }
    }
  }

  _startGame() {
    this.turn = 1;
    this.playerIdTurn = this.player1.id;
    this.diceNumber = 0;
    this.questions = questions.map((question) => {
      return new Question(
        question.id,
        question.question,
        question.options,
        question.answer
      );
    });
    this.board = new Board(this.questions.length, this.player1, this.player2);
  }

  rollDice() {
    this.diceNumber = Math.floor(Math.random() * 6) + 1;
    this._getRandomQuestion();
  }

  _getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    const question = this.questions[randomIndex];
    this.lastQuestion = question;
    this.questions.splice(randomIndex, 1);
    return question;
  }

  answerQuestion(answerIndex) {
    const question = this.lastQuestion;
    const isCorrect = question.answer == answerIndex;

    if (isCorrect) {
      this._movePlayer();
      return true;
    } else {
      this._changeTurn();
      return false;
    }
  }

  _movePlayer() {
    const player = this._getPlayerById(this.playerIdTurn);
    player.move(this.diceNumber);
    if (player.position >= this.board.totalCells) {
      this.status = GAMESTATUS.FINISHED;
      this.winner = player.name;
      this.questions = null;
    } else {
      this._changeTurn();
    }
  }

  _changeTurn() {
    this.turn++;
    // if turn is even, it's player 2 turn, otherwise it's player 1 turn
    this.playerIdTurn = this.turn % 2 == 0 ? this.player2.id : this.player1.id;
    this.lastQuestion = null;
  }

  _getPlayerById(playerId) {
    if (this.player1.id == playerId) {
      return this.player1;
    } else if (this.player2.id == playerId) {
      return this.player2;
    } else {
      return null;
    }
  }

  getPlayerStatus(playerId) {
    const player = this._getPlayerById(playerId);
    const data = {
      status: this.status,
      player,
      turn: this.turn,
      diceNumber: this.diceNumber,
      board: this.board,
      isMyTurn: this.playerIdTurn == playerId,
      lastQuestion: this.lastQuestion,
    };
    return data;
  }
}

export default Game;
