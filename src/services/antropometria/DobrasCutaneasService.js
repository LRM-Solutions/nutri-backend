import { prisma } from "../../config/prisma.js"

class DobrasCutaneasService{
  async create(data, antropometria_id, nutricionista_id){

    try{
      const DobrasCutaneas = await prisma.dobraCutanea.create({
        data:{
          ...data,
          antropometria_id: antropometria_id,
        }
      });

      return DobrasCutaneas
    }catch(error){
      console.log(error)
      throw new Error("Não foi possível criar Dobra Cutanea")
    }
  }
  async update(data, dobraCutanea_id, nutricionista_id){
    
    // Chama a função para validação

    try{
      const DobrasCutaneas = await prisma.dobraCutanea.update({
        where:{
          dobracutanea_id: dobraCutanea_id
        },
        data:{
          ...data,
          antropometria_id: antropometria_id,
        }
      });
      
      return DobrasCutaneas
    }catch(error){
      console.log(error)
      throw new Error("Error ao dar update no banco")
    }
  }
  async delete(dobraCutanea_id, nutricionista_id){
    
    // Chama a função validação
    //if(valida(nutricionista_id, cutanea))
    
    try{
      const DobrasCutaneas = await prisma.dobraCutanea.delete({
        where:{
          dobracutanea_id: dobraCutanea_id
        }
      });
      
      return DobrasCutaneas
    }catch(error){
      console.log(error)
      throw new Error("Error ao dar delete no banco")
    }
  }
}

export default new DobrasCutaneasService();