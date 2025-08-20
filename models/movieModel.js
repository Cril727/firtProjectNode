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
    const [[{ uuid }]] = await Conexion.promise().query(
      "SELECT UUID() AS uuid",
    );

    try {
      await Conexion.promise().query("START TRANSACTION");

      await Conexion.promise().query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
       VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)`,
        [uuid, title, year, director, duration, poster, rate],
      );

      const [rows] = await Conexion.promise().query(
        `SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate
        FROM movie WHERE id = UUID_TO_BIN(?)`,
        [uuid],
      );

      await Conexion.promise().query("COMMIT");

      return rows[0];
    } catch (error) {
      await Conexion.promise().query("ROLLBACK");
      throw new Error("Error al crear la pelicula");
    }
  }

  static async update({ id, input }) {
    const { title, year, director, duration, poster, rate } = input;

    const [result] = await Conexion.promise().query(
      `UPDATE movie
     SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?
     WHERE id = UUID_TO_BIN(?)`,
      [title, year, director, duration, poster, rate, id],
    );

    if (result.affectedRows === 0) return null;

    const [rows] = await Conexion.promise().query(
      `SELECT BIN_TO_UUID(id) AS id, title, year, director, duration, poster, rate
     FROM movie WHERE id = UUID_TO_BIN(?)`,
      [id],
    );

    return rows[0] ?? null;
  }

  // >>> NUEVO: eliminar (con cuidado de FKs) <<<
  static async delete({ id }) {
    try {
      await Conexion.promise().query("START TRANSACTION");

      await Conexion.promise().query(
        `DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?)`,
        [id],
      );

      const [res] = await Conexion.promise().query(
        `DELETE FROM movie WHERE id = UUID_TO_BIN(?)`,
        [id],
      );

      await Conexion.promise().query("COMMIT");
      return res.affectedRows > 0;
    } catch (e) {
      await Conexion.promise().query("ROLLBACK");
      throw new Error("No se pudo eliminar la película");
    }
  }
}
