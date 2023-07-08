import { generateRandomId } from "../utils/utils.js";

class Player {
  constructor(name, color) {
    this.id = generateRandomId();
    this.name = name;
    this.color = color;
  }

  move(numberOfCells,board) {
    if(this.color === "red"){
      board.player1Position += numberOfCells;
    }
    else {
      board.player2Position += numberOfCells;
    }
  }
}

export default Player;
