import * as Yup from "yup";
import CircunferenciasServices from "../../services/antropometria/CircunferenciasService.js"

class CircunferenciasController {
  async criar(req,res){
    const antropometria_id = parseInt(req.params.antropometria_id)
    const nutricionista_id = req.userId

    const schema = Yup.object().shape({
      
    });

    try{
      await schema.validate(req.body, { abortEarly: false });

      const Circunferencias = await CircunferenciasServices.create(req.body, antropometria_id, nutricionista_id);

      return res.status(201).json(DobrasCutaneas)
    }catch(error){
      console.log(error)
      return res.status(400).json(error);
    }
  }
  async update(req,res){
  }
  async deletar(req,res){
  }
}
  
export default new CircunferenciasController();
  