import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function MovieCard({movieData}:any) {

    console.log("movid",movieData.posterUrl)
    return (
        // <>
        <Link href={`/movie/${"kantara"}`}>
            <div className='
            w-[150px]
            bg-white
            rounded-lg
            shadow-xl
            overflow-hidden
        '>
                <div className='w-full  h-auto'>
                    <Image
                        className='w-full h-auto object-cover'
                        src={movieData.posterUrl}
                        alt="Kantara Movie Poster"
                        width={300}
                        height={450}
                    />
                </div>
        {/* // hostname: "www.themoviedb.org", */}

                <div className='p-2'>
                    <div className='
                    text-base
                    font-bold
                    text-black
                    w-full
                    truncate
                    mb-0.5
                '>
                        {movieData.title}
                    </div>

                    <div className='
                    text-sm
                    text-gray-600
                    whitespace-nowrap
                '>
                        {movieData.certificate} &bull; {movieData.languages}
                    </div>
                </div>
            </div>
        </Link>

        //  </>
    );
}

export default MovieCard;
