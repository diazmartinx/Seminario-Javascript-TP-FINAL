import { Router } from "express";

const router = Router();

//create game
router.post("/game", (req, res) => {
  res.send("create game");
});

//get game by id
router.get("/game/:id", (req, res) => {
  res.send("get game by id");
});

//roll dice and get random question
router.get("/game/:id/roll", (req, res) => {
    res.send("roll dice and get random question");
});

//get random question
router.get("/game/:id/question", (req, res) => {
  res.send("get random question");
});

//answer question
router.post("/game/:id/question/:id/answer", (req, res) => {
  res.send("answer question");
});

export default router;
