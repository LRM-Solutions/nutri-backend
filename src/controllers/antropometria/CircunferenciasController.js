import * as Yup from "yup";
import CircunferenciasServices from "../../services/antropometria/CircunferenciasService.js"

class CircunferenciasController {
  async criar(req,res){
    const antropometria_id = parseInt(req.params.antropometria_id)
    const nutricionista_id = req.userId

    const schema = Yup.object().shape({
      pescoco: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      torax: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      ombro: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      quadril: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      braco_relaxado: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      braco_contraido: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      cintura: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      abdomen: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      antebraco: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      coxa_proximal: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      coxa_medial: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      coxa_distal: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      panturrilha: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
    });

    try{
      await schema.validate(req.body, { abortEarly: false });

      const Circunferencias = await CircunferenciasServices.criar(req.body, antropometria_id, nutricionista_id);

      return res.status(201).json(Circunferencias)
    }catch(error){
      console.log(error)
      return res.status(400).json(error);
    }
  }
  async update(req,res){
    const circunferencia_id = parseInt(req.params.circunferencia_id)
    const nutricionista_id = req.userId

    const schema = Yup.object().shape({
      pescoco: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      torax: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      ombro: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      quadril: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      braco_relaxado: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      braco_contraido: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      cintura: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      abdomen: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      antebraco: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      coxa_proximal: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      coxa_medial: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      coxa_distal: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      panturrilha: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
    });

    try{
      await schema.validate(req.body, { abortEarly: false });

      const Circunferencias = await CircunferenciasServices.update(req.body, circunferencia_id, nutricionista_id);

      return res.status(201).json(Circunferencias)
    }catch(error){
      console.log(error)
      return res.status(400).json(error);
    }
  }
  async deletar(req,res){
    const circunferencia_id = parseInt(req.params.circunferencia_id)
    const nutricionista_id = req.userId

    try{  
      const deleted = await CircunferenciasServices.deletar(nutricionista_id, circunferencia_id)
      return res.status(200).json(deleted)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }
}
  
export default new CircunferenciasController();
  