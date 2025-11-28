"use client"
import React, { useEffect, useState } from 'react'
import { 
  MapPinIcon, 
  UserCircleIcon, 
  MagnifyingGlassIcon, 
  ChevronLeftIcon, 
  PlayCircleIcon as OutlinePlayIcon 
} from '@heroicons/react/24/outline'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { getAllMovies } from '../actions/movies';
import MovieCard from '../components/MovieCard';
import { useQuery } from '@tanstack/react-query';

// --- IMPORTANT: UNCOMMENT THIS IN YOUR LOCAL PROJECT ---
// import { getAllMovies } from '../actions/movies' 

// --- TEMPORARY PLACEHOLDER FOR PREVIEW (Delete this when using real backend) ---
// const getAllMovies = async () => {
//     console.log("Fetching movies from backend...");
//     // This allows the UI to render without crashing in the preview.
//     // In your real app, this function is replaced by your import.
//     return { Movie: [] }; 
// }

// --- TYPES ---

interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  trailerUrl: string;
  duration: number;
  releaseDate: string;
  genre: string;
  languages: string;
  certificate: "U" | "UA" | "A" | "S";
  cast: string;
  status: "NOW_SHOWING" | "UPCOMING";
}

// --- COMPONENTS ---

// 1. SEARCH BAR
function SearchBar({ width }: { width?: string }) { 
    return (
        <div
            style={{ width: width }}
            className={`
                group
                flex items-center rounded-xl 
                bg-gray-50 
                border-2 border-transparent
                hover:bg-white hover:shadow-md
                focus-within:bg-white focus-within:border-red-500/50 focus-within:shadow-lg focus-within:shadow-red-500/10
                px-3 py-2                
                shadow-sm                
                transition-all duration-300 ease-out
            `} 
        >
            <MagnifyingGlassIcon className='h-5 w-5 ml-1 text-gray-400 group-hover:text-gray-600 group-focus-within:text-red-500 transition-colors duration-300 shrink-0' />
            <input
                className='
                    w-full ml-2 
                    bg-transparent          
                    focus:outline-none 
                    placeholder-gray-400 group-focus-within:placeholder-gray-300
                    text-gray-800 font-medium
                ' 
                placeholder='Search for movies...' 
                type="text" 
            />
        </div>
    );
}

// 2. NAV BAR (Desktop Optimized)
function NavBar() {
    return (
        <div className='w-full max-w-7xl mx-auto flex items-center justify-between py-2 sm:py-3 px-2 sm:px-6 lg:px-8'> 
            <a href="/">
                <div className='bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-900/50 rounded-full h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center shrink-0 border border-white/10 transition-transform hover:scale-105'>
                    <span className='text-white text-[10px] lg:text-xs font-extrabold leading-tight text-center tracking-tighter'>
                        SHOW<br/>TIME
                    </span>
                </div>
            </a>

            <div className='flex items-center mx-4 grow min-w-0'> 
                <div className='mr-2 shrink-0 p-1.5 bg-white/10 rounded-full backdrop-blur-md border border-white/5'>
                    <MapPinIcon className='text-red-400 h-4 w-4 lg:h-5 lg:w-5' />
                </div>
                <div className='flex flex-col min-w-0'>
                    <span className='font-bold text-white leading-none truncate text-sm lg:text-base'>Mumbai</span>
                    <span className='text-xs text-gray-400 leading-none truncate mt-1 lg:text-sm'>India</span>
                </div>
            </div>

            <div className="hidden md:flex items-center space-x-6 mr-6">
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Movies</a>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Events</a>
                <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sports</a>
            </div>

            <div className='shrink-0'>
                <div className='flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer group'>
                    <span className="hidden md:block text-sm font-medium text-white group-hover:text-red-400 transition-colors">Sign In</span>
                    <UserCircleIcon className='text-white/90 w-8 h-8 lg:w-10 lg:h-10' /> 
                </div>
            </div>
        </div>
    )
}

// 3. MOVIE CARD
// function MovieCard({ movieData }: { movieData: Movie }) {
//     return (
//         <a href={`/movie/${movieData.id}`} className="block w-full h-full"> 
//             <div className='
//                 group
//                 w-full
//                 h-full
//                 bg-[#1f2937]
//                 border border-white/5
//                 rounded-xl
//                 overflow-hidden
//                 transition-all duration-300
//                 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-1
//                 flex flex-col
//             '>
//                 <div className='relative w-full aspect-[2/3] overflow-hidden'>
//                     <img
//                         className='
//                             w-full h-full 
//                             object-cover 
//                             transition-transform duration-500 
//                             group-hover:scale-110
//                         '
//                         src={movieData.posterUrl}
//                         alt={`${movieData.title} Poster`}
//                     />
//                     <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1f2937] to-transparent opacity-100" />
//                 </div>

//                 <div className='p-3 relative bg-[#1f2937] flex-1 flex flex-col justify-end'>
//                     <div className='text-white font-bold text-base truncate mb-1 leading-tight'>
//                         {movieData.title}
//                     </div>

//                     <div className='flex items-center gap-2 text-xs text-gray-400 font-medium'>
//                         <span className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 shrink-0">
//                            {movieData.certificate}
//                         </span>
//                         <span className="truncate">
//                            {movieData.languages}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </a>
//     );
// }

// 4. MOVIE DETAIL SCREEN (HERO) - Desktop Optimized
function MovieDetailScreen({ handleBookBtnClickToggle, isNavigaationEnabled }: any) {
    const posterUrl = "https://image.tmdb.org/t/p/original/fGodXWqJkkkbSebPIlxLSygV8GY.jpg";

    return (
        <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[650px] overflow-hidden font-sans group rounded-3xl">
            <div className="absolute inset-0 z-0">
                <img
                    src={posterUrl}
                    alt="Backdrop"
                    className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-40 scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a1a2e] via-[#1a1a2e]/60 to-transparent" />
                <div className="absolute inset-0 bg-black/20" /> 
            </div>

            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 py-10 md:px-12 flex flex-col md:flex-row items-center md:items-end md:justify-start gap-8 lg:gap-16 pt-20 md:pt-32">
                {isNavigaationEnabled && (
                    <a href="/">
                        <div className='absolute left-5 top-6 z-50 flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10'>
                            <ChevronLeftIcon className='w-5 h-5' />
                            <span>Back</span>
                        </div>
                    </a>
                )}

                <div className="relative shrink-0 w-[200px] h-[300px] md:w-[240px] md:h-[360px] lg:w-[280px] lg:h-[420px] shadow-2xl shadow-black/60 ring-1 ring-white/20 rounded-xl overflow-hidden transform transition-transform duration-500 hover:scale-[1.02]">
                    <img
                        src={posterUrl}
                        alt="Kantara"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-2xl pb-4">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-xl">
                        Kantara A Legend:<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                            Chapter 1
                        </span>
                    </h1>

                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                        <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-xs md:text-sm font-semibold text-gray-200 backdrop-blur-sm">UA</span>
                        <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-xs md:text-sm font-semibold text-gray-200 backdrop-blur-sm">Hindi, Kannada, Telugu</span>
                        <span className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-xs md:text-sm font-semibold text-gray-200 backdrop-blur-sm">Action, Thriller</span>
                        <span className="px-3 py-1 rounded-md bg-red-600/20 border border-red-500/30 text-xs md:text-sm font-bold text-red-400 backdrop-blur-sm">02 Oct, 2025</span>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={handleBookBtnClickToggle}
                            className="flex-1 sm:flex-none sm:w-48 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-red-900/40 hover:from-red-500 hover:to-red-600 active:scale-[0.98] transition-all duration-200 border border-red-500/50"
                        >
                            Book Tickets
                        </button>

                        <button className="flex-1 sm:flex-none sm:w-48 flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md text-white font-semibold text-lg py-3.5 rounded-xl border border-white/20 hover:bg-white/10 active:scale-[0.98] transition-all duration-200">
                            <OutlinePlayIcon className='text-white w-6 h-6' />
                            Watch Trailer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 5. APP FOOTER
function AppFooter() {
    return (
        <footer className="bg-[#0f3460] text-white w-full py-10 sm:px-10 mt-0">
            <div className="max-w-7xl p-5 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between border-b border-white/10 pb-8">
                    <div className="mb-8 sm:mb-0 w-full sm:w-1/2 lg:w-1/4">
                        <h3 className="text-lg text-white font-bold tracking-wide mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Contact Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">FAQs</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Terms of Service</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</li>
                        </ul>
                    </div>
                    
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <h3 className="text-lg text-white font-bold tracking-wide mb-4">ShowTime</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Press</li>
                        </ul>
                    </div>
                </div>

                <div className="py-8 border-b border-white/10">
                    <h3 className="text-lg text-white font-bold tracking-wide mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        {/* Placeholder Social Icons */}
                        <div className="bg-white p-2 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors cursor-pointer text-black font-bold flex items-center justify-center text-xs">FB</div>
                        <div className="bg-white p-2 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors cursor-pointer text-black font-bold flex items-center justify-center text-xs">TW</div>
                        <div className="bg-white p-2 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors cursor-pointer text-black font-bold flex items-center justify-center text-xs">IG</div>
                    </div>
                </div>

                <div className="pt-8 text-center text-sm text-gray-500 font-medium">
                    &copy; {new Date().getFullYear()} ShowTime. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

// --- MAIN PAGE ---

function Page() {
  const [movies, setmovies] = useState<Movie[]>([])

//   useEffect(() => {
//     const helperFun = async () => {
//       const MovieData: any = await getAllMovies()
//       // console.log("movie",MovieData)
//       setmovies(MovieData?.Movie || []) 
//     }
//     helperFun()
//   }, [])

  const helperFun = async () => {
      const MovieData: any = await getAllMovies()
      return MovieData.Movie
      // console.log("movie",MovieData)
    //   setmovies(MovieData?.Movie || []) 
    }
    // helperFun()

  const {isPending, error, data}:any = useQuery({
    queryKey: ['movieCardData'],
    queryFn: async () => await getAllMovies()


  })

  console.log("This is data",data)


  return (
    <div className='min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex flex-col relative overflow-x-hidden font-sans'>
      
      <div className="fixed top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000 pointer-events-none"></div>

      {/* Floating Header */}
      <div className="fixed top-0 z-50 w-full px-4 pt-4 pb-2 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
            <div className="flex flex-col gap-3 backdrop-blur-xl rounded-2xl p-3 border border-white/10 bg-white/5 shadow-2xl transition-all duration-300 hover:bg-white/10">
            <NavBar />
            <div className="w-full px-1">
                <SearchBar width={"100%"} /> 
            </div>
            </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto pb-20 pt-[180px] md:pt-[200px] px-4 sm:px-6 lg:px-8"> 
        
        {/* Featured Movie Section */}
        <div className='w-full mb-12'>
          <div className='relative group'>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            <div className='relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 bg-[#1a1a2e] transform transition-transform duration-500'>
              <MovieDetailScreen />
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className='flex items-center gap-4 mb-8 pl-2'>
          <div className="h-10 w-1.5 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
          <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400'>
            Now Showing
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10'>
        {data?.Movie?.map((Data:any) => (
            <div key={Data.id} className="relative group perspective-1000">
                {/* <div className="transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl shadow-black/50 rounded-xl overflow-hidden h-full"> */}
                <MovieCard movieData={Data} />
                {/* </div> */}
            </div>
        ))}
        </div>
      </main>

      <div className="border-t border-white/10 bg-[#0f3460] relative z-10">
        <AppFooter />
      </div>

    </div>
  )
}

export default Page