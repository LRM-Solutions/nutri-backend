// CRUD disso

import * as Yup from "yup";
import AnamnesePerguntasService from "../../services/anamnese/AnamnesePerguntasService.js"

class AnamnesePerguntasController{
  async create(req,res){
    const nutricionista_id = req.userId;

    const schema = Yup.object().shape({
      titulo: Yup.string().required("O titulo é obrigatório!"),
      conteudo: Yup.string().nullable().notRequired(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
      
      const { titulo, conteudo } = req.body
      
      const anamnesePerguntas = await AnamnesePerguntasService.create(nutricionista_id, titulo, conteudo);
        
      return res.status(201).json(anamnesePerguntas);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  async update(req,res){
    const AnamnesePerguntas_id = parseInt(req.params.anamneseperguntasid);
    const nutricionista_id = req.userId;

    if(!AnamnesePerguntas_id || !nutricionista_id){
      return res.status(400).json({"Error":"Id Nutricionista ou Id da Anamnese não presente!"})
    }

    const schema = Yup.object().shape({
      titulo: Yup.string().notRequired().nullable(),
      conteudo: Yup.string().nullable().notRequired(),
    });

    try{
      await schema.validate(req.body, { abortEarly: false });

      const editedAnamnesePerguntas = await AnamnesePerguntasService.edit(req.body, AnamnesePerguntas_id, nutricionista_id);
      
      return res.status(201).json(editedAnamnesePerguntas);
    }catch(error){
      return res.status(400).json({ error: error.message });
    }

  }
  async delete(req,res){
    const AnamnesePerguntas_id = parseInt(req.params.anamneseperguntasid);
    const nutricionista_id = req.userId;

    if(!AnamnesePerguntas_id || !nutricionista_id){
      return res.status(400).json({"Error":"Id Nutricionista ou Id da Anamnese não presente!"})
    }

    try{
      const deletedAnamnese = await AnamnesePerguntasService.delete(AnamnesePerguntas_id, nutricionista_id);
      
      return res.status(201).json(deletedAnamnese);
    
    }catch(error){
      return res.status(400).json({ error: error.message });
    }
  }
  async getById(req,res){
    // Id do nutricionista vem do midleware
  }
}

export default new AnamnesePerguntasController();