import * as Yup from "yup";
import { prisma } from "../config/prisma.js"

class GastosEnergeticosService{
  async create(data, exame_id){
    const schema = Yup.object().shape({
      fator_atividade: Yup.number().integer("Erro! Precisa ser um número inteiro!"),
      
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