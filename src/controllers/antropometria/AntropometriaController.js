// https://chat.deepseek.com/a/chat/s/43df15cf-b3b7-4d2f-bfbf-f6b10fd65639
import AntropometriaService from "../../services/antropometria/AntropometriaService.js";

class AntropometriaController {
  async criarAntropometria(req, res) {
    const exame_id = parseInt(req.params.exame_id)
    const nutricionista_id = req.userId;

    if(isNaN(exame_id)){
      return res.status(400).json({
        error: "O ID deve ser um número válido!"
      })
    }

    try{
      const antropometria = await AntropometriaService.criarAntropometria(exame_id, nutricionista_id);
      if(!antropometria){
        return res.status(404).json({ error: "Não foi possivel completar a requisição!"});
      }
      
      return res.status(201).json(antropometria);
    }catch(error){
      return res.status(400).json({ error: error.message });
    } 
  } 

  async deletarAntropometria(req, res) {
    const antropometria_id = parseInt(req.params.antropometria_id)
    const nutricionista_id = req.userId;

    if(isNaN(antropometria_id)){
      return res.status(400).json({
        error: "O ID deve ser um número válido!"
      })
    }
    
    try{
      const antropometria = await AntropometriaService.deletarAntropometria(antropometria_id, nutricionista_id);
      
      if(!antropometria){
        return res.status(404).json({ error: "Não foi possivel completar a requisição!"});
      }
      
      return res.status(201).json(antropometria);
    }catch(error){
      return res.status(400).json({ error: error.message });
    } 
  }
  
  // Pelo exame_id
  async buscarAntropometria(req,res){

  }
}

export default new AntropometriaController();
