import { generateRandomId } from "../utils/utils.js";

class Player {
  constructor(name, color) {
    this.id = generateRandomId();
    this.name = name;
    this.color = color;
  }
}

export default Player;
