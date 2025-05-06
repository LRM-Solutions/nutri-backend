import * as Yup from "yup";
import AnamneseService from "../../services/anamnese/AnamneseService.js"

class AnamneseController{
  async criar(req,res){
    const nutricionista_id = req.userId

    const schema = Yup.object().shape({
      titulo: Yup.string().required("O titulo é obrigatório!"),
      conteudo: Yup.string().nullable().notRequired(),
    });

    try{
      await schema.validate(req.body, {abortEarly:false})
      console.log("Ok")
      const newAnamnese = await AnamneseService.create(req.body,nutricionista_id)

      return res.status(201).json(newAnamnese)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
    
    // Valida os Dados do Front
    // Titulo
    // Conteúdo
    // Exame Id vem do params provavel


  }
  
  async editar(req,res){
    const nutricionista_id = req.userId
    const anamnese_id = parseInt(req.params.anamnese_id)

    const schema = Yup.object().shape({
      titulo: Yup.string().nullable().notRequired(),
      conteudo: Yup.string().nullable().notRequired(),
    });

    try{
      await schema.validate(req.body, {abortEarly:false})
      console.log("Ok")
      
      const newAnamnese = await AnamneseService.update(req.body, anamnese_id, nutricionista_id)

      return res.status(201).json(newAnamnese)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }
  
  async deletar(req,res){
    const nutricionista_id = req.userId
    const anamnese_id = parseInt(req.params.anamnese_id)
  
    try{
      const deletedAnamnese = await AnamneseService.delete(anamnese_id,nutricionista_id)
    
      return res.status(201).json(deletedAnamnese)
    }catch(error){
      console.log(error)
      return res.status(400).json(error);
    }
  }
}

export default new AnamneseController();