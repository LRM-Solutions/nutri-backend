import { Router } from "express";
import sessionController from "./controllers/SessionController.js";
import PacienteController from "./controllers/PacienteController.js";
import ExameController from "./controllers/ExameController.js";
import AuthMiddleware from "./middlewares/auth.js";
import AntropometriaController from "./controllers/antropometria/AntropometriaController.js";
import DadosBasicosController from "./controllers/antropometria/DadosBasicosController.js";
import BioImpedanciaController from "./controllers/antropometria/BioImpedanciaController.js"
import AnamnesePerguntasController from "../src/controllers/anamnese/AnamnesePerguntasController.js"
import AnamneseController from "../src/controllers/anamnese/AnamneseController.js"
import DobrasCutaneasController from "./controllers/antropometria/DobrasCutaneasController.js";
import CircunferenciasController from "./controllers/antropometria/CircunferenciasController.js";
import DiametroOsseoController from "./controllers/antropometria/DiametroOsseoController.js";

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

routes.post(
  "/cadastro-paciente",
  AuthMiddleware,
  PacienteController.cadastrarPaciente
);
/// ======================
/// =     PACIENTE      =
/// ======================


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


/// ======================
/// = Dobras Cutaneas    =
/// ======================

routes.post("/antropometria/:antropometria_id/dobrasCutaneas",
  AuthMiddleware,
  DobrasCutaneasController.criar
)

routes.put("/antropometria/dobrasCutaneas/:dobraCutanea_id",
  AuthMiddleware,
  DobrasCutaneasController.update
)

routes.delete("/antropometria/dobrasCutaneas/:dobraCutanea_id",
  AuthMiddleware,
  DobrasCutaneasController.deletar
)

/// ======================
/// =   CIRCUNFERÊNCIA   =
/// ======================

routes.post("/antropometria/:antropometria_id/circunferencia",
  AuthMiddleware,
  CircunferenciasController.criar
)

routes.put("/antropometria/circunferencia/:circunferencia_id",
  AuthMiddleware,
  CircunferenciasController.update
)
  
routes.delete("/antropometria/circunferencia/:circunferencia_id",
  AuthMiddleware,
  CircunferenciasController.deletar
)

/// ======================
/// =   Diametro Osseo   =
/// ======================

routes.post("/antropometria/:antropometria_id/diametro-osseo",
  AuthMiddleware,
  DiametroOsseoController.criar
)

routes.put("/antropometria/diametro-osseo/:diametroOsseo_id",
  AuthMiddleware,
  DiametroOsseoController.update
)

routes.delete("/antropometria/diametro-osseo/:diametroOsseo_id",
  AuthMiddleware,
  DiametroOsseoController.delete
)

/// ======================
/// ANAMNESE PERGUNTAS   =
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

/// ======================
///  =     ANAMNESE    =
/// ======================

routes.post("/criar-anamnese/", 
  AuthMiddleware, 
  AnamneseController.criar
)

routes.put("/editar-anamnese/:anamnese_id", 
  AuthMiddleware, 
  AnamneseController.editar
)

routes.delete("/deletar-anamnese/:anamnese_id",
  AuthMiddleware,
  AnamneseController.deletar
)


export default routes;
