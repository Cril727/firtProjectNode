import { Router } from "express";
import {moviesController}  from "../controllers/moviesController.js"
const moviesRouter = Router()

moviesRouter.get("/",moviesController.getAll)

export {moviesRouter}