import { prisma } from "../../config/prisma.js"
  
/*

  Nessa service vai ter código repetindo 4 vezes
  Como nas outras services
  Então da um jeito

*/

class DadosBasicosService {
  async criar(data, nutricionista_id, antropometria_id){
    
    // Não faço ideia como esse nutricionista_id vai ser validado
    // mas fodase

    const ExistenteDadosBasicos = await prisma.dadosBasicosAntropometria.findUnique({
      where:{
        antropometria_id: antropometria_id
        }
      });

    if(ExistenteDadosBasicos){
      throw new Error("Erro! Já existe um registro de dados para essa Antropometria. Os edite se necessário!")
    }

    const DadosBasicos = await prisma.dadosBasicosAntropometria.create({
        data:{
          ...data,
          antropometria_id: antropometria_id
        }
      });

    if(!DadosBasicos){
      throw new Error("Erro ao criar no banco de dados")
    }

    return DadosBasicos
  }
  async update(data, nutricionista_id, dadobasico_id ){
    const resultado = await prisma.dadosBasicosAntropometria.findUnique({
      where: {
        dadobasico_id: dadobasico_id 
      },
      select: {
        antropometria:{
          select:{
            Exame:{
              select:{
                nutricionista_id: true
              }
            }
          }
        }
      }
    });

    const nutricionista_id_encontrado = resultado?.antropometria?.Exame?.nutricionista_id;

    if(nutricionista_id_encontrado !== nutricionista_id){
      throw new Error("Erro! Dados básicos pertencem a outro nutricionista!")
    }

    // Faz o update
    const updatedDadosBasicos = await prisma.dadosBasicosAntropometria.update({
      where:{
        dadobasico_id: dadobasico_id
      },
      data:{
        ...data
      }
    });
    
    return updatedDadosBasicos;
  }
  async delete(nutricionista_id, dadobasico_id){
    const resultado = await prisma.dadosBasicosAntropometria.findUnique({
      where: {
        dadobasico_id: dadobasico_id 
      },
      select: {
        antropometria:{
          select:{
            Exame:{
              select:{
                nutricionista_id: true
              }
            }
          }
        }
      }
    });

    const nutricionista_id_encontrado = resultado?.antropometria?.Exame?.nutricionista_id;

    if(nutricionista_id_encontrado !== nutricionista_id){
      throw new Error("Erro! Dados básicos pertencem a outro nutricionista!")
    }

    const deletedDadosBasicos = await prisma.dadosBasicosAntropometria.delete({
      where:{
        dadobasico_id: dadobasico_id
      }
    });

    return deletedDadosBasicos;
  }
}
  
  export default new DadosBasicosService();
  