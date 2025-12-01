"use server"
import { db } from "@/lib/db"
import { title } from "process"

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
        orderBy: {
            createdAt: "desc"
        }

    })

    return theaterList



}

export async function deleteTheater(theaterId: string) {
    try {

        console.log("Theaterid", theaterId)

        const result = await db.theater.delete({
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

export async function addShowTime(data: any) {

    console.log("This is data", data)

    const timeStr = data.time
    const dateStr = data.date

    const combinedString = `${dateStr}T${timeStr}:00`

    const finalDate = new Date(combinedString)

    // console.log("This is time ", finalDate.toTimeString())
    // console.log("This is time ", finalDate.toDateString())



    try {

        await db.show.create({
            data: {
                startTime: finalDate,
                movieId: data.movieId,
                theaterId: data.theaterId,
                price: Number(data.price),
                language: data.language,
            }
        })
        return { status: 200, message: "Success" }

    } catch (error) {
        console.error("Error while creating show", error)
        return { message: "Error while creating show", error }
    }

}

export async function getAllShowTime() {

    const result = await db.show.findMany({
        where: {
            startTime: {
                gt: new Date()
            }
        },
        include: {
            movie: {
                select: { title: true, posterUrl: true }
            },
            theater: {
                select: { name: true }
            }
        }
    })

    // console.log("This are the shows", result)




    const groupData = result.reduce((acc: any, show: any) => {

        const movieName = show.movie.title
        // const theaterName = show.theater.name

        if (!acc[movieName]) {
            acc[movieName] = {
                // if (!acc[theaterName]) {
                //     acc[theaterName] = {
                showId: show.id,
                movie: {

                    title: show?.movie?.title,
                    posterUrl: show?.movie?.posterUrl
                },
                movieName: show.theater.name,
                // theaterName: show.theater.name,
                shows: []
            }
        }

        delete show.movieId
        delete show.screenId
        delete show.theaterId
        delete show.movie

        acc[movieName].shows.push(show)
        // acc[theaterName].shows.push(show)

        // 
        // console.log("This si acc ",acc)
        // console.log("This is show",show)

        return acc

    }, {})




    // console.log("This are the shows", result)
    // console.log("This is groupdata", groupData)

    return Object.values(groupData)

}

export async function getSpecificeShow(data: any,selectedTheater:any) {

    const time = new Date(data)
    // console.log("time",time)

    const start = new Date(time); // 2025-12-05T00:00:00.000Z
    const end = new Date(new Date(time).setHours(23, 59, 59, 999));

    // console.log("start time", start)
    // console.log("end time", end)

    const result = await db.show.findMany({
        where: {
            
            startTime: {
                gte: start,
                lt: end

            },
            theater:{
                id:selectedTheater
            }
        },
        include: {
            movie: {
                select: { title: true, posterUrl: true }
            },
            theater: {
                select: { name: true }
            }
        }

    })


    // console.log("Result", result)

    const groupData = result.reduce((acc: any, show: any) => {

        const movieName = show.movie.title
        // const theaterName = show.theater.name

        if (!acc[movieName]) {
            acc[movieName] = {
                // if (!acc[theaterName]) {
                //     acc[theaterName] = {
                showId: show.id,
                movie: {

                    title: show?.movie?.title,
                    posterUrl: show?.movie?.posterUrl
                },
                movieName: show.theater.name,
                // theaterName: show.theater.name,
                shows: []
            }
        }

        delete show.movieId
        delete show.screenId
        delete show.theaterId
        delete show.movie

        acc[movieName].shows.push(show)
        // acc[theaterName].shows.push(show)

        // 
        // console.log("This si acc ",acc)
        // console.log("This is show",show)

        return acc

    }, {})




    // console.log("This are the shows", result)
    // console.log("This is groupdata", groupData)

    return Object.values(groupData)



}