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
      return res
        .status(200)
        .json({ message: "Paciente cadastrado com sucesso!", paciente });
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

  async deletarPaciente(req, res) {
    const paciente_id = parseInt(req.params.paciente_id);

    if (isNaN(paciente_id)) {
      return res
        .status(400)
        .json({ error: "O ID do paciente deve ser um número válido" });
    }

    try {
      await PacienteService.deletarPaciente(paciente_id);
      return res.status(200).json({ message: "Paciente deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async editarPaciente(req, res) {
    const paciente_id = parseInt(req.params.paciente_id);

    if (isNaN(paciente_id)) {
      return res
        .status(400)
        .json({ error: "O ID do paciente deve ser um número válido" });
    }

    try {
      const { paciente_nome, paciente_cpf, paciente_email, paciente_senha } =
        req.body;

      const editarPaciente = await PacienteService.editarPaciente(
        paciente_id,
        paciente_nome,
        paciente_cpf,
        paciente_email
      );

      return res.status(200).json({
        message: "Paciente editado com sucesso!",
        paciente: editarPaciente,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new PacienteController();
