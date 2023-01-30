import {Router} from "express";
import moviesController from "../controllers/moviesController.js";
import { validSchemaMovies } from "../middlewares/moviesMiddleware.js";


const router = Router();

router.post("/movies", validSchemaMovies, moviesController.store);
router.get("/movies", moviesController.getFilmsWithCategories);
router.delete("/movies/:id", moviesController.delete)
router.patch("/movies/:id", moviesController.updateFilm);
router.get("/ranking", moviesController.ranking);

export default router;