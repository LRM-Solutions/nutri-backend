import * as Yup from "yup";
import { prisma } from "../config/prisma.js"

class GastosEnergeticosService{
  async create(data, exame_id){
    const schema = Yup.object().shape({
      tipoPaciente: Yup.number().integer("Erro! Precisa ser um número inteiro!"),
      altura: Yup.number().typeError("Erro! Precisa ser um valor quebrado!"),
      alturaSentado: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      alturaJoelho: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      peso: Yup.number().typeError("Erro! Precisa ser um valor quebrado!"),
      sexo: Yup.string().nullable().notRequired(),
      relatorioAnexo: Yup.string().nullable().notRequired(), // Vai armazenar o caminho até uploads
    });
  }
  async update(data,gastosEnergeticos_id){

  }
  async delete(gastosEnergeticos_id){

  }
  async get_by_exame_id(exame_id){

  }
}



export default new GastosEnergeticosService()