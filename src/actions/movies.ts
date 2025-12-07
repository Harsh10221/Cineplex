"use server"
import { db } from "@/lib/db"
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache"
import Jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import bcrypt from "bcrypt"
import { collectFallbackRouteParams } from "next/dist/build/segment-config/app/app-segments";
import { getCurrentUser } from "@/lib/auth";
import { userAgent } from "next/server";
import { stat } from "fs";


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

export async function getShow(movieId: string, date: any, lang: string) {
    // console.log("MovieId", movieId)
    // console.log("Date", date)
    // console.log("Lang", lang)

    const start = new Date(date ?? new Date() ) 
    start.setHours(0, 0, 1, 0)

    const end = new Date(new Date(date ?? start).setHours(23, 59, 59, 999))

    console.log("Start", start.toTimeString())
    console.log("End", end.toTimeString())

    if (!movieId) {
        throw new Error("Movie id not required ")
    }
    if (!start || !end) {
        throw new Error("Start date and end date required ")


    }

    const result = await db?.show?.findMany({
        where: {
            movieId: movieId,
            startTime: {
                gte: start,
                lt: end
            },
            language: lang


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

// export async function bookSeats(data: any) {
//     console.log("This is user data", data)
// }

export async function registerUser(data: any) {
    try {

        // console.log("This is user Data", data)

        if (!data.email || !data.password) {
            return { success: false, message: "Email or password is required" };
        }

        const alreadyExit = await db.user.findUnique({
            where: {
                email: data.email
            }
        })

        // console.log("existed user", alreadyExit)

        if (alreadyExit) {
            return { success: false, message: "User already exist please head to login " };
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        // const normaltext =  await bcrypt.compare(data.password,hashedPassword)

        const result = await db.user.create({
            data: {
                fullName: data.fullName,
                email: data.email,
                password: hashedPassword,
            }
        })

        // console.log("This is result", result)
        return { success: true, message: "User registered!" };
    } catch (error: any) {
        // console.error("Registration Error:", error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {

            // 2. Check for Unique Constraint Violation (P2002)
            if (error.code === 'P2002') {

                // 3. Check WHICH field failed
                const target = error.meta?.target as string[];
                if (target && target.includes('email')) {
                    return { success: false, message: "This email is already registered." };
                }

                return { success: false, message: "This data already exists." };
            }
        }

        return { success: false, message: "Something went wrong during registration." };
    }

}

export async function loginUser(data: any) {

    // console.log("data", data)


    if (!data.email || !data.password) {
        return { success: false, message: "Email or password is required" };
    }


    const user = await db.user.findFirst({
        where: {
            email: data.email,
            // password: data.password
        },
        select: {
            id: true,
            email: true,
            fullName: true,
            password: true
        }
    })

    if (!user) {
        return { message: "User Not found" }
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.password)
    console.log("This is password status", isPasswordCorrect)

    if (!isPasswordCorrect) {
        return { message: "Password is incorrect" }
    }

    const accessToken = Jwt.sign({
        id: user.id
    }, process?.env?.ACCESS_TOKEN_SECRET!,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY as any }
    )

    const refreshToken = Jwt.sign({
        id: user.id
    }, process?.env?.REFRESH_TOKEN_SECRET!,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY as any }
    );

    // console.log("Accesstoken : ", accessToken)
    // console.log("RefreshToken : ", refreshToken);

    (await cookies()).set("accessToken", accessToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 1, // 7 days
        path: "/",
    });

    (await cookies()).set("refreshToken", refreshToken, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
    });


    // console.log("This is user", user)



    // if (user) {

    const { password, ...userObj } = user

    // delete user?.refreshToken
    // }
    // console.log(password)

    return userObj

}
