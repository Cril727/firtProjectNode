import express, {json} from "express";
import {corsMiddelware} from "./middleware/cors.js";
import {createMovieRouter} from "./routes/movieRoutes.js";
import { MovieModel } from "./models/movieModel.js"; 
import 'dotenv/config';

const PORT = process.env.PORT ?? 8001

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddelware())

app.use('/api', createMovieRouter({MovieModel}));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/api`);
})