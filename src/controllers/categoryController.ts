import { Request, Response } from "express";
import prisma from "../database/database.js";

class Category {
  

  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const category = await prisma.categorias.findMany();
      res.json(category);
    } catch (err) {
      res.status(500).send(err);
    } finally {
      await prisma.$disconnect();
    }
  }

}

export default new Category();
