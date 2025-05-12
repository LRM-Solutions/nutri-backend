import GastosEnergeticosService from "../services/GastosEnergeticosService.js"

class GastosEnergeticosController{
  async create(req,res){
    const exame_id = parseInt(req.params.exame_id)

    

    try{

      

    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }
  async update(req,res){

  }
  async delete(req,res){

  }
  async get_by_exame_id(req,res){
    const exame_id = parseInt(req.params.exame_id)
  }
}

export default new GastosEnergeticosController()