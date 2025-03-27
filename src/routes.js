import { Router } from "express";
import sessionController from "./controllers/SessionController.js";
import PacienteController from "./controllers/PacienteController.js";
import ExameController from "./controllers/ExameController.js";
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

routes.get(
  "/buscar-paciente/:paciente_id",
  AuthMiddleware,
  PacienteController.buscarPaciente
);

routes.delete(
  "/deletar-paciente/:paciente_id",
  AuthMiddleware,
  PacienteController.deletarPaciente
);

routes.put(
  "/editar-paciente/:paciente_id",
  AuthMiddleware,
  PacienteController.editarPaciente
);

// Rotas de Exames

routes.post("/agendar-exame", AuthMiddleware, ExameController.agendarExame);
routes.get("/listar-exames", AuthMiddleware, ExameController.listarExames);
routes.delete(
  "/deletar-exame/:exame_id",
  AuthMiddleware,
  ExameController.deletarExame
);
export default routes;
