import z from "zod";

const movieSchema = z.object({
    title: z.string().min(1),
    year: z.number().int().min(0).max(2030),
    director: z.string().min(1),
    duration: z.number().int().positive(),
    poster: z.string().url(),
    rate: z.number().min(0).max(10)
})

export function validateMovie(input){
    return movieSchema.safeParse(input)
}