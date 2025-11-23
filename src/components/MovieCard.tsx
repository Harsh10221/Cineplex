import Image from 'next/image';
import React from 'react';

function MovieCard() {
    return (
        <div className='
            w-[150px]
            bg-white
            rounded-[8px]
            shadow-xl
            overflow-hidden
        '>
            <div className='w-full h-auto'>
                <Image
                    className='w-full h-auto object-cover'
                    src="https://image.tmdb.org/t/p/w300/fGodXWqJkkkbSebPIlxLSygV8GY.jpg"
                    alt="Kantara Movie Poster"
                    width={300}
                    height={450}
                />
            </div>
            
            <div className='p-2'>
                <div className='
                    text-base
                    font-bold
                    text-black
                    w-full
                    truncate
                    mb-0.5
                '>
                    Kantara A Legend: Chapter 1 (The Long Title)
                </div>
                
                <div className='
                    text-sm
                    text-gray-600
                    whitespace-nowrap
                '>
                    U/A &bull; Hindi, Kannada,...
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
