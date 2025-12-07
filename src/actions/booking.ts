"use server"
import { getCurrentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { error } from "console"
import { Ticket } from "lucide-react"
import { turborepoTraceAccess } from "next/dist/build/turborepo-access-trace"
import { registerUser } from "./movies"

export async function bookSeats(selectedSeats: any, showId: string) {
    try {

        const user = await getCurrentUser()
        console.log("This are selected seats", selectedSeats)
        console.log("This is user", user)

        if (!selectedSeats) {
            return { message: "Seats requrired" }
        }

        if (!showId) {
            return { message: "ShowId requrired" }
        }

        const result = await db.booking.findMany({
            where: {
                showId,
                OR: selectedSeats.map((seat: string) => ({
                    AND: [
                        { row: seat.slice(0, 1) },
                        { seatNumber: Number(seat.slice(1)) }
                    ]
                }))
            }
        })

        if (result.length > 0) {
            return { success: false, message: "No seats selected" };
        }

        const tickets = await db.booking.createMany({
            data:
                selectedSeats.map((seat: string) => ({
                    userId: user?.id,
                    showId,
                    row: seat.slice(0, 1),
                    seatNumber: Number(seat.slice(1))
                }))
        })

        const createdTickets = await db.booking.findMany({
            where: {
                userId: user?.id,
                showId
            }
        })

        console.log("THis is ticker", createdTickets)


        return { success: "Ticket booked ", Tickets: createdTickets }


    } catch (error) {
        throw error
        return { Error: error }
    }


}

export async function bookedSeats(showId: string) {

    if (!showId) {
        return { message: "ShowId requrired" }
    }

    const occupiedSeats = await db.booking.findMany({
        where: {
            showId
        },
        select: {
            row: true,
            seatNumber: true
        }
    })

    // console.log("occupied seats", occupiedSeats.map((seat)=>seat.row+seat.seatNumber))

    // return occupiedSeats ?? []

    if (occupiedSeats.length > 1) {
        return occupiedSeats.map((seat) => seat.row + seat.seatNumber)
    } else {
        return []
    }

}

export async function areSelectedSeatBooked(seats: any, showId: string) {


    if (seats.length == 0) {
        return { message: "No seat are selected ", success: false }
    }

    // console.log("Thos os ", seats[0].slice(1))

    // console.log("This are seats", seats.map((seat: any) => {
    //     // (
    //     // seat.slice(0, 1)
    //     // seat.slice(1)
    //     return (seat.slice(0, 1) + seat.slice(1))
    //     // )
    // }))

    const result = await db.booking.findMany({
        where: {
            showId,
            OR: seats.map((seat: any) => ({
                row: seat.slice(0, 1),
                seatNumber: Number(seat.slice(1))

            }))
        }
    })

    if (result.length > 0) {
        return {status:"failed" , message:`Seat is already booked : ${result.map(seat=>seat.row+seat.seatNumber)}`}
    }
    console.log("This is result ", result)


}

