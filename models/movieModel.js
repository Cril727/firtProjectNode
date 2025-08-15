import { Conexion } from "./conexion.js"

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
}    