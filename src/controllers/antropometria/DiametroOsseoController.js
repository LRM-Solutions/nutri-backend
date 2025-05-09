import * as Yup from "yup";
import DiametroOsseoService from "../../services/antropometria/DiametroOsseoService.js"

class DiametroOsseoController{
  async criar(req, res){
    
    const schema = Yup.object().shape({
      umero: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      punho: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      femur: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      tornozelo: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
      torax: Yup.number().typeError("Erro! Precisa ser um valor quebrado!").nullable().notRequired(),
    });

    const antropometria_id = parseInt(req.params.antropometria_id)

    const nutricionista_id = req.userId;

    try{
      await schema.validate(req.body, { abortEarly : false });

      const DiametroOsseo = await DiametroOsseoService.criar(req.body, nutricionista_id, antropometria_id);

      return res.status(201).json(DiametroOsseo);
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }

  }
  async update(req, res){
    const nutricionista_id = req.userId
    const diametroOsseo_id = parseInt(req.params.diametroOsseo_id) 

    try{
      const updatedDiametroOsseo = await DiametroOsseoService.update(req.body, nutricionista_id, diametroOsseo_id)

      return res.status(201).json(updatedDiametroOsseo)
    }catch(error){
      console.log(error)
      return res.status(400).json(error)
    }

  }
  async delete(req, res){
    const nutricionista_id = req.userId
    const diametroOsseo_id = parseInt(req.params.diametroOsseo_id) 
    
    try{
      const deletedOsseo = await DiametroOsseoService.delete(nutricionista_id, diametroOsseo_id);

      return res.status(201).json(deletedOsseo);
    }catch(error){
      console.log(error)
      return res.status(400).json(error);
    }
  }
}

export default new DiametroOsseoController();
