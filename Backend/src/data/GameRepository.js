import fs from "fs/promises";
import path from "path";

const GAMES_DB_PATH = path.join(process.cwd(), "src/data/data.json");

class GameRepository {
  static async getGameById(id) {
    const games = await GameRepository._loadGamesFromDB();
    return games.find((game) => game.id == id);
  }

  static async createGame(game) {
    const games = await GameRepository._loadGamesFromDB();
    games.push(game);
    await GameRepository._saveGamesToDB(games);
  }

  static async updateGame(updatedGame) {
    const games = await GameRepository._loadGamesFromDB();
    const index = games.findIndex((game) => game.id === updatedGame.id);
    if (index !== -1) {
      games[index] = updatedGame;
      await GameRepository._saveGamesToDB(games);
    }
  }

  static async _loadGamesFromDB() {
    try {
      const data = await fs.readFile(GAMES_DB_PATH, "utf8");
      const jsonData = JSON.parse(data);
      console.log("jsonData", jsonData);
      return jsonData;
    } catch (error) {
      console.error("Error reading games database:", error);
      return [];
    }
  }

  static async _saveGamesToDB(games) {
    try {
      await fs.writeFile(GAMES_DB_PATH, JSON.stringify(games, null, 2));
    } catch (error) {
      console.error("Error writing games to database:", error);
    }
  }
}

export default GameRepository;
