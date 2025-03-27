import { Router } from "express";
import sessionController from "./controllers/SessionController.js";
import PacienteController from "./controllers/PacienteController.js";
import AuthMiddleware from "./middlewares/auth.js";
const routes = new Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ ok: true });
});

// Rotas Session Controller

routes.post("/cadastro-nutri", sessionController.cadastroNutri);
routes.post("/login-nutri", sessionController.loginNutri);
routes.post("/login-paciente", sessionController.loginPaciente);

// Rotas de Pacientes

routes.post(
  "/cadastro-paciente",
  AuthMiddleware,
  PacienteController.cadastrarPaciente
);

routes.get(
  "/listar-pacientes",
  AuthMiddleware,
  PacienteController.listarPacientes
);

export default routes;
