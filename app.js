import express, {json} from "express"
import {corsMiddelware} from "./middleware/cors.js"
import {moviesRouter} from "./routes/movieRoutes.js"

const PORT = process.env.PORT ?? 8002

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddelware())

app.use(moviesRouter())

app.listen(PORT,()=>{
    console.log(`http://localhost${PORT}`)
})