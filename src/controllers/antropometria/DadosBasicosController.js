
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
}
  
  export default new DadosBasicosController();
  