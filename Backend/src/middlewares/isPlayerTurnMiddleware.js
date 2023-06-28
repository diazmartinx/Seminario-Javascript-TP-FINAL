function isPlayerTurnMiddleware(req, res, next) {
  const { game } = req;
  const { playerId } = req.params;
  if (game.playerIdTurn != playerId) {
    return res.status(400).json({ message: "It's not your turn" });
  }
  next();
}

export default isPlayerTurnMiddleware;
