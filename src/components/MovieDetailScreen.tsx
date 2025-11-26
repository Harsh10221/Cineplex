import { ChevronLeftIcon, PlayCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

function MovieDetailScreen({ handleBookBtnClickToggle, isNavigaationEnabled }: any) {
    const posterUrl = "https://image.tmdb.org/t/p/w500/fGodXWqJkkkbSebPIlxLSygV8GY.jpg"; // Increased resolution for backdrop

    return (
        // CHANGED: Removed fixed red bg. Added overflow-hidden to contain the blurred image.
        // Used 'relative' to position the backdrop behind the content.
        <div className="relative w-full min-h-[600px] h-full overflow-hidden font-sans group">
            
            {/* 1. DYNAMIC BACKDROP - The "Netflix" Effect */}
            <div className="absolute inset-0 z-0">
                {/* Replaced next/image with standard img tag */}
                <img
                    src={posterUrl}
                    alt="Backdrop"
                    className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-50 scale-110" // blur-3xl creates the ambient color
                />
                {/* Gradient Overlay: Ensures text readability by fading to dark at the bottom/center */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/80 to-transparent" />
                <div className="absolute inset-0 bg-black/30" /> {/* General dimmer */}
            </div>

            {/* 2. Content Container - Z-index ensures it sits ON TOP of the backdrop */}
            <div className="relative z-10 flex flex-col items-center px-6 py-10 h-full justify-center">

                {isNavigaationEnabled ? (
                    <a href="/">
                        <div className='absolute left-5 top-6 flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10'>
                            <ChevronLeftIcon className='w-5 h-5' />
                            <span>Back</span>
                        </div>
                    </a>
                ) : null}

                {/* Poster Card - Added 'ring' and nicer shadow */}
                <div className="relative w-[180px] h-[270px] md:w-[220px] md:h-[330px] mb-8 rounded-xl shadow-2xl shadow-black/50 ring-1 ring-white/20 transform transition-transform duration-500 hover:scale-105">
                    <img
                        src={posterUrl}
                        alt="Kantara A Legend: Chapter 1"
                        className="w-full h-full object-cover rounded-xl"
                    />
                </div>

                {/* Title Section */}
                <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center leading-tight mb-4 tracking-tight drop-shadow-xl">
                    Kantara A Legend:<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                        Chapter 1
                    </span>
                </h1>

                {/* Metadata Tags - Modernized Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-8 w-full max-w-lg">
                    <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 backdrop-blur-sm">
                        U/A
                    </span>
                    <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 backdrop-blur-sm">
                        Hindi, Kannada, Telugu
                    </span>
                    <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 backdrop-blur-sm">
                        Action, Thriller
                    </span>
                    <span className="px-3 py-1 rounded-md bg-red-600/20 border border-red-500/30 text-xs font-bold text-red-400 backdrop-blur-sm">
                        02 Oct, 2025
                    </span>
                </div>

                {/* Action Buttons - Stacked for mobile, could be row for desktop */}
                <div className="w-full max-w-sm flex flex-col gap-4">
                    <button
                        type='button'
                        onClick={handleBookBtnClickToggle}
                        className="
                            w-full
                            bg-gradient-to-r from-red-600 to-red-700
                            text-white
                            font-bold text-lg
                            py-3.5
                            rounded-xl
                            shadow-lg shadow-red-900/40
                            hover:from-red-500 hover:to-red-600
                            active:scale-[0.98]
                            transition-all duration-200
                            border border-red-500/50
                        "
                    >
                        Book Tickets
                    </button>

                    <button className="
                        w-full
                        flex items-center justify-center gap-2
                        bg-white/5 backdrop-blur-md
                        text-white
                        font-semibold text-lg
                        py-3.5
                        rounded-xl
                        border border-white/20
                        hover:bg-white/10
                        active:scale-[0.98]
                        transition-all duration-200
                    ">
                        <PlayCircleIcon className='text-white w-6 h-6' />
                        Watch Trailer
                    </button>
                </div>

            </div>
        </div>
    );
}

export default MovieDetailScreen;