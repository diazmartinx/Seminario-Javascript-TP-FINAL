import Lobby from "../models/Lobby.js";
import { lobbies } from "../data/lobbies.js";

async function createLobby(req, res) {
  const lobby = new Lobby();
  lobbies.push(lobby);
  console.log(lobby);
  res.status(201).json(lobby);
}

async function getLobbyById(req, res) {
  const lobby = lobbies.find((lobby) => lobby.id == req.params.id) || {};
  res.status(200).json(lobby);
}

export default { createLobby, getLobbyById };
