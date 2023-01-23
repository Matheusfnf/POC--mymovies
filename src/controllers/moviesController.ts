import { Request, Response } from "express";
import { stringify } from "querystring";
import connection from "../database/database.js";
import { Movie } from "../protocols/movie.js";


class Films {
  

  async store(req: Request, res: Response) {
    const { nome, gênero, descrição, avaliação } = req.body as Movie;
    try {
      await connection.query(
        `INSERT INTO filmes (nome, gênero, descrição, avaliação) VALUES ($1, $2, $3, $4)`,
        [nome, gênero, descrição, avaliação]
      );
      console.log(nome);

      res.status(201).json({ message: "Filme salvo com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao salvar o filme" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const films = await connection.query("SELECT * FROM filmes");
      res.send(films.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao buscar filmes" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, gênero, descrição, avaliação } = req.body as Movie;

    try {
      await connection.query(
        `UPDATE filmes SET nome = $1, gênero=$3, descrição=$4, avaliação=$5 WHERE id = $2`,
        [nome, id, gênero, descrição, avaliação]
      );

      res.status(200).json({ message: "Filme atualizado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao atualizar o filme" });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await connection.query(`DELETE FROM filmes WHERE id = $1`, [id]);
      res.status(200).json({ message: "Filme deletado com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao deletar o filme" });
    }
  }

  async ranking(req: Request, res: Response) {
    try {
      const films = await connection.query(
        "SELECT * FROM filmes ORDER BY avaliação DESC"
      );
      res.send(films.rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao buscar filmes" });
    }
  }
}

export default new Films();
