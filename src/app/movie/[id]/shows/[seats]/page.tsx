"use client"
import React, { useState } from 'react';
import { ChevronLeftIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import NavBar from '@/src/components/NavBar';

// --- MOCK DATA FOR SEATS ---
// 1 = Available, 2 = Occupied, 0 = Gap (Aisle)
const SEAT_LAYOUT = [
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
    const [occupiedSeats, setOccupiedSeats] = useState<string[]>(["H1", "C1", "D2", "H10"]);
    const [showMaxSeatAlert, setShowMaxSeatAlert] = useState(false); // <--- ERROR STATE

    // console.log("Selected seats",selectedSeats)

    const ticketPrice = 400;


    // console.log(seatSvg)


    const handleSeatSelection = (seatId: any) => {
        // console.log("i am geting called");
        if (selectedSeats.includes(seatId)) {
            // console.log("i am from the selected seat");
            setSelectedSeats((prev) => [...prev.filter((item) => item !== seatId)]);
        }
        if (selectedSeats.length < 10 && !selectedSeats.includes(seatId)) {
            setSelectedSeats((prev) => [...prev, seatId]);
        }
        // ()=> setSelectedSeats((prev)=>[...prev,id])
    };

    // const TinySeat = ({ num, id }: any) => {
    //     const isOccupied = occupiedSeats.includes(id);
    //     // console.log("THis is id ", id);
    //     // console.log("THis is isoccupied  ", isOccupied);

    //     return isOccupied ? (
    //         <div
    //             id={id}
    //             className="
    //     w-5 h-5 m-0.5 p-1 
    //     flex items-center justify-center 
    //     text-[8px] font-medium 
    //     border rounded-[3px] 
    //     transition-all duration-300 ease-in-out
    //     bg-gray-300           
    //     text-gray-400         
    //     border-gray-200       
    //     opacity-80            
    //     cursor-not-allowed    
    // "
    //         >
    //             {num}
    //         </div>
    //     ) : (
    //         <div
    //             onClick={() => {
    //                 handleSeatSelection(id);
    //             }}
    //             id={id}
    //             className={`
    //     w-5 h-5 m-0.5 p-1 
    //         flex items-center justify-center 
    //         text-[8px] font-medium 
    //         border rounded-[3px] 
    //         cursor-pointer 
    //         transition-all duration-300 ease-in-out

    //         // --- Conditional Styles ---
    //         ${selectedSeats.includes(id)
    //                     ? "bg-red-500 text-white border-red-500 scale-110 shadow-lg"
    //                     : "bg-white text-gray-800 border-gray-300 scale-100 hover:shadow-sm"
    //                 }


    //     `}
    //         >
    //             {num}
    //         </div>
    //     );
    // };


    // const TinySeat = ({ num, id }: any) => {
    //     const isOccupied = occupiedSeats.includes(id);

    //     return isOccupied ? (
    //         <div
    //             id={id}
    //             className="
    //                 w-5 h-5 m-0.5 p-1 
    //                 flex items-center justify-center 
    //                 text-[8px] font-medium 
    //                 rounded-[3px] 
    //                 transition-all duration-300 ease-in-out

    //                 /* Dark Theme Occupied Style */
    //                 bg-gray-700 
    //                 text-gray-500 
    //                 border border-transparent 
    //                 opacity-50 
    //                 cursor-not-allowed
    //             "
    //         >
    //             {num}
    //         </div>
    //     ) : (
    //         <div
    //             onClick={() => {
    //                 handleSeatSelection(id);
    //             }}
    //             id={id}
    //             className={`
    //                 w-5 h-5 m-0.5 p-1 
    //                 flex items-center justify-center 
    //                 text-[8px] font-medium 
    //                 rounded-[3px] 
    //                 cursor-pointer 
    //                 transition-all duration-300 ease-in-out
    //                 border 

    //                 /* --- Conditional Styles (Dark Theme) --- */
    //                 ${selectedSeats.includes(id)
    //                     ? "bg-red-600 text-white border-red-600 scale-110 shadow-lg shadow-red-900/50" // Selected
    //                     : "bg-transparent text-gray-300 border-gray-600 scale-100 hover:border-white hover:bg-white/10" // Available
    //                 }
    //             `}
    //         >
    //             {num}
    //         </div>
    //     );
    // };

    const toggleSeat = (rowLabel: string, seatIndex: number, status: number) => {
        if (status === 2) return;

        const seatId = `${rowLabel}${seatIndex}`;

        if (selectedSeats.includes(seatId)) {
            setSelectedSeats(selectedSeats.filter(id => id !== seatId));
        } else {
            if (selectedSeats.length < 10) {
                setSelectedSeats([...selectedSeats, seatId]);
            } else {
                // --- SHOW ERROR LOGIC ---
                setShowMaxSeatAlert(true);
                setTimeout(() => setShowMaxSeatAlert(false), 3000); // Auto-hide after 3s
            }



        }
    };

    return (
        <div className='min-h-screen bg-linear-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans flex flex-col relative'>

            {/* 1. HEADER (Full Width) */}
            <div className="sticky top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-white/10 shadow-xl pb-4 pt-4 px-4 w-full">
                <div className="w-full">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                <ChevronLeftIcon className="w-6 h-6 text-white" />
                            </button>
                            <div>
                                <h1 className="text-lg md:text-xl font-bold text-white leading-tight">
                                    Kantara: Chapter 1
                                </h1>
                                <p className="text-xs text-gray-400">
                                    Eros Cinema • 11:00 PM
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        className={`
        fixed top-24 left-1/2 transform -translate-x-1/2 z-[100]
        flex items-center gap-2 px-4 py-3 
        
        /* Visual Style */
        bg-red-600/90 backdrop-blur-md 
        text-white 
        rounded-lg shadow-2xl border border-red-500/50
        
        /* Animation Classes */
        transition-all duration-300 ease-out pointer-events-none
        ${showMaxSeatAlert ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
    `}
                    >
                        <ExclamationCircleIcon className="w-5 h-5 text-white" />
                        <span className="text-xs font-bold">Max 10 seats allowed per booking</span>
                    </div>

                    {/* SELECTION SUMMARY CARD */}
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
            </div>

            {/* 2. MAIN SEAT GRID */}
            <main className="flex-1 w-full px-2 py-8 flex flex-col items-center">

                {/* Price Tag */}
                <div className="text-center mb-6">
                    <span className="inline-block px-4 py-1 rounded-full border border-gray-600 text-gray-400 text-[10px] font-medium tracking-widest uppercase">
                        Classic : ₹ 400.00
                    </span>
                </div>

                {/* The Grid Container - No Overflow needed if sizing is correct */}
                <div className="flex flex-col gap-2 items-center w-full max-w-full">
                    {SEAT_LAYOUT.map((row) => {
                        let seatCounter = 0;
                        return (
                            <div key={row.row} className="flex  items-center gap-2 md:gap-4 justify-center">
                                {/* Row Label */}
                                <div className="w-3 md:w-5 text-center text-gray-500 text-[10px] md:text-xs font-bold">{row.row}</div>

                                {/* Seats */}
                                <div className="flex  gap-1 md:gap-2">
                                    {row.seats.map((status, index) => {
                                        // 0 = Gap
                                        if (status === 0) {
                                            return <div key={`${row.row}-${index}`} className="w-3 md:w-6" />;
                                        }

                                        seatCounter++;
                                        const seatNumber = seatCounter;
                                        const seatId = `${row.row}${seatNumber}`;
                                        // console.log("This is seat id",seatId)
                                        const isSelected = selectedSeats.includes(seatId);
                                        const isOccupied = occupiedSeats.includes(seatId);
                                        console.log("This is the ocupied", isOccupied)
                                        console.log("This is seatid", seatId)

                                        return (
                                            <button
                                                key={seatId}
                                                disabled={isOccupied}
                                                onClick={() => toggleSeat(row.row, seatNumber, status)}
                                                className={`
                                        
                                            w-6 h-6 md:w-9 md:h-9
                                            text-[9px] md:text-xs font-medium 
                                            rounded md:rounded-lg 
                                            flex items-center justify-center 
                                            transition-all duration-200
                                            ${isOccupied
                                                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed border border-transparent' // Occupied
                                                        : isSelected
                                                            ? 'bg-red-600 text-white shadow-lg shadow-red-600/50 border border-red-500 transform scale-110' // Selected
                                                            : 'bg-transparent border border-gray-600 text-gray-300 hover:border-white hover:bg-white/10' // Available
                                                    }
                                        `}
                                            >
                                                {seatNumber}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. SCREEN INDICATOR */}
                <div className="mt-8 mb-4 flex flex-col items-center w-full px-8">
                    {/* The glowing trapezoid */}
                    <div className="w-full max-w-[300px] h-6 bg-gradient-to-b from-purple-500/20 to-transparent border-t border-purple-500/40 transform perspective-500 rotate-x-12 opacity-50 blur-[1px]"></div>
                    <p className="text-gray-500 text-[9px] uppercase tracking-widest mt-2">Screen this way</p>
                </div>

                {/* 4. LEGEND */}
                <div className="flex items-center justify-center gap-4 mt-2 mb-20">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded border border-gray-500"></div>
                        <span className="text-[10px] text-gray-400">Available</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-gray-700"></div>
                        <span className="text-[10px] text-gray-400">Occupied</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded bg-red-600"></div>
                        <span className="text-[10px] text-gray-400">Selected</span>
                    </div>
                </div>

            </main>

            {/* 5. FLOATING ACTION BUTTON */}
            {selectedSeats.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full p-4 bg-[#1a1a2e] border-t border-white/10 animate-in slide-in-from-bottom duration-300 z-[60]">
                    <div className="w-full flex items-center justify-between gap-4">
                        {/* <div className="flex flex-col">
                            <span className="text-xs text-gray-400">Total Price</span>
                            <span className="text-xl font-bold text-white">₹ {selectedSeats.length * ticketPrice}.00</span>
                        </div> */}
                        <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-900/40 transition-colors active:scale-95 text-sm md:text-base">
                            Confirm {selectedSeats.length} Seats
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}