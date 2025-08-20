import { Conexion } from "./conexion.js";

export class MovieModel {
  static async getAll({ genre }) {
    let sql = "SELECT * FROM movie";
    const params = [];

    if (genre) {
      sql = `
        SELECT m.*
        FROM movie m
        JOIN movie_genres mg ON mg.movie_id = m.id
        JOIN genre g ON g.id = mg.genre_id
        WHERE g.name = ?
      `;
      params.push(genre);
    }

    const [rows] = await Conexion.promise().query(sql, params);
    return rows;
  }

  //Agregar una nueva película
  static async addMovie({ input }) {
    const { title, year, director, duration, poster, rate } = input;

    const [uuidResult] = await Conexion.query("SELECT UUID() uuid");
    const [{ uuid }] = uuidResult;

    try {
      await Conexion.query("START TRANSACTION");

      await Conexion.query(
        `INSERT INTO
                     movie (id, title, year, director,duration, poster,rate) 
                     VALUES (UUID_TO_BIN("${uuid}"),?, ?, ?, ?, ?, ?)`,
        [title, year, director, duration, poster, rate],
      );
    } catch (error) {
      await Conexion.query("ROLLBACK")
      throw new Error("Error al crear la pelicula");
    }

    const [movieNew] = await Conexion.query(
      `SELECT title, year, director,duration, poster,rate,BIN_TO_UUID(id) id
       FROM movie where id = UUID_TO_BIN(?)`,
       [uuid]
    );

    return movieNew
  }

  static async updateMovie({ id }) {
    try {
    } catch (error) {
    }
  }
}
