import Joi from "joi";

export const MovieSchema = Joi.object({
    nome: Joi.string().required(),
    gênero: Joi.string().required(),
    descrição: Joi.string().required(),
    avaliação: Joi.number().required().min(1).max(10),
})