import cors from "cors"

export const corsMiddelware = ()=> cors({
    origin:(origin, callback)=>{
        const ACCEPTED_ORIGINS = [
            'http://localhost:8001',
            'http://localhost:8002',
            'http://localhost:8003'
        ]

        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true)
        }

        if(!origin){
            return callback(null, true)
        }

        return callback( new Error("No esta permitido el CORS"))
    }
    
})