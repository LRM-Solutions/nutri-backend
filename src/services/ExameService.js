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
  
  async listarExames(nutricionista_id, data_inicio, data_fim) {
    const exames = await prisma.exame.findMany({
      where: {
        nutricionista_id, 
      exame_data:{
        gte: new Date(data_inicio),
        lte: new Date(data_fim),
        }
      },
      include:{
        Paciente: {
          select:{
            paciente_id: true,
            paciente_nome: true,
            /*
            
            Se quiser retornar mais coisa so adicionar aqui

            */  
          }
        }
      },
    });
    // ARRUMA O JSON
    const examesComPaciente = exames.map((exame) => ({
      ...exame,
      paciente_id: exame.Paciente.paciente_id,
      paciente_nome: exame.Paciente.paciente_nome,
      Paciente: undefined,
    }));

    return examesComPaciente;
  }

  async deletarExame(exame_id) {
    await prisma.exame.delete({
      where: {
        exame_id,
      },
    });
    return;
  }
  // Nutricionista tem que ser válidado ainda!

  // !!!!!!!!!!!!!!!!!11
  async listarExameById(nutricionista_id, paciente_id){
    const exames = await prisma.exame.findMany({
      where:{
        paciente_id: paciente_id
      }
    })
    
    return exames;
  }
}

export default new ExameService();
