"use client";
import { ChevronLeftIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function SeatingSelectionScreen() {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [occupiedSeats, setOccupiedSeats] = useState<string[]>(["1H", "1C"]);
    const [showMaxSeatAlert, setShowMaxSeatAlert] = useState(false); // 1. Added State

    const isVisible = selectedSeats.length >= 1;
    const ticketPrice = 400;

    const handleSubmitSeats = () => {
        setOccupiedSeats((prev) => [...prev, ...selectedSeats]);
        setSelectedSeats([]);
    };

    const handleSeatSelection = (seatId: any) => {
        // If already selected, remove it (always allow deselect)
        if (selectedSeats.includes(seatId)) {
            setSelectedSeats((prev) => [...prev.filter((item) => item !== seatId)]);
            return;
        }

        // 2. Logic: Only add if under limit, else show error
        if (selectedSeats.length < 10) {
            setSelectedSeats((prev) => [...prev, seatId]);
        } else {
            setShowMaxSeatAlert(true);
            setTimeout(() => setShowMaxSeatAlert(false), 3000);
        }
    };

    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const leftSeats = [1, 2, 3];
    const middleSeats = [4, 5, 6, 7];
    const rightSeats = [8, 9, 10];

    const TinySeat = ({ num, id }: any) => {
        const isOccupied = occupiedSeats.includes(id);
        const isSelected = selectedSeats.includes(id);

        return isOccupied ? (
            <div
                id={id}
                className="
                    /* Mobile Sizes */
                    w-5 h-5 m-0.5 p-1 text-[8px] rounded-[3px]
                    /* Desktop Sizes (md:) */
                    md:w-9 md:h-9 md:m-1 md:text-xs md:rounded-md
                    
                    flex items-center justify-center 
                    font-medium 
                    transition-all duration-300 ease-in-out
                    bg-gray-600 text-gray-400 border border-transparent opacity-50 cursor-not-allowed"
            >
                {num}
            </div>
        ) : (
            <div
                onClick={() => handleSeatSelection(id)}
                id={id}
                className={`
                    /* Mobile Sizes */
                    w-5 h-5 m-0.5 p-1 text-[8px] rounded-[3px]
                    /* Desktop Sizes (md:) */
                    md:w-9 md:h-9 md:m-1 md:text-xs md:rounded-md

                    flex items-center justify-center 
                    font-medium 
                    border 
                    cursor-pointer 
                    transition-all duration-300 ease-in-out
                    ${isSelected
                        ? "bg-red-500 text-white border-red-500 scale-110 shadow-lg"
                        : "bg-transparent text-gray-300 border-gray-600 hover:border-white hover:bg-white/10"
                    }
                `}
            >
                {num}
            </div>
        );
    };

    return (
        // Fixed 'bg-linear' to 'bg-gradient'
        <div className='min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans flex flex-col relative'>
            
            {/* 3. UI: Error Toast Notification */}
            <div 
                className={`
                    fixed top-10 left-1/2 transform -translate-x-1/2 z-[100]
                    flex items-center gap-2 px-6 py-3 
                    bg-red-600 text-white rounded-full shadow-2xl shadow-black/50
                    transition-all duration-300 ease-out pointer-events-none
                    ${showMaxSeatAlert ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
                `}
            >
                <ExclamationCircleIcon className="w-5 h-5" />
                <span className="text-xs font-bold tracking-wide">Max 10 seats allowed</span>
            </div>

            {/* Header Section */}
            <div className="sticky top-0 z-50 bg-[#1a1a2e]/95 backdrop-blur-md border-b border-white/10 shadow-xl">
                <div className="flex items-center gap-4 pt-5 pb-5 p-4 max-w-5xl mx-auto">
                    <div>
                        <ChevronLeftIcon className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-lg font-bold text-white mb-0.5">
                            Kantara A Legend: Chapter 1
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 mb-0.5">
                                Eros Cinema, Churchgate, Mumbai
                            </span>
                            <span className="text-xs text-gray-500">U/A • Hindi • 2h 45m</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="flex-1 flex flex-col items-center max-w-5xl mx-auto w-full">
                
                {/* Date & Time Section */}
                <div className="flex justify-between items-center px-6 py-4 w-full max-w-2xl">
                    <div className="flex flex-col items-center">
                        <span className="text-sm font-bold text-white mb-0.5">Mon</span>
                        <span className="text-xs text-gray-400">23 Nov, 2025</span>
                    </div>
                    <div className="bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-md shadow-md cursor-pointer min-w-[90px] flex items-center justify-center hover:bg-red-600 transition-colors">
                        <span>11:00 PM</span>
                    </div>
                </div>

                <div className="text-gray-400 p-2 text-center font-semibold text-xs tracking-widest uppercase mb-4">
                    CLASSIC : <span className="text-white">₹ {ticketPrice}.00</span>
                </div>

                {/* Seat Layout */}
                <div className="w-full p-5 overflow-x-auto flex justify-center">
                    <div className="min-w-max">
                        {rows.map((rowLabel) => (
                            <div key={rowLabel} className="flex items-center mb-1 md:mb-2">
                                <div className="w-8 md:w-12 mr-2 flex items-center justify-center text-xs md:text-sm font-bold text-gray-500">
                                    {rowLabel}
                                </div>
                                <div className="flex">
                                    {leftSeats.map((num) => <TinySeat key={`${num}${rowLabel}`} id={`${num}${rowLabel}`} num={num} />)}
                                </div>
                                <div className="w-8 md:w-16"></div> {/* Gap */}
                                <div className="flex">
                                    {middleSeats.map((num) => <TinySeat key={`${num}${rowLabel}`} id={`${num}${rowLabel}`} num={num} />)}
                                </div>
                                <div className="w-8 md:w-16"></div> {/* Gap */}
                                <div className="flex">
                                    {rightSeats.map((num) => <TinySeat key={`${num}${rowLabel}`} id={`${num}${rowLabel}`} num={num} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Screen Indicator */}
                <div className="flex justify-center mt-5 mb-4 w-full px-4">
                    <div className="w-full max-w-[300px] md:max-w-[500px] flex flex-col items-center">
                        <div className="w-full h-8 bg-gradient-to-b from-white/10 to-transparent border-t border-white/20 transform perspective-500 rotate-x-12 opacity-50"></div>
                        <div className="text-center text-[10px] md:text-xs font-semibold text-gray-500 mt-2 tracking-widest">
                            SCREEN THIS WAY
                        </div>
                        
                        {/* Legend */}
                        <div className="flex items-center justify-center gap-5 w-full mt-6 mb-24 md:mb-32">
                            <div className="flex gap-2 items-center text-xs text-gray-400">
                                <div className="h-4 w-4 rounded-[3px] border border-gray-600 bg-transparent"></div>
                                Available
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="h-4 w-4 rounded-[3px] bg-gray-600 opacity-50"></div>
                                Occupied
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                <div className="h-4 w-4 rounded-[3px] bg-red-500 border border-red-500"></div>
                                Selected
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={`fixed bottom-0 left-0 right-0 w-full h-24 bg-[#1a1a2e] border-t border-white/10 shadow-2xl z-40 flex items-center justify-center p-4 transition-transform duration-500 ease-out ${isVisible ? "translate-y-0" : "translate-y-full"}`}>
                <div className="w-full max-w-2xl flex justify-center">
                    <button
                        onClick={handleSubmitSeats}
                        className="w-11/12 bg-red-500 text-white text-lg font-bold px-8 py-3 rounded-xl shadow-lg transition-colors duration-200 hover:bg-red-600 active:bg-red-700"
                    >
                        Proceed ({selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"})
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SeatingSelectionScreen;