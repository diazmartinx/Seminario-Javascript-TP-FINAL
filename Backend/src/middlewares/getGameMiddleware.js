import Game from "../models/Game.js";

async function getGameMiddleware(req, res, next) {
  const { id } = req.params;
  const game = await Game.getGameById(id);

  if (!game) {
    res.status(404).json({ message: "Game not found" });
  } else {
    req.game = game;
    next();
  }
}

export default getGameMiddleware;
