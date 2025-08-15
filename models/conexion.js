import mysql from "mysql2"

const config = {
    host:'localhost',
    user:'root',
    port:3307,
    password:'',
    database:'movies_node'
}

export const Conexion = mysql.createConnection(config)