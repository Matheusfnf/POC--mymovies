import { Router } from "express";
import commentController from "../controllers/commentController.js";
import { validSchemaComments } from "../middlewares/commentsMiddleware.js";


const router = Router();

router.get("/comentarios", commentController.getComments);
router.post("/comentarios", validSchemaComments, commentController.store);
router.delete("/comentarios/:id", commentController.delete);


export default router;
