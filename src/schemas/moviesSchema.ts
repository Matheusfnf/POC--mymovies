import Joi from "joi";

export const MovieSchema = Joi.object({
    nome: Joi.string().required(),
    descricao: Joi.string().required(),
    avaliacao: Joi.number().required().min(1).max(10),
    categoria_id: Joi.number().required(),
})