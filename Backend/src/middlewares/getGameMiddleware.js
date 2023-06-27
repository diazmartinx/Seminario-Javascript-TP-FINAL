import games from "../data/games.js";

function getGameMiddleware(req, res, next) {
  const { id } = req.params;
  const game = games.find((game) => game.id == id);

  if (!game) {
    res.status(404).json({ message: "Game not found" });
  } else {
    req.game = game;
    next();
  }
}

export default getGameMiddleware;