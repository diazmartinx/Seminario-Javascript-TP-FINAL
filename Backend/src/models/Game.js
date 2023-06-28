import { generateRandomId } from "../utils/utils.js";
import Board from "./Board.js";
import Player from "./Player.js";
import Question from "./Question.js";
import fs from "fs";

const questions = JSON.parse(
  fs.readFileSync("./src/data/questions.json", "utf8")
);

class Game {
  constructor(player1, player2) {
    this.id = generateRandomId();

    this.player1 = new Player(player1.name, player1.color);
    this.player2 = new Player(player2.name, player2.color);

    

    this.board = new Board(this.questions.length, 0, 0);
    this.turn = 1;
    this.playerIdTurn = this.player1.id;
    this.diceNumber = 0;
    
    this.askedQuestions = [];
    this.questions = questions.map((question) => {
      return new Question(
        question.id,
        question.question,
        question.options,
        question.answer
      );
    });
    
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

  answerQuestion(questionId, answerIndex) {
    const question = this.askedQuestions.find((q) => q.id == questionId);
    const isCorrect = question.answer == answerIndex;
    const data = {
      isCorrect,
      player1: this.player1,
      player2: this.player2,
    };
    if (isCorrect) {
      this._movePlayer();
    } else {
      this._changeTurn();
    }
    return data;
  }

  _movePlayer() {}

  _changeTurn() {
    this.turn++;
    // if turn is even, it's player 2 turn, otherwise it's player 1 turn
    this.playerIdTurn = this.turn % 2 == 0 ? this.player2.id : this.player1.id;
  }
}

export default Game;
