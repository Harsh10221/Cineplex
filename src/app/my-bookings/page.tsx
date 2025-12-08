"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeftIcon,
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';
import { getUserBookingShow } from '@/src/actions/booking';

export default function MyBookingsPage() {

  const [userBooking, setUserBooking] = useState<any>([]);

  useEffect(() => {
    getUserBookingShow()
      .then(data => {
        // Safeguard: Ensure we always set an array to avoid map errors
        const bookings = data?.userBookedShows;
        if (Array.isArray(bookings)) {
          setUserBooking(bookings);
        } else {
          setUserBooking([]);
        }
      })
      .catch(err => {
        console.error("Failed to fetch bookings:", err);
        setUserBooking([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] font-sans flex flex-col relative text-white">

      {/* 1. HEADER */}
      <div className="sticky top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="w-full max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4 py-2">
            <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </Link>
            <h1 className="text-xl font-bold text-white tracking-wide">My Bookings</h1>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8">

        {userBooking.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 opacity-70">
            <TicketIcon className="w-20 h-20 text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No bookings found</h3>
            <p className="text-sm text-gray-400">Looks like you haven't watched any movies yet.</p>
            <Link href="/" className="mt-6 px-6 py-2.5 bg-red-600 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors">
              Book a Movie
            </Link>
          </div>
        ) : (
          // Booking List
          <div className="space-y-6">
            {userBooking.map((ticket: any) => {
              console.log("ticke", ticket)
              return <div
                key={ticket.id}
                className="group relative bg-[#1f2937]/40 border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300 hover:bg-[#1f2937]/60"
              >
                <div className="flex flex-col md:flex-row">

                  {/* Left: Poster & Basic Info */}
                  <div className="flex p-4 md:p-5 gap-5 md:w-2/3">
                    {/* Poster */}
                    <div className="w-24 h-36 md:w-28 md:h-40 shrink-0 rounded-xl overflow-hidden shadow-lg shadow-black/40">
                      <img
                        src={ticket.show.movie.posterUrl}
                        alt={ticket.show.movie.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <h2 className="text-lg md:text-xl font-bold text-white truncate max-w-[200px] leading-tight mb-2">
                          {ticket.show.movie.title}
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                          <span className="bg-white/10 px-2 py-0.5 rounded text-gray-300 border border-white/5">
                            {ticket.show.movie.languages}
                          </span>

                          {new Date(ticket.show.startTime) > new Date() ? (
                            <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-bold tracking-wider text-[10px]">
                              CONFIRMED
                            </span>
                          ) :
                            (
                              <span className="bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20 font-medium tracking-wide text-[10px]">
                                WATCHED
                              </span>
                            )}
                        </div>
                      </div>

                      <div className="space-y-1.5 text-sm text-gray-300">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-red-500" />
                          <span>
                            {new Date(ticket.show.startTime).toLocaleDateString()} • {new Date(ticket.show.startTime).toLocaleTimeString("en-US", { hour: '2-digit', minute: "2-digit" })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPinIcon className="w-4 h-4 text-red-500" />
                          <span className="truncate max-w-[200px]">{ticket.show.theater.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider (Dashed Line) */}
                  <div className="relative h-px md:h-auto md:w-px bg-transparent mx-4 md:mx-0">
                    <div className="absolute inset-0 md:top-2 md:bottom-2 border-t md:border-t-0 md:border-l border-dashed border-gray-600/50"></div>
                    <div className="absolute -left-2 top-1/2 -mt-2 w-4 h-4 bg-[#141b2d] rounded-full hidden md:block"></div>
                    <div className="absolute -right-2 top-1/2 -mt-2 w-4 h-4 bg-[#141b2d] rounded-full hidden md:block"></div>
                  </div>

                  {/* Right: Seats & QR */}
                  <div className="flex flex-row md:flex-col justify-between items-center md:items-end p-4 md:p-6 md:w-1/3 bg-black/20">

                    <div className="text-left md:text-right w-full">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Seats</p>
                      <p className="text-xl font-bold text-white truncate max-w-[200px]">
                        {ticket.seats.join(', ')}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {ticket.seats.length} Tickets
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      {/* Fixed QR Code Container */}
                      <div className="bg-white h-10 w-10 p-1.5 rounded-lg shadow-sm flex items-center justify-center">
                        <QrCodeIcon className="w-full h-full text-gray-900" />
                      </div>

                      <p className="text-[10px] text-gray-500 font-mono">
                        ID: {ticket.id}
                      </p>
                    </div>

                  </div>
                </div>
              </div>


            })}
          </div>
        )}
      </main>
    </div>
  );
}