
import asyncHandler from "../middlewares/asyncHandler.js";
import GameService from "../services/GameService.js";

async function createGame(req, res) {
  try {
    const response = await GameService.createGame();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function joinGame(req, res) {
  try {
    const { name, color } = req.body;
    const { gameId } = req.params;
    const response = await GameService.joinGame(name, color, gameId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getGameById(req, res) {
  try {
    const { gameId } = req.params;
    const game = await GameService.getGameById(gameId);
    res.status(200).json(game);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

async function rollDice(req, res) {
  const { game } = req;
  if (game.lastQuestion != null) {
    res.status(400).json({ message: "You must answer a question first" });
  }
  game.rollDice();
  await game.save();
  res.status(200).json({
    message: "Dice rolled",
    diceNumber: game.diceNumber,
  });
}

async function answerQuestion(req, res) {
  try {
    const { game } = req;
    const optionIndex = req.body.optionIndex;
    const response = await GameService.answerQuestion(game, optionIndex);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getPlayerStatus(req, res) {
  try {
    const { game } = req;
    const { playerId } = req.params;
    const response = GameService.getPlayerStatus(game, playerId);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export default {
  createGame: asyncHandler(createGame),
  getGameById: asyncHandler(getGameById),
  rollDice: asyncHandler(rollDice),
  answerQuestion: asyncHandler(answerQuestion),
  joinGame: asyncHandler(joinGame),
  getPlayerStatus: asyncHandler(getPlayerStatus),
};
