
import DadosBasicosService from "../../services/antropometria/DadosBasicosService.js";
import * as Yup from "yup";
  
class DadosBasicosController {
  async criar(req,res){
    // Valida com Yup
    const schema = Yup.object().shape({
      tipoPaciente: Yup.number().integer("Erro! Precisa ser um número inteiro!"),
      altura: Yup.number().typeError("Erro! Precisa ser um valor quebrado!"),
      alturaSentado: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      alturaJoelho: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      peso: Yup.number().typeError("Erro! Precisa ser um valor quebrado!"),
      sexo: Yup.string().nullable().notRequired(),
      relatorioAnexo: Yup.string().nullable().notRequired(), // Vai armazenar o caminho até uploads
    });
    const antropometria_id = parseInt(req.params.antropometria_id)
      
    const nutricionista_id = req.userId;
    
    console.log("nutri",nutricionista_id,"antro",antropometria_id)

    if(!antropometria_id){
      return res.status(400).json({ error: "Antropometria Id não presente na URL"});
    }
    if(!nutricionista_id){
      return res.status(400).json({ error: "Nutricionista Id não presente no token"});
    }

    try {
      await schema.validate(req.body, { abortEarly: false });
        
      const DadosBasicos = await DadosBasicosService.criar(req.body, nutricionista_id, antropometria_id);

      if(!DadosBasicos){
        return res.status(404).json({ error: "Não foi possivel completar a requisição!"});
      }
        
      return res.status(201).json(DadosBasicos);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }      
  }
  async update(req,res){
    const schema = Yup.object().shape({
      tipoPaciente: Yup.number().integer("Erro! Precisa ser um número inteiro!").nullable().notRequired(),
      altura: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      alturaSentado: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      alturaJoelho: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      peso: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      sexo: Yup.string().nullable().notRequired(),
      relatorioAnexo: Yup.string().nullable().notRequired(),
    });

    const dadobasico_id = parseInt(req.params.dadobasico_id)
    const nutricionista_id = req.userId;

    if(!dadobasico_id){
      return res.status(400).json({ error: "BioImpedancia Id não presente na URL"});
    }
    if(!nutricionista_id){
      return res.status(400).json({ error: "Nutricionista Id não presente no token"});
    }

    try{
      await schema.validate(req.body, { abortEarly: false});

      const dadosBasicos = await DadosBasicosService.update(req.body, nutricionista_id, dadobasico_id);
      
      if(!dadosBasicos){
        return res.status(404).json({ error: "Não foi possivel completar a requisição!"});
      }

      return res.status(201).json(dadosBasicos);
    }catch(error){
      return res.status(400)
    }
  }
  async deletar(req,res){
    const nutricionista_id = req.userId;
    const dadobasico_id = parseInt(req.params.dadobasico_id)
    // Service delete vai recebe
    // Nutricionista_id e dadobasico_id

    if(!dadobasico_id){
      return res.status(400).json({ error: "Dado básico Id não presente na URL"})
    }
    if(!nutricionista_id){
      return res.status(400).json({ error: "Nutricionista Id não presente no token"})
    }

    try{
      const dadosBasicos = await DadosBasicosService.delete(nutricionista_id, dadobasico_id);

      if(!dadosBasicos){
        return res.status(404).json({ error: "Não foi possivel completar a requisição "})
      }

      return res.status(201).json(dadosBasicos);
    }catch(error){
      return res.status(400).json({ error: error.message });
    }
  }
}
  
  export default new DadosBasicosController();
  