"use client"
import NavBar from '@/src/components/NavBar'
import SearchBar from '@/src/components/SearchBar'
import MovieCard from '@/src/components/MovieCard'
import AppFooter from '@/src/components/AppFooter'
import MovieDetailScreen from '@/src/components/MovieDetailScreen'
import { useEffect, useState } from 'react'
import { getAllMovies } from '../actions/movies'

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

function Page() {

  const [movies, setmovies] = useState<Movie[]>([])

  useEffect(() => {
    const helperFun = async () => {
      console.log("i called ")
      const MovieData: any = await getAllMovies()
      setmovies(MovieData?.Movie)
      console.log("THis is movie data from the backend ", MovieData)
    }
    helperFun()
  }, [])

  return (
    // CHANGE 1: Deep gradient background instead of flat white
    <div className='min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex flex-col relative overflow-x-hidden'>
      
      {/* Background decoration circles to add depth */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* CHANGE 2: Floating Glassmorphic Header */}
      <div className="fixed top-0 w-full z-50 px-4 pt-4 pb-2 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex flex-col gap-3 backdrop-blur-sm rounded-2xl p-2 border border-white/10 bg-white/5 shadow-2xl">
          <NavBar />
          <div className="w-full px-1">
             {/* Note: Ensure SearchBar component has transparent bg or matches dark theme */}
             <SearchBar width={"100%"} /> 
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-lg mx-auto pb-20 pt-[140px]"> {/* pt ensures content isn't hidden behind fixed header */}
        
        {/* CHANGE 3: Featured Movie Section with Glow */}
        <div className='w-full px-5 mb-8'>
          <div className='relative group'>
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className='relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 bg-[#1a1a2e]'>
              <MovieDetailScreen />
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div className='flex items-center gap-3 px-6 mb-6'>
          <div className="h-8 w-1 bg-red-500 rounded-full"></div>
          <h2 className='text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400'>
            Now Showing
          </h2>
        </div>

        {/* CHANGE 4: The Grid */}
        <div className='px-5'>
          <div className='grid grid-cols-2 gap-x-5 gap-y-8'>
            {movies?.map((Data) => (
              // This wrapper ensures the cards look good even if the component itself is basic
              <div key={Data.id} className="relative group perspective-1000">
                 <div className="transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl shadow-black/50 rounded-xl overflow-hidden">
                    <MovieCard movieData={Data} />
                 </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer stays at bottom */}
      <div className="border-t border-white/10 bg-[#0f3460]">
        <AppFooter />
      </div>

    </div>
  )
}

export default Page