import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs";

class SessionService {
  async cadastroNutri(
    nutricionista_nome,
    nutricionista_cpf,
    nutricionista_email,
    nutricionista_senha
  ) {
    const user = await prisma.nutricionista.findFirst({
      where: { nutricionista_email: nutricionista_email },
    });
    if (user) {
      throw new Error("usuário ja existe");
    }

    const hashSenha = await bcrypt.hash(nutricionista_senha, 8);
    const newUser = await prisma.nutricionista.create({
      data: {
        nutricionista_nome: nutricionista_nome,
        nutricionista_cpf: nutricionista_cpf,
        nutricionista_email: nutricionista_email,
        nutricionista_senha: hashSenha,
      },
    });

    return newUser;
  }

  async loginNutri(nutricionista_email, nutricionista_senha) {
    const user = await prisma.nutricionista.findFirst({
      where: { nutricionista_email: nutricionista_email },
    });
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const isPasswordValid = await bcrypt.compare(
      nutricionista_senha,
      user.nutricionista_senha
    );

    if (!isPasswordValid) {
      throw new Error("Falha no login");
    }

    return user;
  }

  async loginPaciente(paciente_email, paciente_senha) {
    const user = await prisma.paciente.findFirst({
      where: { paciente_email: paciente_email },
    });
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }

    const isPasswordValid = await bcrypt.compare(
      paciente_senha,
      user.paciente_senha
    );

    if (!isPasswordValid) {
      throw new Error("Falha no login");
    }

    return user;
  }
}

export default new SessionService();
