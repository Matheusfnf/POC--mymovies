import { stringify } from 'querystring';
import { Request, Response, NextFunction } from "express";
import connection from "../database/database.js";
import { MovieSchema } from "../schemas/moviesSchema.js";
import { Movie } from '../protocols/movie.js';

export async function validSchemaMovies(req: Request,res: Response,next: NextFunction){


const {nome, gênero, descrição, avaliação} = req.body as Movie
const sendObj = { nome, gênero, descrição, avaliação }

const validation = MovieSchema.validate(sendObj, { abortEarly: false });

if (validation.error) {
const errors = validation.error.details.map((detail) => detail.message);
res.send(errors)
return;
}

try{
const existingMovie = await connection.query('SELECT * FROM filmes WHERE nome = $1', [nome]);
if (existingMovie.rows.length > 0) {
res.status(400).json({ error: "Já existe um filme com este nome no banco de dados" });
return;
}

} catch(error){
console.log(error);
res.status(500).json({ error: "Erro ao verificar se o filme já existe no banco de dados" });
}

next();

}
