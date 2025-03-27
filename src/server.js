import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const server = app.listen(3333);

if (server) {
  console.log("Servidor rodando na porta 3333");
}
