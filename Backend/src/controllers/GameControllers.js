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

function rollDice(req, res) {
  const game = req.game;
  const playerId = req.query.playerId;
  let data = game.rollDice(playerId);
  delete data.question.answer;
  res.status(200).json(data);
}

export default { createGame, getGameById, listGames, rollDice };
