import { prisma } from "../config/prisma.js";

class ExameService {
  async agendarExame(
    nutricionista_id,
    paciente_id,
    exame_data,
    exame_descricao
  ) {
    const exame = await prisma.exame.create({
      data: {
        nutricionista_id,
        paciente_id,
        exame_data,
        exame_descricao,
      },
    });

    return exame;
  }

  async listarExames(nutricionista_id) {
    const exames = await prisma.exame.findMany({
      where: {
        nutricionista_id,
      },
    });

    return exames;
  }

  async deletarExame(exame_id) {
    await prisma.exame.delete({
      where: {
        exame_id,
      },
    });
    return;
  }
}

export default new ExameService();
