import { prisma } from "../../config/prisma.js"

class DiametroOsseoService{
  async criar(data, nutricionista_id, antropometria_id){
    // Chama a validação do nutri
    try{
      const DiametroOsseo = await prisma.diametroOsseo.create({
        data:{
          ...data,
          antropometria_id: antropometria_id
        }
      });

      return DiametroOsseo;
    }catch(error){
      throw new Error("Erro ao criar Diametro Osseo!")
    }
  }
  async update(data, nutricionista_id, diametroOsseo_id){
    // validação nutri
    try{
      const updatedOsseo = await prisma.diametroOsseo.update({
        where:{
          diametroOsseo_id: diametroOsseo_id
        },
        data:{
          ...data
        }
      });

      return updatedOsseo;
    }catch(error){
      console.log(error)
      throw new Error("Erro ao editar no banco de dados o diametro Osseo!")
    }
  }
  async delete(nutricionista_id, diametroOsseo_id){
    try{
      const deletedOsseo = await prisma.diametroOsseo.delete({
        where:{
          diametroOsseo_id: diametroOsseo_id
        }
      });

      return deletedOsseo;
    }catch(error){
      console.log(error)
      throw new Error("Erro ao deletar no banco!")
    }
  }
}

export default new DiametroOsseoService();
