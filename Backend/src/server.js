import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import config from "./config.js";
import game from "./routes/gameRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";

// Cargar variables de entorno desde el archivo .env
dotenv.config();
const corsOptions = {
  origin: "https://seminario-javascript-tp-final.vercel.app",
  credentials: true,
};
// Configurar la aplicación Express
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Configurar las rutas de la API
app.use("/api/game", game);

// Middleware de manejo de errores, siempre debe ir al final de las rutas
app.use(errorMiddleware);

// Puerto del servidor
const port = config.PORT || 3000;

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
