import express from "express";
import routes from "./routes.js";
import cors from "cors";
import { swaggerSpec, swaggerUi } from "./config/swagger.js";

class app {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use("/api-docas", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    
  }
  routes() {
    this.server.use(routes);
  }
}

export default new app().server;
