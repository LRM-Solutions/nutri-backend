/*dadobasico_id               Int    @id @default(autoincrement())
  antropometria_id  Int    @unique
  tipoPaciente     Int
  altura           Float
  alturaSentado    Float?
  alturaJoelho     Float?
  peso             Float
  sexo             String?
  relatorioAnexo   String?
  dataColeta       DateTime @default(now())*/

import { prisma } from "../../config/prisma.js"
  
class DadosBasicosService {
  async criar(data, nutricionista_id, antropometria_id){
    // Vai ter que acessar o antropometria -> exame -> 
    // Compara o exame.nutricionista_id com o nutricionista_id
    
    const ExistenteDadosBasicos = await prisma.dadosBasicosAntropometria.findUnique({
      where:{
        antropometria_id: antropometria_id
        }
      });

    if(ExistenteDadosBasicos){
      throw new Error("Erro! Já existe um registro de dados para essa Antropometria. Os edite se necessário!")
    }

      
      // Requisita banco

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
  }
  
  export default new DadosBasicosService();
  