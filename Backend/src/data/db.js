import fs from "fs/promises";
import path from "path";

//const filePath = path.join(__dirname, "data.json");
const filePath = path.join(process.cwd(), "src/data/data.json");

async function loadJSON() {
  try {
    const json = await fs.readFile(filePath, "utf8");
    return JSON.parse(json);
  } catch (err) {
    console.error("Error al cargar el archivo JSON:", err);
    return {};
  }
}

async function saveJSON(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error al guardar en el archivo JSON:", err);
  }
}

async function getGames() {
  const db = await loadJSON();
  return db.games || [];
}

async function getGameById(id) {
  const db = await loadJSON();
  return db.games.find((game) => game.id == id);
}

async function createGame(game) {
  const db = await loadJSON();
  db.games.push(game);
  await saveJSON(db);
}

async function updateGame(game) {
  const db = await loadJSON();
  db.games = db.games.map((g) => (g.id == game.id ? game : g));
  await saveJSON(db);
}

async function deleteGame(id) {
  const db = await loadJSON();
  db.games = db.games.filter((game) => game.id != id);
  await saveJSON(db);
}

export const db = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
