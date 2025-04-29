import { prisma } from "../../config/prisma.js";

class AntropometriaService {
  async criarAntropometria(exame_id, nutricionista_id){
    
    const exame = await prisma.exame.findUnique({
      where:{
        exame_id: exame_id,
        nutricionista_id: nutricionista_id
      }
    });
    
    const antropometriaExistente = await prisma.antropometria.findUnique({
      where: {
        exame_id: exame_id
      }
    });

    if (antropometriaExistente) {
      throw new Error("Já existe uma antropometria cadastrada para este exame!");
    }

    if(!exame){
      throw new Error("Usuário não encontrado!");
    }
    
    const antropometria = await prisma.antropometria.create({
      data:{
        exame_id,
        antropometria_data: new Date()
      },
      include:{
        Exame: true
      }
    });
    
    //console.log(antropometria);
    return antropometria;
  }
  async deletarAntropometria(antropometria_id, nutricionista_id){
    // Valida se o exame_id.nutricionista_id = nutricionista_id

    const deletedAntropometria = await prisma.antropometria.delete({
      where:{
        antropometria_id : antropometria_id
      }
    })



  }
}

export default new AntropometriaService();
