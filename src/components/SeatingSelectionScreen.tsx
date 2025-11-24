"use client";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function SeatingSelectionScreen() {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Example: A1 is pre-selected
    const [occupiedSeats, setOccupiedSeats] = useState<string[]>(["1H", "1C"]);

    // console.log("This are selected seats", selectedSeats);
    const isVisible = selectedSeats.length >= 1;
    // Function to toggle seat selection

    const handleSubmitSeats = () => {
        console.log("this are the seats ", selectedSeats);
        setOccupiedSeats((prev) => [...prev, ...selectedSeats]);
    };
    const handleSeatSelection = (seatId: any) => {
        // console.log("i am geting called");
        if (selectedSeats.length < 10 && !selectedSeats.includes(seatId)) {
            setSelectedSeats((prev) => [...prev, seatId]);
        }
        if (selectedSeats.includes(seatId)) {
            // console.log("i am from the selected seat");
            setSelectedSeats((prev) => [...prev.filter((item) => item !== seatId)]);
        }
        // ()=> setSelectedSeats((prev)=>[...prev,id])
    };

    const seatLayot = {
        A: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        B: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        C: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        D: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        E: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        F: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        G: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        H: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        I: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        J: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    };

    // const rows = Object.keys(seatLayot)
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

    // console.log(seatSvg)
    const leftSeats = [1, 2, 3];
    const middleSeats = [4, 5, 6, 7];
    const rightSeats = [8, 9, 10];

    const TinySeat = ({ num, id }: any) => {
        const isOccupied = occupiedSeats.includes(id);
        // console.log("THis is id ", id);
        // console.log("THis is isoccupied  ", isOccupied);

        return isOccupied ? (
            <div
                id={id}
                className="
        w-5 h-5 m-0.5 p-1 
        flex items-center justify-center 
        text-[8px] font-medium 
        border rounded-[3px] 
        transition-all duration-300 ease-in-out
        bg-gray-300           
        text-gray-400         
        border-gray-200       
        opacity-80            
        cursor-not-allowed    
    "
            >
                {num}
            </div>
        ) : (
            <div
                onClick={() => {
                    handleSeatSelection(id);
                }}
                id={id}
                className={`
        w-5 h-5 m-0.5 p-1 
            flex items-center justify-center 
            text-[8px] font-medium 
            border rounded-[3px] 
            cursor-pointer 
            transition-all duration-300 ease-in-out
            
            // --- Conditional Styles ---
            ${selectedSeats.includes(id)
                        ? "bg-red-500 text-white border-red-500 scale-110 shadow-lg"
                        : "bg-white text-gray-800 border-gray-300 scale-100 hover:shadow-sm"
                    }


        `}
            >
                {num}
            </div>
        );
    };

    return (
        <div>
            <div className="flex  items-center gap-4 pt-5 pb-5 p-2 ">
                <div>
                    <ChevronLeftIcon className="text-gray-600  w-6 h-6" />
                </div>
                <div>
                    <div className="text-lg font-bold text-gray-900 mb-0.5">
                        Kantara A Legend: Chapter 1
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-700 mb-0.5">
                            Eros Cinema, Churchgate, Mumbai
                        </span>
                        <span className="text-xs text-gray-500">U/A • Hindi • 2h 45m</span>
                    </div>
                </div>
            </div>

            <div className="flex pl-12 pb-2 pt-2 items-center space-x-4 max-w-xs">
                {/* 1. Date Text Block (Sun 23 Nov, 2025) */}
                <div className="flex flex-col items-center">
                    {/* Day of the Week */}
                    <span
                        className="
                    text-sm 
                    font-bold 
                    text-gray-900 
                    mb-0.5          
                "
                    >
                        Mon
                    </span>

                   
                    <span
                        className="
                    text-xs
                     
                    text-gray-600
                "
                    >
                        23 Nov, 2025
                    </span>
                </div>

                {/* 2. Time Button Block (6:00 PM) - Styled as a Div */}
                <div
                    className="
                bg-red-500 
                text-white 

                text-sm
                font-bold 
                px-3 py-2
                rounded-md
                shadow-md
                cursor-pointer        
                min-w-[90px]          
                flex items-center justify-center
            "
                >
                    <span>11:00 PM</span>
                </div>
            </div>

            <div className="text-gray-700 p-2 text-center font-semibold">
                CLASSIC : ₹ 400.00{" "}
            </div>

            <div className="w-full  border-t p-5 overflow-x-auto">
                {rows.map((rowLabel) => (
                    <div key={rowLabel} className="flex items-center mb-1">
                        {/* --- Row Label (A, B, C...) --- */}
                        <div
                            className="
                        w-10                 /* Fixed width for alignment */
                        mr-2                 /* Gap between label and seats */
                        flex items-center justify-center 
                        text-xs font-bold text-gray-500
                        
                    "
                        >
                            {rowLabel}
                        </div>

                        {/* --- Group 1 (1-3) --- */}
                        <div className="flex ">
                            {leftSeats.map((num) => (
                                <TinySeat key={num} id={num + rowLabel} num={num} />
                            ))}
                        </div>

                        {/* --- Gap 1 --- */}
                        <div className="w-8"></div>

                        {/* --- Group 2 (4-7) --- */}
                        <div className="flex">
                            {middleSeats.map((num) => (
                                <TinySeat key={num} id={num + rowLabel} num={num} />
                            ))}
                        </div>

                        {/* --- Gap 2 --- */}
                        <div className="w-8"></div>

                        {/* --- Group 3 (8-10) --- */}
                        <div className="flex">
                            {rightSeats.map((num) => (
                                <TinySeat key={num} id={num + rowLabel} num={num} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-5 mb-4">
                <div className="w-full h-10 relative">
                    <img src="/Screen.png" alt="" />
                    <div className="text-center text-xs font-semibold text-gray-600 mt-2">
                        SCREEN THIS WAY
                    </div>

                    <div className="text-black pb-10 text-sm mt-5 flex items-center justify-center gap-5 w-full ">
                        <div className="flex gap-2 items-center  text-xs ">
                            {" "}
                            <div
                                className="h-5 w-5 rounded-md bg-white  text-gray-800 
                                    border border-[#cbcbcb]  "
                            ></div>
                            Available{" "}
                        </div>
                        <div className="flex items-center gap-2 text-xs ">
                            {" "}
                            <div
                                className="h-5 w-5 rounded-md  bg-gray-200   text-gray-800 
        border border-[#cbcbcb]  "
                            ></div>
                            Occupied{" "}
                        </div>
                        <div className="flex items-center gap-2 text-xs ">
                            {" "}
                            <div
                                className="h-5 w-5 rounded-md bg-red-500  text-gray-800 
        border border-[#cbcbcb] "
                            ></div>
                            Selected{" "}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`fixed bottom-0 left-0 right-0         
        w-full h-24 
        bg-white shadow-2xl z-40
        flex items-center justify-center p-4 
        
      transition-transform duration-500 ease-out

      ${isVisible ? "transform translate-y-0" : " transform translate-y-full"}
        
        `}
            >
                <button
                    onClick={handleSubmitSeats}
                    className="
       w-11/12 max-w-lg
            bg-red-500 text-white text-lg font-bold
            px-8 py-3 rounded-xl shadow-lg
            transition-colors duration-200
            hover:bg-red-600 active:bg-red-700
        
    "
                >
                    Proceed ({selectedSeats.length}{" "}
                    {selectedSeats.length === 1 ? "Seat" : "Seats"})
                </button>
            </div>
        </div>
    );
}

export default SeatingSelectionScreen;
