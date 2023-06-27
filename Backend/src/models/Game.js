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

    this.questions = questions.map((question) => {
      return new Question(
        question.id,
        question.question,
        question.options,
        question.answer
      );
    });
    this.askedQuestions = [];

    this.board = new Board(this.questions.length, 0, 0);
    this.turn = 1;
    this.playerIdTurn = this.player1.id;
    this.diceNumber = 0;
  }


  rollDice(playerId) {
    if (playerId != this.playerIdTurn) {
      throw new Error("Not your turn");
    }

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
}

export default Game;
