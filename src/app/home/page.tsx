import NavBar from '@/src/components/NavBar'
import SearchBar from '@/src/components/SearchBar'
import MovieCard from '@/src/components/MovieCard'
import AppFooter from '@/src/components/AppFooter'
import MovieDetailScreen from '@/src/components/MovieDetailScreen'

function Page() {
  return (
    <div className='w-full h-full'  >

      <NavBar />
      <div className='p-5  w-full h-12 ' >

        <SearchBar width={"330px"} />
      </div>
      <div className='w-full h-full p-4' >
        <div className=' overflow-hidden mt-5 rounded-2xl h-full ' >
          <MovieDetailScreen />
        </div>
      </div>

      <div className='text-black text-xl font-bold pt-5 pl-5 overflow-y-auto ' >Now Showing</div>

      <div className=' h-full w-full p-5 grid grid-cols-2 gap-6 ' >


        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />

      </div>

      <AppFooter />


    </div>
  )
}

export default Page
