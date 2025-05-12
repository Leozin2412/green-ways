import config from "./config.js";
import routes from "./routes.js";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(config.port, config.host, () => {
  console.log(`Servidor Rodando em ${config.host}:${config.port}`);
});
