"use server"
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
// import { use } from "react";

export async function getCurrentUser() {
    const accessToken = (await cookies()).get("accessToken")?.value;
    // console.log("accessToken",accessToken)


    if (!accessToken) {  throw new Error("No access token found") }

    try {
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)

        const { payload } = await jwtVerify(accessToken, secret)

        // console.log("This is payload", payload)

        const user = await db.user.findFirst({
            where: {
                id: payload.id || ""
            }
        })

        // console.log(user)

        return user; // Returns User object or null
    } catch (error) {
        throw error
        return null;
    }
}