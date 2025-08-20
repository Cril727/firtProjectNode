import { MovieModel } from "../models/movieModel.js";
import { validateMovie } from "../schemas/movie_schema.js";

export class moviesController{

  constructor({MovieModel}){
    this.MovieModel = MovieModel
  }

    //Mostrar todas las peliculas
    getAll = async (req, res) => {
        const {genre} = req.query
        const movies = await this.MovieModel.getAll({genre})
        res.json(movies)
    }

    //Agregar una nueva película
    addMovie =  async(req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "El cuerpo de la petición está vacío o no es JSON válido. Asegúrate de enviar Content-Type: application/json y un JSON válido." });
    }

    const result = validateMovie(req.body)

    if(result.error){
      return res.status(400).json({error:result.error.message})
    }

    try {
      const newMovie = await MovieModel.addMovie(result);
      res.status(201).json(newMovie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }

  }

  updateMovie = async(req, res)=>{
    
  }
}