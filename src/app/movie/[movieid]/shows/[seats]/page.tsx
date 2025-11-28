"use client"
import React, { useState } from 'react';
import { ChevronLeftIcon, ExclamationCircleIcon, TicketIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

// --- TYPES ---
type SeatStatus = 0 | 1 | 2; // 0: Gap, 1: Available, 2: Occupied
interface SeatRow {
    row: string;
    seats: SeatStatus[];
    price: number;
}

// --- MOCK DATA ---
const SEAT_LAYOUT: SeatRow[] = [
    { row: 'A', seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], price: 400 },
    { row: 'B', seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], price: 400 },
    { row: 'C', seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], price: 400 },
    { row: 'D', seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], price: 400 },
    { row: 'E', seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], price: 400 },
    { row: 'F', seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], price: 400 },
    { row: 'G', seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], price: 400 },
    { row: 'H', seats: [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1], price: 450 },
];

export default function SeatSelectionPage() {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [occupiedSeats] = useState<string[]>(["H1", "C1", "D2", "H10"]);
    const [showMaxSeatAlert, setShowMaxSeatAlert] = useState(false);

    const ticketPrice = 400;

    // console.log("This is selected",selectedSeats)

    const toggleSeat = ( seatId: string) => {
    // const toggleSeat = (rowLabel: string, seatIndex: number, seatId: string) => {
        // console.log("rowlabel",rowLabel)
        // console.log("seatIndex",seatIndex)
        // console.log("seatIndex",seatId)
        // if (status === 2) return; 


        // const seatId = `${rowLabel}${seatIndex}`;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(prev => prev.filter(id => id !== seatId));
        } else {
            if (selectedSeats.length < 10) {
                setSelectedSeats(prev => [...prev, seatId]);
            } else {
                setShowMaxSeatAlert(true);
                setTimeout(() => setShowMaxSeatAlert(false), 3000);
            }
        }
    };

    return (
        <div className='min-h-screen bg-[#0f172a] text-white font-sans flex flex-col'>
            
            {/* --- GLOBAL ALERT --- */}
            <div className={`fixed top-24 lg:top-6 left-1/2 transform -translate-x-1/2 z-[100] transition-all duration-300 pointer-events-none
                ${showMaxSeatAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <div className="bg-red-600/90 backdrop-blur-md text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2 border border-red-500/50">
                    <ExclamationCircleIcon className="w-5 h-5" />
                    <span className="font-bold text-xs">Max 10 seats allowed</span>
                </div>
            </div>

            {/* --- LAYOUT WRAPPER --- */}
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto w-full flex-1">
                
                {/* LEFT CONTENT */}
                <div className="flex-1 flex flex-col relative z-10">
                    
                    {/* MOBILE HEADER (Restored Original Look) */}
                    <div className="sticky lg:hidden top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-white/10 shadow-xl pb-4 pt-4 px-4 w-full">
                         <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                    <ChevronLeftIcon className="w-6 h-6 text-white" />
                                </button>
                                <div>
                                    <h1 className="text-lg font-bold text-white leading-tight">Kantara: Chapter 1</h1>
                                    <p className="text-xs text-gray-400">Eros Cinema • 11:00 PM</p>
                                </div>
                            </div>
                        </div>
                        {/* Mobile Selection Summary Card */}
                        <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3">
                            <div className="text-sm text-gray-300">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider">Tickets</span>
                                <span className="font-bold text-white">{selectedSeats.length} Seat{selectedSeats.length !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-gray-500 uppercase tracking-wider">Total</span>
                                <span className="font-bold text-red-400 text-lg">₹ {selectedSeats.length * ticketPrice}</span>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP HEADER (Back Button) */}
                    <div className="hidden lg:flex p-6 items-center gap-2 text-gray-400 hover:text-white cursor-pointer w-fit">
                        <ChevronLeftIcon className="w-5 h-5" />
                        <span>Back to movies</span>
                    </div>

                    {/* MAIN GRID */}
                    <main className="flex-1 flex flex-col items-center justify-center p-2 py-8 lg:p-8 overflow-y-auto">
                         {/* Price Tag (Mobile Style) */}
                        <div className="text-center mb-6 lg:hidden">
                            <span className="inline-block px-4 py-1 rounded-full border border-gray-600 text-gray-400 text-[10px] font-medium tracking-widest uppercase">
                                Classic : ₹ 400.00
                            </span>
                        </div>

                        {/* SCREEN */}
                        <div className="w-full max-w-[300px] lg:max-w-2xl mb-8 lg:mb-12 flex flex-col items-center perspective-container">
                             <div className="w-full h-6 lg:h-8 bg-gradient-to-b from-purple-500/20 to-transparent border-t border-purple-500/40 transform perspective-500 rotate-x-12 opacity-50 blur-[1px]"></div>
                            <p className="text-gray-500 text-[9px] uppercase tracking-widest mt-2">Screen this way</p>
                        </div>

                        {/* SEATS - Exact Mobile Specs Restored */}
                        <div className="flex flex-col gap-2 lg:gap-4 items-center w-full max-w-full">
                            {SEAT_LAYOUT.map((row) => {
                                let seatCounter = 0;
                                return (
                                    <div key={row.row} className="flex items-center justify-center gap-2 lg:gap-6">
                                        <div className="w-3 lg:w-5 text-center text-gray-500 text-[10px] lg:text-xs font-bold">{row.row}</div>
                                        
                                        {/* Mobile: gap-1, Desktop: gap-3 */}
                                        <div className="flex gap-1 lg:gap-3">
                                            {row.seats.map((status, idx) => {
                                                // Mobile Gap: w-3, Desktop Gap: w-10
                                                if (status === 0) return <div key={`gap-${idx}`} className="w-3 lg:w-10" />;
                                                
                                                seatCounter++;
                                                const seatId = `${row.row}${seatCounter}`;
                                                // console.log("This is seatid",seatId)
                                                const isSelected = selectedSeats.includes(seatId);
                                                const isOccupied = occupiedSeats.includes(seatId);

                                                return (
                                                    <button
                                                        key={seatId}
                                                        disabled={isOccupied}
                                                        onClick={() => toggleSeat(seatId)}
                                                        className={`
                                                            /* --- EXACT MOBILE SPECS --- */
                                                            w-6 h-6 text-[9px] rounded
                                                            
                                                            /* --- DESKTOP SPECS --- */
                                                            lg:w-10 lg:h-10 lg:text-xs lg:rounded-lg
                                                            
                                                            font-medium flex items-center justify-center 
                                                            transition-all duration-200
                                                            ${isOccupied 
                                                                ? 'bg-gray-700 text-gray-500 cursor-not-allowed border border-transparent' 
                                                                : isSelected 
                                                                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/50 border border-red-500 transform scale-110' 
                                                                    : 'bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:bg-white/10'
                                                            }
                                                        `}
                                                    >
                                                        {seatCounter}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* LEGEND */}
                        <div className="flex gap-4 lg:gap-6 mt-8 mb-20 lg:mb-0">
                            <LegendItem color="border border-gray-500" label="Available" />
                            <LegendItem color="bg-gray-700" label="Occupied" />
                            <LegendItem color="bg-red-600" label="Selected" />
                        </div>
                    </main>
                </div>

                {/* RIGHT SIDEBAR (Desktop Only) - Mobile uses the floating bottom bar below */}
                <div className="hidden lg:flex lg:w-96 lg:p-6 lg:border-l lg:border-white/5 bg-[#0f172a] flex-col">
                    <div className="mb-6 bg-slate-800/50 p-6 rounded-2xl border border-white/5">
                        <h2 className="text-2xl font-bold mb-2">Kantara: Chapter 1</h2>
                        <div className="flex flex-col gap-3 text-sm text-gray-400 mt-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-slate-700/50 p-1.5 rounded"><TicketIcon className="w-4 h-4" /></span>
                                <span>Action, Thriller • 2h 30m</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-slate-700/50 p-1.5 rounded"><CalendarIcon className="w-4 h-4" /></span>
                                <span>Today, 26 Nov</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-slate-700/50 p-1.5 rounded"><ClockIcon className="w-4 h-4" /></span>
                                <span>11:00 PM • Eros Cinema</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Selected Seats ({selectedSeats.length})</span>
                            <button onClick={() => setSelectedSeats([])} className="text-red-400 hover:text-red-300 text-xs uppercase">Clear</button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {selectedSeats.length > 0 ? selectedSeats.map(seat => (
                                <span key={seat} className="bg-slate-700 text-white px-3 py-1 rounded text-xs border border-white/10">
                                    {seat}
                                </span>
                            )) : <span className="text-gray-600 text-sm italic">No seats selected</span>}
                        </div>
                    </div>

                    <div className="mt-auto bg-slate-800/50 p-4 rounded-xl">
                        <div className="flex justify-between items-end mb-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400 uppercase tracking-wider">Total Price</span>
                                <span className="text-3xl font-bold text-white">₹ {selectedSeats.length * ticketPrice}</span>
                            </div>
                        </div>
                        <button 
                            disabled={selectedSeats.length === 0}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
                        >
                            {selectedSeats.length === 0 ? 'Select Seats' : `Pay ₹${selectedSeats.length * ticketPrice}`}
                        </button>
                    </div>
                </div>

                {/* MOBILE FLOATING ACTION BUTTON (Restored from your original) */}
                {/* {selectedSeats.length > 0 && ( */}
                    <div className={`${selectedSeats.length > 0 ? "translate-y-0": "translate-y-100"} transition-transform duration-500  fixed lg:hidden bottom-0 left-0 w-full p-4 bg-[#1a1a2e] border-t border-white/10 animate-in slide-in-from-bottom  z-60`}>
                        <div className="w-full flex items-center justify-between gap-4">
                            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-900/40 transition-colors active:scale-95 text-sm md:text-base">
                                Confirm {selectedSeats.length} Seats
                            </button>
                        </div>
                    </div>
                {/* )} */}

            </div>
        </div>
    );
}

const LegendItem = ({ color, label }: { color: string, label: string }) => (
    <div className="flex items-center gap-1.5">
        <div className={`w-3 h-3 rounded ${color}`}></div>
        <span className="text-[10px] text-gray-400">{label}</span>
    </div>
);