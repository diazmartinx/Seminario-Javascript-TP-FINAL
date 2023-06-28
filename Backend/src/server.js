import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import config from "./config.js";
import game from "./routes/gameRoutes.js";
import lobby from "./routes/lobbyRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Configurar la aplicación Express
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Configurar las rutas de la API
app.use("/api/game", game);
app.use("/api/lobby", lobby);

// Middleware de manejo de errores, siempre debe ir al final de las rutas
app.use(errorMiddleware);

// Puerto del servidor
const port = config.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
