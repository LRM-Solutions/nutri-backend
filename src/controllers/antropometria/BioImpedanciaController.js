import BioImpedanciaService from "../../services/antropometria/BioImpedanciaService.js";
import * as Yup from "yup";
import { prisma } from "../../config/prisma.js";

class BioImpedanciaController {
  async criar(req,res){
    // Antropometria vem do params
    const schema = Yup.object().shape({
      percent_gordura: Yup.number().integer("Erro! Valor Inteiro").nullable().notRequired(),
      percent_massa_magra: Yup.number().integer("Erro! Valor Inteiro").nullable().notRequired(),
      massa_gorda: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      massa_magra: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      peso_osseo: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      agua_corporal: Yup.number().integer("Erro! Valor Inteiro").nullable().notRequired(),
      idade_metabolica: Yup.number().integer("Erro! Valor Inteiro").nullable().notRequired()
    });     
    
    const antropometria_id = parseInt(req.params.antropometria_id)
    const nutricionista_id = req.userId;

    if(!antropometria_id){
      return res.status(400).json({ error: "Antropometria Id não presente na URL"});
    }
    if(!nutricionista_id){
      return res.status(400).json({ error: "Nutricionista Id não presente no token"});
    }

    try {
      await schema.validate(req.body, { abortEarly: false });
            
      const bioimpedancia = await BioImpedanciaService.criar(req.body, nutricionista_id, antropometria_id);

      if(!bioimpedancia){
        return res.status(404).json({ error: "Não foi possivel completar a requisição!"});
      }
            
      return res.status(201).json(bioimpedancia);
      
    }catch(error) {
      return res.status(400).json({ error: error.message });
    }      
  }
  async update(req,res){
    const schema = Yup.object().shape({
      percent_gordura: Yup.number().integer("Erro! Valor Inteiro").nullable().notRequired(),
      percent_massa_magra: Yup.number().integer("Erro! Valor Inteiro").nullable().notRequired(),
      massa_gorda: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      massa_magra: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      peso_osseo: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      agua_corporal: Yup.number().integer("Erro! Valor Inteiro").nullable().notRequired(),
      idade_metabolica: Yup.number().integer("Erro! Valor Inteiro").nullable().notRequired()
    });     
    const bioimpedancia_id = parseInt(req.params.bioimpedancia_id)
    const nutricionista_id = req.userId;

    if(!bioimpedancia_id){
      return res.status(400).json({ error: "BioImpedancia Id não presente na URL"});
    }
    if(!nutricionista_id){
      return res.status(400).json({ error: "Nutricionista Id não presente no token"});
    }

    try{
      
      await schema.validate(req.body, { abortEarly: false });
        
      const bioimpedancia = await BioImpedanciaService.update(req.body, nutricionista_id, bioimpedancia_id);

      if(!bioimpedancia){
        return res.status(404).json({ error: "Não foi possivel completar a requisição!"});
      }
        
      return res.status(201).json(bioimpedancia);
    }catch(error){
      return res.status(400).json({ error: error.message });
    }
  }
  async delete(req,res){

  }
}
  
export default new BioImpedanciaController();
  