import { prisma } from "../config/prisma.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
class PacienteService {
  async cadastrarPaciente(
    nutricionista_id,
    paciente_nome,
    paciente_cpf,
    paciente_email,
    paciente_senha
  ) {
    const paciente = await prisma.paciente.findFirst({
      where: { paciente_email: paciente_email },
    });

    if (paciente) {
      throw new Error("Paciente já cadastrado");
    }

    const hashSenha = await bcrypt.hash(paciente_senha, 8);
    const novoPaciente = await prisma.paciente.create({
      data: {
        paciente_nome: paciente_nome,
        paciente_cpf: paciente_cpf,
        paciente_email: paciente_email,
        paciente_senha: hashSenha,
        nutricionista_id: nutricionista_id,
      },
    });

    return novoPaciente;
  }

  async listarPacientes(nutricionista_id) {
    const pacientes = await prisma.paciente.findMany({
      where: { nutricionista_id: nutricionista_id },
    });

    return pacientes;
  }

  async deletarPaciente(paciente_id) {
    const paciente = await prisma.paciente.delete({
      where: { paciente_id: paciente_id },
    });

    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    return paciente;
  }

  async editarPaciente(
    paciente_id,
    paciente_nome,
    paciente_cpf,
    paciente_email
  ) {
    const paciente = await prisma.paciente.update({
      where: { paciente_id: paciente_id },
      data: {
        paciente_nome: paciente_nome,
        paciente_cpf: paciente_cpf,
        paciente_email: paciente_email,
      },
    });

    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    return paciente;
  }

  async buscarPaciente(paciente_id) {
    const paciente = await prisma.paciente.findFirst({
      where: { paciente_id: paciente_id },
    });

    if (!paciente) {
      throw new Error("Paciente não encontrado");
    }

    return paciente;
  }
}

export default new PacienteService();
