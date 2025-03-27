// sessionController.js
import ExameService from "../services/ExameService.js";
import * as Yup from "yup";
class ExameController {
  async agendarExame(req, res) {
    const nutricionista_id = req.userId;
    const schema = Yup.object().shape({
      paciente_id: Yup.string().required("É necessário informar o paciente"),
      exame_data: Yup.date()
        .typeError("A data do exame deve estar no formato válido")
        .required("É necessário informar a data do exame"),
      exame_descricao: Yup.string().required(
        "É necessário informar a descrição do exame"
      ),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const { paciente_id, exame_data, exame_descricao } = req.body;
      const exame = await ExameService.agendarExame(
        nutricionista_id,
        paciente_id,
        exame_data,
        exame_descricao
      );

      return res
        .status(201)
        .json({ message: "Exame agendado com sucesso!", exame });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async listarExames(req, res) {
    const nutricionista_id = req.userId;

    try {
      const exames = await ExameService.listarExames(nutricionista_id);
      return res.status(200).json(exames);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async deletarExame(req, res) {
    const exame_id = parseInt(req.params.exame_id);

    if (isNaN(exame_id)) {
      return res
        .status(400)
        .json({ error: "O ID do exame deve ser um número válido" });
    }

    try {
      await ExameService.deletarExame(exame_id);
      return res.status(200).json({ message: "Exame deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default new ExameController();
