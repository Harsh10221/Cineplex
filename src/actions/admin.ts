"use server"
import { db } from "@/lib/db"

export async function getListedMovies() {

    const movies = await db.movie.findMany({

        orderBy: {
            createdAt: "desc"
        }
    })

    return movies

}

export async function deleteMovie(movieId: string) {
    console.log("This is movieid", movieId)

    if (!movieId) {
        throw new Error("Movie id required")
    }

    const result = await db.movie.delete({
        where: {
            id: movieId
        }

    })

    console.log("result", result)

}

export async function editMovieDetails(movie: any) {

    console.log("This is movie data", movie)

    const reuslt = await db.movie.update({
        where: {
            id: movie?.id
        },
        data: {
            title: movie.title,
            description: movie.description,
            posterUrl: movie.posterUrl,
            trailerUrl: movie.trailerUrl,
            duration: movie.duration,
            releaseDate: new Date( movie.releaseDate),
            genres: movie.genres,
            languages: movie.languages,
            certificate: movie.certificate,
            cast: movie.certificate,
            status: movie.status

        }
    })

    let data = 1
    return data


}
