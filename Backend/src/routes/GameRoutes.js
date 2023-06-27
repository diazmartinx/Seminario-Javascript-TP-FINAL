import { Router } from "express";
import gameController from "../controllers/GameControllers.js";
import getGameMiddleware from "../middlewares/getGameMiddleware.js";
import isPlayerTurnMiddleware from "../middlewares/isPlayerTurnMiddleware.js";

const game = Router();

// Middleware for all routes related to a game
// Verify if game exists
game.use("/:id", getGameMiddleware);
// Verify if it's the player's turn
game.use("/:id/:playerId", isPlayerTurnMiddleware);
// -------------------------------------------

//create game
game.post("/", gameController.createGame);

//get game by id
game.get("/:id", gameController.getGameById);

//list games
game.get("/", gameController.listGames);

// PLAYER MOVES -------------------------------------------
//roll dice and get random question
game.get("/:id/:playerId/roll", gameController.rollDice);

//answer question
game.post("/:id/:playerId/answer", gameController.answerQuestion);

export default game;
