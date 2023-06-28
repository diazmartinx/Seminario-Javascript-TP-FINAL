import { db } from "../data/db.js";

async function getGameMiddleware(req, res, next) {
  const { id } = req.params;
  const game = await db.getGameById(id);
  console.log("game", game);

  if (!game) {
    res.status(404).json({ message: "Game not found" });
  } else {
    req.game = game;
    next();
  }
}

export default getGameMiddleware;
