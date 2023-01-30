import express from 'express';
import cors from "cors"
import filmsRouter from "./routes/moviesRouter.js"
import categoryRouter from "./routes/categoryRouter.js"
import commentsRouter from "./routes/commentsRouter.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use(filmsRouter)
app.use(categoryRouter)
app.use(commentsRouter)

app.listen(4000, () => {
    console.log("Executando")
})