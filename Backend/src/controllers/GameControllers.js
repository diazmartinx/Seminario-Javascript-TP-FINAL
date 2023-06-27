import Game from "../models/Game.js";
import games from "../data/games.js";

function createGame(req, res) {
  const { player1, player2 } = req.body;
  const game = new Game(player1, player2);
  games.push(game);
  res.status(201).json(game);
}

function listGames(req, res) {
  res.status(200).json(games);
}

function getGameById(req, res) {
  res.status(200).json(req.game);
}

// PLAYER MOVES -------------------------------------------
// Game is passed by middleware -> getGameMiddleware
// Player turn is verified by middleware -> isPlayerTurnMiddleware
// Game and Player are already verified

function rollDice(req, res) {
  const { game } = req;
  let data = game.rollDice();
  delete data.question.answer;
  res.status(200).json(data);
}

function answerQuestion(req, res) {
  const { game } = req;
  const questionId = req.body.questionId;
  const answerIndex = req.body.answerIndex;
  let data = game.answerQuestion(questionId, answerIndex);
  res.status(200).json(data);
}

export default { createGame, getGameById, listGames, rollDice, answerQuestion };
