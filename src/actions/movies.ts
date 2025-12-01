"use server"
import { db } from "@/lib/db"
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

    } catch (error: any) {
        console.error("Failed to add movie:", error.message)
        return { success: false, message: `There is an erro :${error.message}`, }
    }


}

export async function getAllMovies() {
    try {

        const result = await db.movie.findMany()
        // console.log("This is data",result)
        return { Movie: result }

    } catch (error: any) {
        console.error("Error while fetching movies", error.message)
        return { success: false, message: `There is Error while fetching  :${error.message}`, }

    }

    //    return {}
}

export async function getShow(movieId: string, date: any) {
    console.log("MovieId", movieId)
    console.log("Date", date)

    const start = new Date(date)
    const end = new Date(new Date(date).setHours(23, 59, 59, 999))

    if (!movieId) {
        throw new Error("Movie id not required ")
    }

    const result = await db.show.findMany({
        where: {
            movieId: movieId,
            startTime: {
                gte: start,
                lt: end
            }


        },
        include: {
            theater: true
            // screen: {
            //     include: {
            //         theater: true
            //     }
            // }

        }
    })

    // console.log("result", result)
    // console.log("result",JSON.stringify(result))

    const formatedData = result.reduce((acc, show): any => {

        // console.log("this is show", show)

        const theaterName = show?.theater?.name
        // console.log("this is show", theaterName)

        if (!acc[theaterName ?? 0]) {

            acc[theaterName ?? 0] = {
                name: show?.theater.name,
                movieId: show.movieId,
                location: show?.theater.location,
                shows: [

                ]
            }
        }

        const obj = {
            startTime: show.startTime,
            showId: show.id
        }

        acc[theaterName ?? 0].shows.push(obj)



        return acc

    }, {})

    // console.log("This is before values ", formatedData)
    const theaterList = Object.values(formatedData)
    // console.log("This is after values ", theaterList)

    // console.log("This is formateData", formatedData)
    return theaterList

}