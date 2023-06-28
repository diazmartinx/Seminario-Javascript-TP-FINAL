import { generateRandomId } from "../utils/utils.js";

class Lobby {
  constructor() {
    this.id = generateRandomId();
    this.player1 = null;
    this.player2 = null;
  }
}

export default Lobby;
