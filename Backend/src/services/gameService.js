import Game from "../models/Game.js";
import Player from "../models/Player.js";
import { generateRandomId } from "../utils/utils.js";
import GameRepository from "../data/GameRepository.js";

class GameService {
  static async createGame() {
    const id = generateRandomId();
    const game = new Game({ id });
    await GameRepository.createGame(game);
    return { message: "Game created", id: game.id };
  }

  static async joinGame(game, name, color) {
    if (!name || !color) {
      throw new Error("Name and color are required");
    }

    const playerId = generateRandomId();
    const player = new Player(playerId, name, color, 0);

    console.log("player", player);
    console.log("game", game);
    if (!game) {
      throw new Error("Game not found here");
    }

    game.joinGame(player);
    await game.save();

    return {
      message: "Player added to the game",
      gameId: game.id,
      playerId: player.id,
    };
  }

  static async getGameById(id) {
    const game = await GameRepository.getGameById(id);
    if (!game) {
      throw new Error("Game not found");
    }
    return game.getGameStatus();
  }

  static async rollDice(game) {
    game.rollDice();
    await game.save();
    return { message: "Dice rolled", diceNumber: game.diceNumber };
  }

  static async answerQuestion(game, optionIndex) {
    const data = game.answerQuestion(optionIndex);
    await game.save();
    return data;
  }
}

export default GameService;
