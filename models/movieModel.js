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

  //Agregar una nueva película
  static async addMovie({ title, year, director, genre, duration, poster, rate }) {
    try {
      const sql = "INSERT INTO movie (title, year, director,duration, poster,rate) VALUES (?, ?, ?, ?, ?, ?)";
      const [result] = await Conexion.promise().query(sql, [title, year, director, duration, poster, rate]);

      return { id: result.insertId, title, year, director, genre, duration, poster, rate };

    } catch (error) {
      throw new Error("Error del servidor al agregar")
    }
  }
}    