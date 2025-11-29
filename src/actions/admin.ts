"use server"
import { db } from "@/lib/db"

export async function getListedMovies() {

    const movies = await db.movie.findMany({

        orderBy: {
            createdAt: "desc"
        }
    })

    // console.log(movies)

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
            releaseDate: new Date(movie.releaseDate),
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

export async function addTheater(theaterData: any) {

    console.log("Theareer", theaterData)



    await db.theater.create({
        data: {
            location: theaterData.location,
            name: theaterData.name,
            city: theaterData.city

        }
    })

    // return 0



}

export async function getAllTheater() {

    // console.log("Theareer", theaterData)

    const theaterList = await db.theater.findMany({
        orderBy:{
            createdAt:"desc"}
        
    })

    return theaterList



}

export async function deleteTheater(theaterId: string) {
    try {

        console.log("Theaterid",theaterId)

       const result =  await db.theater.delete({
            where: {
                id: theaterId
            }
        })

    

        return 0

    } catch (error) {
        console.error("Error while deleting the theater", error)
        return 1
    }




}