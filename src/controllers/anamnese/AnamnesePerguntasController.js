// CRUD disso

/* model AnamnesePerguntas{
  anamnesePerguntas_id Int @id @default(autoincrement())
  nutricionista_id Int 
  titulo String
  conteudo String?
  data    DateTime @default(now())

  nutricionista Nutricionista @relation(fields: [nutricionista_id], references: [nutricionista_id], onDelete: Cascade)
}
*/

// import anam

class AnamnesePerguntasController{
  async create(req,res){

  }
  async edit(req,res){

  }
  async delete(req,res){

  }
  async getById(req,res){
    // Id do nutricionista vem do midleware
  }
}

export default new AnamnesePerguntasController();