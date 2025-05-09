import { prisma } from "../../config/prisma.js"

class CircunferenciasService {
  async criar(data, nutricionista_id, antropometria_id){
  
    try{
      const existenteCircunferencia = await prisma.circunferencias.findUnique({
        where:{
          antropometria_id: antropometria_id
        }
      })

      console.log(existenteCircunferencia)

      if(existenteCircunferencia){
        throw new Error("Já existe medidas de circunferências para essa antropometria!")
      }

      const circunferencia = await prisma.circunferencias.create({
        data:{
          ...data,
          antropometria_id: antropometria_id
        }
      });

      return circunferencia;
    }catch(error){
      console.log(error)
      throw new Error("Erro ao criar CircunferÊncia")
    }
  
  }
  async update(data, circunferencia_id, nutricionista_id){
    console.log(circunferencia_id)
    try{
      const circunferencia = await prisma.circunferencias.update({
        where:{
          circunferencias_id: circunferencia_id
        },
        data
      });

      return circunferencia;
    }catch(error){
      console.log(error)
      throw new Error("Erro ao criar CircunferÊncia")
    }
  }
  async deletar(nutricionista_id, circunferencia_id){
    const deleted = await prisma.circunferencias.delete({
      where:{
        circunferencias_id: circunferencia_id
      }
    });
    return deleted
  }
}
  
export default new CircunferenciasService();
  