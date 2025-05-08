import * as Yup from "yup";
import DobrasCutaneasService from "../../services/antropometria/DobrasCutaneasService.js"

class DobrasCutaneasController {
  async criar(req,res){
    const antropometria_id = parseInt(req.params.antropometria_id)
    const nutricionista_id = req.userId

    const schema = Yup.object().shape({
      tricipal: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      bicipital: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      subescapular: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      suprailiaca: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      abdominal: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      coxa: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      peitoral: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      axiliarMedia: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired()
    });

    try{
      await schema.validate(req.body, { abortEarly: false });

      const DobrasCutaneas = await DobrasCutaneasService.create(req.body, antropometria_id, nutricionista_id);

      return res.status(201).json(DobrasCutaneas)
    }catch(error){
      console.log(error)
      return res.status(400).json(error);
    }
  }
  async update(req,res){
    const dobraCutanea_id = parseInt(req.params.dobraCutanea_id)
    const nutricionista_id = req.userId

    const schema = Yup.object().shape({
      tricipal: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      bicipital: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      subescapular: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      suprailiaca: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      abdominal: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      coxa: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      peitoral: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      axiliarMedia: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired()
    })

    try{
      await schema.validate(req.body, { abortEarly:false });

      const DobrasCutaneas = await DobrasCutaneasService.update(req.body, dobraCutanea_id, nutricionista_id)

      return res.status(200).json(DobrasCutaneas);

    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }
  }
  async deletar(req,res){
    const dobraCutanea_id = parseInt(req.params.dobraCutanea_id)
    const nutricionista_id = req.userId
    
    try{
      const deletedDobras = DobrasCutaneasService.delete(dobraCutanea_id, nutricionista_id)
      
      return res.status(201).json(deletedDobras)
    }catch(error){
      console.log(error)
      return res.status(400).json(error);
    }
  }
}
  
export default new DobrasCutaneasController();
  