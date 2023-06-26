import { generateRandomId } from "../utils/utils";

class Game {
  constructor(player1, player2, board, questions) {
    this.id = generateRandomId();
    this.player1 = player1;
    this.player2 = player2;
    this.board = board;
    this.questions = questions;
  }

  static rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
}

export default Game;
