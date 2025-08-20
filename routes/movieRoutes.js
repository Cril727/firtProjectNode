import { Router } from "express";
import {moviesController}  from "../controllers/moviesController.js"

export const createMovieRouter = ({MovieModel}) =>{

const moviesRouter = Router()
const movieController = new moviesController({MovieModel})

moviesRouter.get("/",movieController.getAll)
moviesRouter.get("/movies",movieController.getAll)
moviesRouter.post("/addMovie", movieController.addMovie)

return moviesRouter

}