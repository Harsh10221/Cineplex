'use client'
import { ArrowLeftCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
// import file from '@/public/file.svg'
import seat from '@/public/seat.svg'
import React, { useState } from 'react'
import SeatCheckbox from './SeatCheckBox'

function SeatingSelectionScreen() {

    const [selectedSeats, setSelectedSeats] = useState(['A1', 'D5']); // Example: A1 is pre-selected

    // Function to toggle seat selection
    const handleSeatToggle = (seatId: any) => {
        console.log("clicking on me mat ")
        setSelectedSeats(prev =>
            prev.includes(seatId)
                ? prev.filter(id => id !== seatId) // Deselect
                : [...prev, seatId] // Select
        );
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
    }

    // const rows = Object.keys(seatLayot)
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    // console.log(seatSvg)
    const leftSeats = [1, 2, 3];
const middleSeats = [4, 5, 6, 7];
const rightSeats = [8, 9, 10];

    const TinySeat = ({ num }:any) => (
    <div className='
        w-5 h-5              /* YOUR SIZE */
        m-0.5                /* Tiny margin */
        p-1                  /* Padding */
        flex items-center justify-center 
        text-[8px]           /* YOUR FONT SIZE */
        font-medium 
        text-gray-800 
        border border-[#cbcbcb] 
        rounded-[3px]        /* YOUR RADIUS */
        transition-colors hover:border-blue-500 cursor-pointer
    '>
        {num}
    </div>
);


    return (
        <div>
            <div className='flex  items-center gap-2 ' >

                <div>
                    <ArrowLeftIcon className='text-gray-600 w-6 h-6' />
                </div>
                <div>
                    <div className='text-xl font-semibold text-gray-900 mb-0.5'>
                        Kantara A Legend: Chapter 1</div>
                    <div className='flex flex-col' >
                        <span className='text-sm text-gray-700 mb-0.5' >Eros Cinema, Churchgate, Mumbai</span>
                        <span className='text-xs text-gray-500' >U/A • Hindi • 2h 45m</span>
                    </div>
                </div>

            </div>

            <div className='flex pl-8 pt-2 items-center space-x-4 max-w-xs'>

                {/* 1. Date Text Block (Sun 23 Nov, 2025) */}
                <div className='flex flex-col items-start'>

                    {/* Day of the Week */}
                    <span className='
                    text-base 
                    font-bold 
                    text-gray-900 
                    mb-0.5             /* Small spacing between lines */
                '>
                        Sun
                    </span>

                    {/* Full Date */}
                    <span className='
                    text-sm 
                    text-gray-600
                '>
                        23 Nov, 2025
                    </span>

                </div>

                {/* 2. Time Button Block (6:00 PM) - Styled as a Div */}
                <div className='
                bg-red-500 
                text-white 
                text-lg 
                font-bold 
                px-4 py-2 
                rounded-lg
                shadow-md
                cursor-pointer         /* Added for visual cue, though not a <button> */
                min-w-[100px]          /* Ensure it matches the button size */
                flex items-center justify-center
            '>
                    <span>06:00 PM</span>
                </div>

            </div>



          <div className='w-full border p-5 border-t-black overflow-x-auto'>
            
            {rows.map((rowLabel) => (
                <div key={rowLabel} className='flex items-center mb-1'>
                    
                    {/* --- Row Label (A, B, C...) --- */}
                    <div className='
                        w-10                 /* Fixed width for alignment */
                        mr-2                 /* Gap between label and seats */
                        flex items-center justify-center 
                        text-xs font-bold text-gray-500
                    '>
                        {rowLabel}
                    </div>

                    {/* --- Group 1 (1-3) --- */}
                    <div className='flex'>
                        {leftSeats.map(num => <TinySeat key={num} num={num} />)}
                    </div>

                    {/* --- Gap 1 --- */}
                    <div className='w-8'></div> 

                    {/* --- Group 2 (4-7) --- */}
                    <div className='flex'>
                        {middleSeats.map(num => <TinySeat key={num} num={num} />)}
                    </div>

                    {/* --- Gap 2 --- */}
                    <div className='w-8'></div>

                    {/* --- Group 3 (8-10) --- */}
                    <div className='flex'>
                        {rightSeats.map(num => <TinySeat key={num} num={num} />)}
                    </div>

                </div>
            ))}
        </div>




            <div className='flex justify-center mt-10 mb-4'>
                <div className='w-full h-10 relative'>
                    {/* This div approximates the purple curved screen shape using a pseudo-element or complex border/shadow */}
                    {/* <div className='
                        absolute inset-x-0 bottom-0 h-4 bg-purple-500 
                        rounded-t-full 
                        opacity-50
                    '></div> */}
                    <img src="/Screen.png" alt="" />
                    <div className='text-center text-xs font-semibold text-gray-600 mt-6'>
                        SCREEN THIS WAY
                    </div>
                </div>
            </div>


        </div>
    )
}

export default SeatingSelectionScreen
