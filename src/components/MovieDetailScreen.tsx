import { ChevronLeftIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function MovieDetailScreen({handleBookBtnClickToggle,isNavigaationEnabled}:any) {
    return (
        // Main Container with the specific red background
        <div  className="min-h-screen relative box-border bg-[#BD3B3B] flex flex-col items-center px-6 py-14 font-sans">
         
        {isNavigaationEnabled ? (
         <Link href={"/"} >
          <div className='absolute left-3 top-4 flex gap-2 font-semibold' >
            <ChevronLeftIcon className='text-white w-6 h-6  '/>
            Home
          </div>
         </Link> ) : null
        }       
                
            {/* 1. Movie Poster Card */}
            {/* Uses shadow and rounding to pop off the background */}
            <div className="relative w-64 h-96 mb-8 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <Image
                    src="https://image.tmdb.org/t/p/w300/fGodXWqJkkkbSebPIlxLSygV8GY.jpg"
                    alt="Kantara A Legend: Chapter 1"
                    fill // Fills the parent container
                    className="object-cover"
                    priority
                />
            </div>

            {/* 2. Title Section */}
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center leading-tight mb-6 drop-shadow-md">
                Kantara A Legend:<br />
                Chapter 1
            </h1>

            {/* 3. Metadata Section */}
            {/* Flex container to align U/A, Languages, and Genres with dots */}
            <div className="text-white text-sm md:text-base font-medium flex flex-col items-center gap-4 mb-10 w-full max-w-md">
                
                {/* Top Row: U/A • Languages • Genres */}
                <div className="flex items-center justify-center gap-4 text-center">
                    
                    {/* Rating */}
                    <span className="whitespace-nowrap">U/A</span>
                    
                    <span className="text-red-200">•</span>

                    {/* Languages (Stacked) */}
                    <div className="flex flex-col leading-snug">
                        <span>Hindi, Kannada,</span>
                        <span>Telugu</span>
                    </div>

                    <span className="text-red-200">•</span>

                    {/* Genres (Stacked) */}
                    <div className="flex flex-col leading-snug">
                        <span>Action, Drama,</span>
                        <span>Thriller</span>
                    </div>
                </div>

                {/* Bottom Row: Release Date */}
                <div className="text-red-100 font-medium mt-1">
                    Release Date : 02 Oct, 2025
                </div>
            </div>

            {/* 4. "Book Tickets" Button */}
            {/* Fixed at bottom of content or static, styled white with dark text */}
            <button type='button' onClick={handleBookBtnClickToggle} className="
                w-full max-w-sm 
                bg-white 
                text-gray-900 
                font-bold text-lg 
                py-4 
                rounded-xl 
                shadow-lg 
                hover:bg-gray-50 
                active:scale-95 
                transition-all duration-200
            ">
                Book Tickets
            </button>

            <button className="
                w-full max-w-sm 
                mt-5
                flex items-center justify-center gap-2
                bg-transparent 
                text-white 
                font-bold text-lg 
                py-4 
                border-2
                rounded-xl 
                shadow-lg 
                hover:bg-gray-50 
                active:scale-95 
                transition-all duration-200
            ">
                <PlayCircleIcon className='text-white w-6 h-6' />
                Watch Trailer
            </button>

        </div>
    );
}

export default MovieDetailScreen;