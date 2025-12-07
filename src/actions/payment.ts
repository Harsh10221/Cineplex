"use server"

import { Currency } from "lucide-react"
import Razorpay from "razorpay"

export async function createRazorpayOrder(amount: number) {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7)
        }

        const order = await instance.orders.create(options)

        console.log("This is order ",order)

        return {
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID // Safe to expose Key ID (Not Secret!)

        }

    } catch (error) {
        console.error("Razorpay Order Error:", error);
        return { success: false, message: "Failed to create order" };

    }

}