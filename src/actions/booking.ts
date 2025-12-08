"use server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { error } from "console";
import { Ticket } from "lucide-react";
import { registerUser } from "./movies";
import { ifError } from "assert";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

export async function bookSeats(selectedSeats: any, showId: string) {
    try {
        const user = await getCurrentUser();
        console.log("This are selected seats", selectedSeats);
        console.log("This is user", user);

        if (selectedSeats.length == 0) {
            return { message: "Seats requrired" };
        }

        if (!showId) {
            return { message: "ShowId requrired" };
        }

        // const result = await db.booking.findMany({
        //     where: {
        //         showId,
        //         OR: selectedSeats.map((seat: string) => ({
        //             // AND: [
        //                  row: seat.slice(0, 1) ,
        //                  seatNumber: Number(seat.slice(1))
        //             // ]
        //         }))
        //     }
        // })

        // console.log("This is selected seats result ",result)

        // if (result.length > 0) {
        //     return { success: false, message: "Seat already booked" };
        // }

        const tickets = await db.booking.updateMany({
            where: {
                showId,
                userId: user?.id,
                status: "PENDING",
            },
            data: {
                status: "CONFIRM",
                expireAt: null,
            },
            // selectedSeats.map((seat: string) => ({
            //     userId: user?.id,
            //     showId,
            //     row: seat.slice(0, 1),
            //     seatNumber: Number(seat.slice(1))
            // }))
        });

        const createdTickets = await db.booking.findMany({
            where: {
                userId: user?.id,
                showId,
            },
        });

        console.log("THis is ticker", createdTickets);

        return { success: "Ticket booked ", Tickets: createdTickets };
    } catch (error) {
        throw error;
        return { Error: error };
    }
}

export async function bookedSeats(showId: string) {
    if (!showId) {
        return { message: "ShowId requrired" };
    }

    const occupiedSeats = await db.booking.findMany({
        where: {
            showId,
            OR: [
                {
                    expireAt: null,
                },
                {
                    //  100         110
                    // current > future time

                    expireAt: {
                        gt: new Date(),
                    },
                },
            ],
        },

        select: {
            row: true,
            seatNumber: true,
        },
    });

    console.log(
        "occupied seats from server",
        occupiedSeats.map((seat) => seat.row + seat.seatNumber)
    );

    // return occupiedSeats ?? []

    if (occupiedSeats.length > 0) {
        // console.log("i am logged ")
        return occupiedSeats.map((seat) => seat.row + seat.seatNumber);
    } else {
        return [];
    }
}

export async function areSelectedSeatBooked(seats: any, showId: string) {
    if (seats.length == 0) {
        return { message: "No seat are selected ", success: false };
    }

    const user = await getCurrentUser();

    // console.log("Thos os ", seats[0].slice(1))

    // console.log("This are seats", seats.map((seat: any) => {
    //     // (
    //     // seat.slice(0, 1)
    //     // seat.slice(1)
    //     return (seat.slice(0, 1) + seat.slice(1))
    //     // )
    // }))

    // const result = await db.booking.findMany({
    //     where: {
    //         showId,
    //         OR: seats.map((seat: any) => ({
    //             row: seat.slice(0, 1),
    //             seatNumber: Number(seat.slice(1))

    //         }))
    //     }
    // })

    // if (result.length > 0) {
    //     return { status: "failed", message: `Seat is already booked : ${result.map(seat => seat.row + seat.seatNumber)}` }
    // }

    // console.log("Seat is already booked ", result)

    const now = new Date();
    try {
        const deletePendingSeats = await db.booking.deleteMany({
            where: {
                showId,
                status: "PENDING",
                expireAt: {
                    lt: new Date(),
                },

                OR: seats.map((seat: string) => ({
                    row: seat.slice(0, 1),
                    seatNumber: Number(seat.slice(1)),
                })),
            },
        });

        console.log("this is deleted ", deletePendingSeats);

        const createdPendingSeats = await db.booking.createMany({
            data: seats.map((seat: any) => ({
                userId: user?.id,
                showId,
                expireAt: new Date(now.getTime() + 1 * 60 * 1000),
                row: seat.slice(0, 1),
                seatNumber: Number(seat.slice(1)),
            })),
        });

        console.log("Temp booking ", createdPendingSeats);
    } catch (error) {
        console.log("There was an error", error);

        return { message: "Already booked by other user", status: "failed" };
    }
}

export async function getUserBookingShow() {
    const user = await getCurrentUser();

    // console.log("This is user", user)

    if (!user) {
        return { status: "Failed", message: "User is required" };
    }

    const userBookings = await db.booking.findMany({
        where: {
            userId: user.id,
            expireAt: null,
            status: "CONFIRM",

            // SHow the user there booking
        },
        include: {
            show: {
                include: {
                    movie: true,
                    theater: {
                        select:{
                            name:true
                        }
                    }

                },
            },
        },
    });

    const formatedData = userBookings.reduce((acc, show): any => {
        const showId = show.showId;

        if (!acc[showId]) {
            acc[showId] = {
                id: show.id,
                show: show.show,
                seats: [],
            };
        }

        acc[showId].seats.push(show.row + show.seatNumber);


        return acc;
    }, {});

    // console.log("formated data", formatedData)

    const values = Object.values(formatedData)

    // console.log("This is user bookings", userBookings)

    return { status: "Success", userBookedShows: values };
}
