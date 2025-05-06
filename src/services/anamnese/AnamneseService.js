import { prisma } from "../../config/prisma.js"

class AnamneseService{
  async create(data, exame_id){
    // Rota vai ser /anamnese/criar/:exame_id
    // esse exame_id vai verificar o nutri
    const { titulo, conteudo } = data
    
    try{
      const anamnese = await prisma.anamnese.create({
        data:{
          titulo: titulo,
          conteudo: conteudo,
          exame_id: exame_id
        }
      })
      
      return anamnese;
    }catch(error){  
      console.log(error)
      throw new Error("Erro ao criar Anamnese no banco de dados!")
    }
  }
  async update(data, anamnese_id, nutricionista_id){
    const { titulo, conteudo } = data

    try{
      const anamnese = await prisma.anamnese.update({
        where:{
          anamnese_id: anamnese_id
        },
        data:{
          titulo: titulo,
          conteudo: conteudo
        }
      });

      return anamnese
    }catch(error){

      throw new Error("Erro ao atualizar no banco")
    }
  }
  async delete(anamnese_id, nutricionista_id){
    const deletedAnamnese = prisma.anamnese.delete({
      where:{
        anamnese_id: anamnese_id
      }
    });

    return deletedAnamnese;
  }
  async getbyExameId(exame_id, nutricionista_id){

  }
}
export default new AnamneseService();