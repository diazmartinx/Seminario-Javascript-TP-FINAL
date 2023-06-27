import { Router } from "express";
import gameController from "../controllers/GameControllers.js";
import getGameMiddleware from "../middlewares/getGameMiddleware.js";

const game = Router();

// Middleware for all routes related to a game
game.use("/:id", getGameMiddleware);

//create game
game.post("/", gameController.createGame);

//get game by id
game.get("/:id", gameController.getGameById);

//list games
game.get("/", gameController.listGames);

//roll dice and get random question
game.get("/:id/roll", gameController.rollDice);

//get random question
game.get("/:id/question", (req, res) => {
  res.send("get random question");
});

//answer question
game.post("/:id/question/:id/answer", (req, res) => {
  res.send("answer question");
});

export default game;
