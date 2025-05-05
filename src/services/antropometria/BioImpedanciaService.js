import { prisma } from "../../config/prisma.js";

// Para evitar repetição de código 
// Pode separar essa verificação ( dos selects ) que faz 
// requisição ao banco em
// Um Arquivo separado.

class BioImpedanciaService{
  async criar(data, nutricionista_id, antropometria_id){

    // Vai validar o nutricionista_id com o exame

    const ExistenteBioImpedancia = await prisma.bioimpedancia.findUnique({
      where:{
        antropometria_id: antropometria_id
      }
    });
    
    if(ExistenteBioImpedancia){
      throw new Error("Erro! Já existe um registro de dados para essa Antropometria. Os edite se necessário!")
    }

    const BioImpedancia = await prisma.bioimpedancia.create({
      data:{
        ...data,
        antropometria_id: antropometria_id
      }
    }) 

    if(!BioImpedancia){
      throw new Error("Erro ao criar no banco de dados")
    }

    return BioImpedancia;
  }
  async update(data, nutricionista_id, bioimpedancia_id){
    const resultado = await prisma.bioimpedancia.findUnique({
      where: {
        bioimpedancia_id: bioimpedancia_id
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

    const nutricionista_id_encontrado = resultado?.antropometria?.Exame?.nutricionista_id

    if (nutricionista_id_encontrado !== nutricionista_id) {
      throw new Error("Erro! A bioimpedância pertence a outro nutricionista!");
    }

    // Faz o update
    const updatedBioimpedancia = await prisma.bioimpedancia.update({
      where:{
        bioimpedancia_id: bioimpedancia_id
      },
      data:{
        ...data
      }
    });
    
    return updatedBioimpedancia;
  }
  async delete(nutricionista_id, bioimpedancia_id){
    
    const resultado = await prisma.bioimpedancia.findUnique({
      where: {
        bioimpedancia_id: bioimpedancia_id
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
  
    if (nutricionista_id_encontrado !== nutricionista_id) {
      throw new Error("Erro! A bioimpedância pertence a outro nutricionista!");
    }

    // Nutri validado só excluir agora

    const deletedBioimpedancia = await prisma.bioimpedancia.delete({
      where:{
        bioimpedancia_id: bioimpedancia_id
      }
    });

    return deletedBioimpedancia;
  }
}

export default new BioImpedanciaService();