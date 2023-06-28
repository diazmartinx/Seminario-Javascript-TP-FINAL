import Router from "express";
import lobbyController from "../controllers/lobbyControllers.js";

const lobby = Router();

//create game Lobby
lobby.post("/", lobbyController.createLobby);

//get game by id
lobby.get("/:id", lobbyController.getLobbyById);

export default lobby;
