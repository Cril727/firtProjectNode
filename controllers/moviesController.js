import { MovieModel } from "../models/movieModel";

export class moviesController{
    static async getAll (req, res){
        const {genre} = req.query
        const movies = await MovieModel.getAll({genre})
        res.json(movies)
    }
}