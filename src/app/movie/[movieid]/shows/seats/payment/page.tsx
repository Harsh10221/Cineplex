"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircleIcon, HomeIcon, ArrowDownTrayIcon, QrCodeIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createRazorpayOrder } from '@/src/actions/payment';
import { areSelectedSeatBooked, bookSeats } from '@/src/actions/booking';

export default function PaymentPage() {
  const [status, setStatus] = useState<'processing' | 'success'>('processing');
  const [isBooking, setIsBooking] = useState(false)
  const [selectedSeats, setSelectedSeats] = useState<any[]>([])
  const [isSeatsChecked, setIsSeatsChecked] = useState(false)
  // const [status, setStatus] = useState<'processing' | 'success'>('processing');
  const path = usePathname()
  const query = useSearchParams()
  const navigate = useRouter()


  console.log("Selected seats are ", selectedSeats)

  const seatsFromUrl: string = useSearchParams().get("seats") ?? ""




  const url = `${path.replace("/payment", "")}?showId=${query.get("showId")}&lang=${query.get("lang")}`

  useEffect(() => {

    const seatsIntoArray = seatsFromUrl.split(",")
    setSelectedSeats(seatsIntoArray)

    areSelectedSeatBooked(seatsIntoArray, query.get("showId") ?? "")
      .then((message) => {
        if (message?.status?.includes('failed')) {
          navigate.push(url)
        }
        console.log(message)

      })

    // console.log("This are seats", selectedSeats)


  }, [])
  // console.log("This are seats outside of useeffect", selectedSeats)

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  const handlePayment = async () => {

    if (selectedSeats.length == 0) {
      console.log("No seat selected")
      return
    }

    const amount = selectedSeats.length * 400;

    // 1. Create Order on Server
    const orderData = await createRazorpayOrder(amount);

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setIsBooking(false);
      navigate.push(url)
      return;
    }

    if (!orderData.success) {
      alert("Payment Init Failed");
      setIsBooking(false);
      navigate.push(url)

      return;
    }

    // 2. Open Razorpay Checkout
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "CineBook",
      description: "Movie Ticket Booking",
      order_id: orderData.orderId, // This comes from step 1

      handler: async function (response: any) {
        // 3. Payment Successful! Now verify & book ticket.
        console.log("Payment Success:", response);
        navigate.push(url)

        const result = bookSeats(selectedSeats, query.get("showId") ?? "")

        // Call your existing createBooking action here
        // const result = await bookSeats({
        //     // userId,
        //     showId,
        //     seats: selectedSeats,
        //     // totalPrice: amount,
        //     // paymentId: response.razorpay_payment_id // Store this in DB!
        // });

        console.log("This is result", result)

        // if (result.success) {
        //     alert("Booking Confirmed!");
        //     setSelectedSeats([]);
        //     router.refresh();
        // } else {
        //     alert("Booking Failed: " + result.message);
        // }
      },

      modal: {
        ondismiss: function () {
          console.log("Payment Cancelled by User");

          // Option A: Just unfreeze the button (Better UX)
          setIsBooking(false);
          navigate.push(url)

          // alert("Payment cancelled. Please try again.");

          // Option B: Redirect to Home (As you asked)
          // router.push("/"); 
        }
      },
      prefill: {
        name: "User Name", // You can get this from user prop
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#EF4444", // Red to match your theme
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setIsBooking(false);
  };


  useEffect(() => {
    // if (selectedSeats.length > 0) {
    if (isSeatsChecked) {
      console.log("i am calling the handlepayment")

      handlePayment()
    }


  }, [isSeatsChecked])

  // useEffect(() => {
  //   console.log("selected seat booked",selectedSeats)
  //   areSelectedSeatBooked(selectedSeats)


  // }, [selectedSeats.length])


  // Simulate Payment Gateway Delay
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setStatus('success');
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  // MOCK DATA: Simulating 10 seats
  const ticketData = {
    movie: "Kantara: Chapter 1",
    format: "Hindi • 2D",
    date: "Mon, 23 Oct | 11:00 PM",
    cinema: "Eros Cinema, Mumbai",
    seats: "A1, A2, A3, A4, A5, B1, B2, B3, B4, B5", // <--- 10 Seats
    seatCount: 10,
    bookingId: "BK-882910",
    total: 4000
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] font-sans p-4 relative overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      {/* --- STATE 1: PROCESSING --- */}
      {status === 'processing' && (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in duration-500">

          {/* Custom Spinner */}
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            {/* Inner Logo Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🍿</span>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-wide animate-pulse">
              Processing Payment
            </h2>
            <p className="text-gray-400 text-sm">
              Please do not close this window...
            </p>
          </div>
        </div>
      )}

      {/* --- STATE 2: TICKET SUCCESS --- */}
      {status === 'success' && (
        <div className="w-full max-w-sm animate-in slide-in-from-bottom-10 fade-in duration-700">

          {/* Success Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-green-500/20 mb-4">
              <CheckCircleIcon className="w-4 h-4" />
              Booking Confirmed
            </div>
            <h1 className="text-white text-2xl font-bold">Here is your ticket!</h1>
          </div>

          {/* THE TICKET CARD */}
          <div className="relative bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">

            {/* Top Section: Movie Info */}
            <div className="p-6 relative z-10">
              <div className="flex gap-4">
                {/* Poster Thumbnail */}
                <div className="w-20 h-28 bg-gray-200 rounded-lg shrink-0 overflow-hidden shadow-md">
                  <img
                    src="https://image.tmdb.org/t/p/w200/fGodXWqJkkkbSebPIlxLSygV8GY.jpg"
                    alt="Poster"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="text-lg font-extrabold text-gray-900 leading-tight mb-1 line-clamp-2">
                    {ticketData.movie}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium mb-2">{ticketData.format}</p>

                  <div className="text-xs text-gray-500 space-y-0.5">
                    <p>{ticketData.date}</p>
                    <p className="font-semibold text-gray-700">{ticketData.cinema}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Perforation Line (The "Tear" Effect) */}
            <div className="relative flex items-center justify-between px-2">
              <div className="w-6 h-6 bg-[#121827] rounded-full -ml-3"></div> {/* Left Notch */}
              <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
              <div className="w-6 h-6 bg-[#121827] rounded-full -mr-3"></div> {/* Right Notch */}
            </div>

            {/* Bottom Section: Seats & QR */}
            <div className="p-6 bg-gray-50">

              {/* Seats Row - Optimized for Multiline */}
              <div className="flex justify-between items-end mb-6">
                <div className="max-w-[75%]"> {/* Limit width to prevent overlap */}
                  <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">
                    Seats
                  </span>
                  <div className="text-lg font-black text-gray-900 leading-tight wrap-break-word">
                    {ticketData.seats}
                  </div>
                  <span className="text-xs text-gray-500 font-medium mt-1 block">
                    Classic ({ticketData.seatCount} Tickets)
                  </span>
                </div>

                {/* QR Code */}
                <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 shrink-0">
                  <QrCodeIcon className="w-12 h-12 text-gray-900" />
                </div>
              </div>

              {/* Total & ID */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-200">
                <span>ID: <span className="text-gray-900 font-mono font-bold">{ticketData.bookingId}</span></span>
                <span>Total: <span className="text-gray-900 font-bold text-base">₹ {ticketData.total}</span></span>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            <Link href="/" className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3.5 rounded-xl transition-all active:scale-95">
                <HomeIcon className="w-5 h-5" />
                Home
              </button>
            </Link>
            <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-900/30 transition-all active:scale-95">
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download
            </button>
          </div>

        </div>
      )}

    </div>
  );
}