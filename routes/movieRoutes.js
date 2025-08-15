import { Router } from "express";
import {moviesController}  from "../controllers/moviesController.js"
const moviesRouter = Router()

moviesRouter.get("/",moviesController.getAll)
moviesRouter.get("/movies",moviesController.getAll)

export {moviesRouter}