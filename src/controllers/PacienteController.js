// sessionController.js
import PacienteService from "../services/PacienteService.js";
import * as Yup from "yup";

class PacienteController {
  async cadastrarPaciente(req, res) {
    const nutricionista_id = req.userId;

    const schema = Yup.object().shape({
      paciente_nome: Yup.string().required("O nome do paciente é obrigatório"),
      paciente_cpf: Yup.string().required("O CPF é obrigatório"),
      paciente_email: Yup.string()
        .email("O e-mail deve ser válido")
        .required("O e-mail é obrigatório"),
      paciente_senha: Yup.string().required("A senha é obrigatória"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
      const { paciente_nome, paciente_cpf, paciente_email, paciente_senha } =
        req.body;
      const paciente = await PacienteService.cadastrarPaciente(
        nutricionista_id,
        paciente_nome,
        paciente_cpf,
        paciente_email,
        paciente_senha
      );
      return res.status(200).json(paciente);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarPacientes(req, res) {
    const nutricionista_id = req.userId;

    try {
      const pacientes = await PacienteService.listarPacientes(nutricionista_id);
      return res.status(200).json(pacientes);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new PacienteController();
