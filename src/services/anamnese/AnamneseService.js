import { prisma } from "../../config/prisma.js"

class AnamneseService{
  async create(titulo, conteudo, exame_id){
    // Rota vai ser /anamnese/criar/:exame_id
    // esse exame_id vai verificar o nutri
  }
  async update(){

  }
  async delete(){

  }
}
export default new AnamneseService();