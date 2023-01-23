import express from 'express';
import cors from "cors"
import filmsRouter from "./routes/moviesRouter.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use(filmsRouter)

app.listen(4000, () => {
    console.log("Executando")
})