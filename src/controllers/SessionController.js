import SessionService from "../services/SessionService.js";
import jwt from "jsonwebtoken";
import * as Yup from "yup";

class SessionController {
  async cadastroNutri(req, res) {
    const schema = Yup.object().shape({
      nutricionista_nome: Yup.string().required("O nome é obrigatório"),
      nutricionista_cpf: Yup.string()
        .length(11, "O CPF deve ter 11 dígitos")
        .required("O CPF é obrigatório"),
      nutricionista_email: Yup.string()
        .email("O e-mail deve ser válido")
        .required("O e-mail é obrigatório"),
      nutricionista_senha: Yup.string()
        .min(6, "A senha deve ter no mínimo 6 caracteres")
        .required("A senha é obrigatória"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const {
        nutricionista_nome,
        nutricionista_cpf,
        nutricionista_email,
        nutricionista_senha,
      } = req.body;

      const novoNutricionista = await SessionService.cadastroNutri(
        nutricionista_nome,
        nutricionista_cpf,
        nutricionista_email,
        nutricionista_senha
      );
      const id = novoNutricionista.user_id;

      return res.status(200).json({
        novoNutricionista,
        token: jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" }),
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  async loginNutri(req, res) {
    const schema = Yup.object().shape({
      nutricionista_email: Yup.string()
        .email("O e-mail deve ser válido")
        .required("O e-mail é obrigatório"),
      nutricionista_senha: Yup.string().required("A senha é obrigatória"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const { nutricionista_email, nutricionista_senha } = req.body;

      const user = await SessionService.loginNutri(
        nutricionista_email,
        nutricionista_senha
      );
      const id = user.nutricionista_id;

      return res.status(200).json({
        user,
        token: jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" }),
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  async loginPaciente(req, res) {
    const schema = Yup.object().shape({
      paciente_email: Yup.string()
        .email("O e-mail deve ser válido")
        .required("O e-mail é obrigatório"),
      paciente_senha: Yup.string().required("A senha é obrigatória"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      const { paciente_email, paciente_senha } = req.body;

      const user = await SessionService.loginPaciente(
        paciente_email,
        paciente_senha
      );
      const id = user.paciente_id;

      return res.status(200).json({
        user,
        token: jwt.sign({ id }, process.env.SECRET, { expiresIn: "7d" }),
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

export default new SessionController();
