import express from "express";
import routes from "./routes.js";
import cors from "cors";
import { swaggerUi, specs } from "../src/config/swagger.js" // importe o Swagger

class app {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }
  routes() {
    this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    this.server.use(routes);
  }
}

export default new app().server;
