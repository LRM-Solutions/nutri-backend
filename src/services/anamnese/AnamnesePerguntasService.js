import { prisma } from "../../config/prisma.js"

class AnamnesePerguntasService{
  async create(nutricionista_id, titulo, conteudo){

    try{
      const anamnesePerguntas = await prisma.anamnesePerguntas.create({
        data:{
          nutricionista_id,
          titulo,
          conteudo
        }
      });

      return anamnesePerguntas

    }catch(error){
      console.log(error)
      throw new Error("Erro ao criar Pergunta para Anamnese")
    }

  }
  async edit(data, anamnesePerguntasId, nutricionista_id){
    // Valida se as perguntas pertencem ao nutri    
    try{
      console.log("ok")
      const validaAnamnese = await prisma.anamnesePerguntas.findUnique({
        where:{
          anamnesePerguntas_id: anamnesePerguntasId
        }
      });
    
      if(validaAnamnese.nutricionista_id != nutricionista_id){
        throw new Error("Erro essa pergunta pertence a outro nutri!");
      }
      
      const { titulo, conteudo } = data;

      const anamnesePerguntas = await prisma.anamnesePerguntas.update({
        where:{
          anamnesePerguntas_id: anamnesePerguntasId
        },
        data:{
          titulo,
          conteudo
        }
      });

      return anamnesePerguntas;

    }catch(error){
      console.log(error)
      throw new Error("Erro ao editar a pergunta!", error)
    }
  }
  async delete(anamnesePerguntasId, nutricionista_id){
    try{
      const validaAnamnese = await prisma.anamnesePerguntas.findUnique({
        where:{
          anamnesePerguntas_id: anamnesePerguntasId
        }
      });
    
      if(validaAnamnese.nutricionista_id != nutricionista_id){
        throw new Error("Erro essa pergunta pertence a outro nutri!");
      }

      const deletedAnamnese = await prisma.anamnesePerguntas.delete({
        where:{
          anamnesePerguntas_id: anamnesePerguntasId
        }
      });

      return deletedAnamnese;
    }catch(error){
      console.log(error)
      throw new Error("Erro ao editar a pergunta!", error)
    }
  }
  async getById(){
    // Id do nutricionista vem do midleware
  }
}

export default new AnamnesePerguntasService();