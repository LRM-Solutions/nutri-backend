import { Router } from "express";
import sessionController from "./controllers/SessionController.js";
import PacienteController from "./controllers/PacienteController.js";
import ExameController from "./controllers/ExameController.js";
import AuthMiddleware from "./middlewares/auth.js";
import AntropometriaController from "./controllers/antropometria/AntropometriaController.js";
import DadosBasicosController from "./controllers/antropometria/DadosBasicosController.js";
import BioImpedanciaController from "./controllers/antropometria/BioImpedanciaController.js"
import AnamnesePerguntasController from "../src/controllers/anamnese/AnamnesePerguntasController.js"

const routes = new Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ ok: true });
});

/// ======================
/// =       Session      =
/// ======================


routes.post("/cadastro-nutri", sessionController.cadastroNutri);
routes.post("/login-nutri", sessionController.loginNutri);
routes.post("/login-paciente", sessionController.loginPaciente);

/// ======================
/// =     PACIENTE      =
/// ======================


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

/// ======================
/// =       EXAMES      =
/// ======================


routes.post("/agendar-exame", AuthMiddleware, ExameController.agendarExame);

routes.post("/listar-exames", AuthMiddleware, ExameController.listarExames);

routes.delete(
  "/deletar-exame/:exame_id",
  AuthMiddleware,
  ExameController.deletarExame
);

routes.get('/listar-exames-por-paciente/:paciente_id', AuthMiddleware, ExameController.listarExameById )

/// ======================
/// =   ANTROPOMETRIA   =
/// ======================

routes.post("/exames/:exame_id/criar-antropometria",
  AuthMiddleware,
  AntropometriaController.criarAntropometria
);

routes.delete("/exames/deletar-antropometria/:antropometria_id",
  AuthMiddleware,
  AntropometriaController.deletarAntropometria
);


/// ======================
/// =   DADOS BASICOS   =
/// ======================

routes.post("/antropometria/:antropometria_id/dados-basicos",
  AuthMiddleware,
  DadosBasicosController.criar
)

routes.put("/antropometria/dados-basicos/:dadobasico_id",
  AuthMiddleware,
  DadosBasicosController.update
)

routes.delete("/antropometria/dados-basicos/:dadobasico_id",
  AuthMiddleware,
  DadosBasicosController.deletar
)


/// ======================
/// =    BIOIMPEDANCIA   =
/// ======================

routes.post("/antropometria/:antropometria_id/bioimpedancia",
  AuthMiddleware,
  BioImpedanciaController.criar  
)

routes.put("/antropometria/bioimpedancia/:bioimpedancia_id",
  AuthMiddleware,
  BioImpedanciaController.update  
)

routes.delete("/antropometria/bioimpedancia/:bioimpedancia_id",
  AuthMiddleware,
  BioImpedanciaController.delete
)
/*
POST /antropometria/:id/bioimpedancia

POST /antropometria/:id/diametro-osseo
*/

/// ======================
/// =    BIOIMPEDANCIA   =
/// ======================

routes.post("/anamnese-personalizada",
  AuthMiddleware,
  AnamnesePerguntasController.create
)

routes.put("/anamnese-personalizada/:anamneseperguntasid",
  AuthMiddleware,
  AnamnesePerguntasController.update
)

routes.delete("/anamnese-personalizada/:anamneseperguntasid",
  AuthMiddleware,
  AnamnesePerguntasController.delete
)


export default routes;
