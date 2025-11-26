import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function MovieCard({ movieData }: any) {
    // Ideally, remove console.logs in production
    // console.log("movid", movieData.posterUrl)

    return (
        // LOGIC NOTE: You are hardcoding "kantara". You should probably use movieData.id or movieData.title here.
        <Link href={`/movie/${"kantara"}`} className="block w-full h-full">
            <div className='
                group
                w-full
                h-full
                bg-[#1f2937] /* Dark gray background */
                border border-white/5
                rounded-xl
                overflow-hidden
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-black/50 
                hover:shadow-2xl
                
            '>
                {/* Image Container - Aspect Ratio enforced */}
                <div className='relative w-full aspect-2/3 overflow-hidden'>
                    <Image
                        className='
                            w-full h-full 
                            object-cover 
                            transition-all duration-300  
                            group-hover:scale-110
                            
         
                        '
                        src={movieData.posterUrl}
                        alt={`${movieData.title} Poster`}
                        width={300}
                        height={450}
                        // Added priority for LCP optimization if needed, or loading="lazy"
                        loading="lazy"
                    />

                    {/* Dark Gradient Overlay at bottom of image for text readability transition */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1f2937] to-transparent opacity-100" />
                </div>

                {/* Content Area */}
                <div className='p-3 relative bg-[#1f2937]'>
                    <div className='
                        text-white
                        font-bold
                        text-base
                        truncate
                        mb-1
                        leading-tight
                    '>
                        {movieData.title}
                    </div>

                    <div className='
                        flex items-center gap-2
                        text-xs
                        text-gray-400
                        font-medium
                    '>
                        {/* Certificate Badge */}
                        <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10">
                            {movieData.certificate}
                        </span>

                        <span className="truncate">
                            {movieData.languages}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;