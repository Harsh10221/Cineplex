"use server"
import { db } from "@/lib/db"
import { readSync } from "fs";
import { revalidatePath } from "next/cache"


interface MovieFormData {
    title: string;
    description: string;
    posterUrl: string;
    trailerUrl: string;
    duration: number;
    releaseDate: string;
    genres: string;
    languages: string;
    certificate: "U" | "UA" | "A" | "S";
    cast: string;
    status: "NOW_SHOWING" | "UPCOMING";
}

export async function addMovie(data: MovieFormData) {

    try {
        if (!data.title || !data.posterUrl) {
            throw new Error("Title and Poster are required")
        }

        await db.movie.create({
            data: {
                title: data.title,
                description: data.description,
                posterUrl: data.posterUrl,
                trailerUrl: data.trailerUrl,
                duration: Number(data.duration), // Ensure it's a number

                // Convert "2025-10-02" string to Date object
                releaseDate: new Date(data.releaseDate),

                genres: data.genres,
                languages: data.languages,
                certificate: data.certificate,
                cast: data.cast,
                status: data.status,
            }
        })

        revalidatePath("/admin/movies")

        return { success: true, message: "Movie added successfully" }

    } catch (error:any ) {
        console.error("Failed to add movie:", error.message)
        return { success: false, message: `There is an erro :${error.message}`, }
    }


}

export async function getAllMovies() {
  try {
    
    const result = await db.movie.findMany()
    console.log("This is data",result)
   return { success: true, message: "Movie Fetched Successfully",Movie:result }
    
  } catch (error:any) {
    console.error("Error while fetching movies",error.message) 
    return { success: false, message: `There is Error while fetching  :${error.message}`, }

  }

//    return {}
}