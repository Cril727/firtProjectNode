import express, {json} from "express";
import {corsMiddelware} from "./middleware/cors.js";
import {moviesRouter} from "./routes/movieRoutes.js";
import 'dotenv/config';

const PORT = process.env.PORT ?? 8002

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddelware())

app.use('/api', moviesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}/api`);
})