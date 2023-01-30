import { Request, Response } from "express";
import prisma from "../database/database.js";
import { comentarios } from "../protocols/comments.js";


class Comments {
  async store(req: Request, res: Response): Promise<void> {
    const { autor, filme, comentario } = req.body as comentarios;
    try {
      await prisma.comments.create({
        data: {
          autor,
          filme,
          comentario,
        },
      });

      res.status(201).json({ message: "Comentario salvo com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao comentar" });
    }
  }

  async getComments(req: Request, res: Response): Promise<void> {
    try {
      const films = await prisma.comments.findMany();
      res.json(films);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await prisma.comments.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: "Comentário deletado com sucesso" });
    } catch (err) {
      res.status(500).send(err);
    } finally {
      await prisma.$disconnect();
    }
  }
}

export default new Comments();
