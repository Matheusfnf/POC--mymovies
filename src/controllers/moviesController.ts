import { films } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../database/database.js";


class Films {
  async store(req: Request, res: Response): Promise<void> {
    const { nome, descricao, avaliacao, categoria_id } = req.body as films;
    try {
      await prisma.films.create({
        data: {
          nome,
          descricao,
          avaliacao,
          categoria_id,
        },
      });

      res.status(201).json({ message: "Filme salvo com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao salvar o filme" });
    }
  }

  async getFilmsWithCategories(req: Request, res: Response) {
    try {
      const films = await prisma.films.findMany({
        include: {
          categorias: {
            select: { nome: true },
          },
        },
      });
      res.json(films);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  async updateFilm(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, descricao, avaliacao, categoria_id } = req.body;

    try {
      await prisma.films.update({
        where: { id: Number(id) },
        data: { nome, descricao, avaliacao, categoria_id },
      });
      res.status(200).json({ message: "Filme atualizado com sucesso" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Erro ao atualizar o filme" });
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.films.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Filme deletado com sucesso" });
    } catch (err) {
      res.status(500).send(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  async ranking(req: Request, res: Response) {
    try {
      const films = await prisma.films.findMany({
        orderBy: { avaliacao: "desc" },
      });
      res.json(films);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new Films();
