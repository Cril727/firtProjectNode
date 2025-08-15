import { Conexion } from "./conexion.js"

export class MovieModel {
    static async getAll ({genre}) {
        const result = Conexion.query("SELECT * FROM movie")
        console.log(result)
    }
}       