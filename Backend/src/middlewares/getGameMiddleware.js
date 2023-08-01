import Game from "../models/Game.js";
import GameRepository from "../data/GameRepository.js";

async function getGameMiddleware(req, res, next) {
  const { id } = req.params;
  const game = await GameRepository.getGameById(id);

  if (!game) {
    return res.status(404).json({ message: "Game not found" });
  }

  const gameInstance = new Game(game);
  req.game = gameInstance;
  next();
}
export default getGameMiddleware;
