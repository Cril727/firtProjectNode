import { validateMovie, validateUpdateMovie } from "../schemas/movie_schema.js";

export class moviesController {
  constructor({ MovieModel }) {
    this.MovieModel = MovieModel;
  }

  //Mostrar todas las peliculas
  getAll = async (req, res) => {
    const { genre } = req.query;
    const movies = await this.MovieModel.getAll({ genre });
    res.json(movies);
  };

  //Agregar una nueva película
  addMovie = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error:
          "El cuerpo de la petición está vacío o no es JSON válido. Asegúrate de enviar Content-Type: application/json y un JSON válido.",
      });
    }

    const result = validateMovie(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: result.error.flatten().fieldErrors,
      });
    }

    try {
      const newMovie = await this.MovieModel.addMovie({ input: result.data });
      res.status(201).json(newMovie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  //actualizar una pelicula
  updateMovie = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        error:
          "El cuerpo de la petición está vacío o no es JSON válido. Asegúrate de enviar Content-Type: application/json y un JSON válido.",
      });
    }

    const result = validateUpdateMovie(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: "Datos inválidos",
        details: result.error.flatten().fieldErrors,
      });
    }

    const { id } = req.params;

    try {
      const updated = await this.MovieModel.update({ id, input: result.data });
      if (!updated) {
        return res.status(404).json({
          error: "Pelicula no encontrada o sin cambios",
        });
      }

      return res.json(
        {success:true,
          message:"Pelicula actualizada correctamente",
          pelicula:updated
        }
      );

    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };

  deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
      const ok = await this.MovieModel.delete({ id });
      if (!ok) {
        return res.status(404).json({ message: "Pelicula no encontrada" });
      }
      return res.json({ message: "Pelicula eliminada correctamente" });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  };
}
