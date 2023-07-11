import Game from "../models/Game.js";
import Player from "../models/Player.js";
import { generateRandomId } from "../utils/utils.js";

async function createGame(req, res) {
  const id = generateRandomId();
  const game = new Game({ id });
  Game.create(game);
  res.status(200).json({
    message: "Game created",
    id: game.id,
  });
}

async function joinGame(req, res) {
  try {
    const { name, color } = req.body;
    if (!name || !color) {
      res.status(400).json({ message: "Name and color are required" });
    } else {
      const playerId = generateRandomId();
      const player = new Player(playerId, name, color, 0);
      const game = req.game;
      game.joinGame(player);
      await game.save();
      res.status(200).json({
        message: "Player added to the game",
        gameId: game.id,
        playerId: player.id,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function listGames(req, res) {
  const games = await db.getGames();
  res.status(200).json(games);
}

function getGameById(req, res) {
  res.status(200).json(req.game);
}

// PLAYER MOVES -------------------------------------------
// Game is passed by middleware -> getGameMiddleware
// Player turn is verified by middleware -> isPlayerTurnMiddleware
// Game and Player are already verified

async function rollDice(req, res) {
  const { game } = req;
  game.rollDice();
  await game.save();
  res.status(200).json({
    message: "Dice rolled",
    diceNumber: game.diceNumber,
  });
}

async function answerQuestion(req, res) {
  const { game } = req;
  const optionIndex = req.body.optionIndex;
  let data = game.answerQuestion(optionIndex);
  await game.save();
  res.status(200).json(data);
}

function getPlayerStatus(req, res) {
  const { game } = req;
  const { playerId } = req.params;
  let data = game.getPlayerStatus(playerId);
  res.status(200).json(data);
}

export default {
  createGame,
  getGameById,
  listGames,
  rollDice,
  answerQuestion,
  joinGame,
  getPlayerStatus,
};
