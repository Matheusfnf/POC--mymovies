import { Request, Response, NextFunction } from "express";
import { MovieSchema } from "../schemas/moviesSchema.js";
import prisma from '../database/database.js';

export async function validSchemaMovies(req: Request,res: Response,next: NextFunction){


const {nome, descricao, avaliacao, categoria_id} = req.body
const sendObj = { nome, descricao, avaliacao, categoria_id }

const validation = MovieSchema.validate(sendObj, { abortEarly: false });

if (validation.error) {
const errors = validation.error.details.map((detail) => detail.message);
res.send(errors)
return;
}

try {
  const existingMovie = await prisma.films.count({ where: { nome } });
  if (existingMovie > 0) {
    res
      .status(400)
      .json({ error: "Já existe um filme com este nome no banco de dados" });
    return;
  }
} catch (error) {
  console.log(error);
  res.status(500).json({
    error: "Erro ao verificar se o filme já existe no banco de dados",
  });
}

next();

}
