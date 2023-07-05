import { generateRandomId } from "../utils/utils.js";
import Board from "./Board.js";
import Player from "./Player.js";
import Question from "./Question.js";
import fs from "fs";

const questions = JSON.parse(
  fs.readFileSync("./src/data/questions.json", "utf8")
);

import dbClient from "../data/db.js";

const GAMESTATUS =  {
  LOBBY: 'LOBBY',
  STARTED: 'STARTED',
}

class Game {
  constructor({id, status, player1, player2, board, turn, playerIdTurn, diceNumber, askedQuestions, questions}) {
    this.id = id;
    this.status = status  || GAMESTATUS.LOBBY;
    
    this.player1 =  player1 ? new Player(player1.name,player1.color) : null;
    this.player2 =  player2 ? new Player(player2.name,player2.color) : null;

    this.board =  board ? new Board(board.size, board.player1Position, board.player2Position) : null;

    this.turn = turn || 0;

    this.playerIdTurn = playerIdTurn || null;

    this.diceNumber = diceNumber || 0;

    this.askedQuestions = askedQuestions || [];

    this.questions = questions.map((question) => {
      return new Question(
        question.id,
        question.question,
        question.options,
        question.answer
      );
    });
  }

  static async getGameById(id){
    const game = await dbClient.getGameById(id);
    return new Game(game);
  }

  static async create(game){
    await dbClient.createGame(game);
    return game;
  }

  async save(){
    await dbClient.updateGame(this);
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
    }
    }
  }

  startGame() {
    this.board = new Board(this.questions.length, 0, 0);
    this.turn = 1;
    this.playerIdTurn = this.player1.id;
    this.diceNumber = 0;
    this.askedQuestions = [];
  }


  rollDice() {
    this.diceNumber = Math.floor(Math.random() * 6) + 1;
    const data = {
      diceNumber: this.diceNumber,
      question: this._getRandomQuestion(),
    };

    return data;
  }

  _getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    const question = this.questions[randomIndex];
    this.askedQuestions.push(question);
    this.questions.splice(randomIndex, 1);
    return question;
  }

  answerQuestion(answerIndex) {
    const question = this.askedQuestions[this.askedQuestions.length - 1];
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
    if (player.position >= this.board.size) {
      this.status = GAMESTATUS.FINISHED;
    } else {
      this._changeTurn();
    }
  }
  

  _changeTurn() {
    this.turn++;
    // if turn is even, it's player 2 turn, otherwise it's player 1 turn
    this.playerIdTurn = this.turn % 2 == 0 ? this.player2.id : this.player1.id;
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
      player,
      turn: this.turn,
      diceNumber: this.diceNumber,
      board: this.board,
      isMyTurn: this.playerIdTurn == playerId,
      actualQuestion: this.askedQuestions[this.askedQuestions.length - 1],
    };
    return data;
  }    
}

export default Game;

