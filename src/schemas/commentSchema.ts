import Joi from "joi";

export const CommentSchema = Joi.object({
  autor: Joi.string().required(),
  filme: Joi.string().required(),
  comentario: Joi.string().required().min(3)

});
