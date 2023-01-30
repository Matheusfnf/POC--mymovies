import { CommentSchema } from "./../schemas/commentSchema.js";
import { Request, Response, NextFunction } from "express";

export async function validSchemaComments(
  req: Request,
  res: Response,
  next: NextFunction,
  
) {
  const { autor, filme, comentario } = req.body;
  const sendObj = { autor, filme, comentario };

  const validation = CommentSchema.validate(sendObj, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    res.send(errors);
    return;
  }
  next();
}
