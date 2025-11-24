import Banner from '@/src/components/MovieCard'
import Search_bar from '@/src/components/SearchBar'
import React from 'react'
import SelectCityModal from '@/src/components/SelectCityModal'
import ShowTime from '@/src/components/ShowTimingCard'
import SeatingSelectionScreen from '@/src/components/SeatingSelectionScreen'
import NavBar from '@/src/components/NavBar'

function Page() {
  return (
    <div>
{/* <Search_bar/>  */}
{/* <Banner/> */}
{/* <SelectCityModal/> */}
{/* <ShowTime/> */}
{/* <div className='h-16 w-full bg-red-500' >nav</div> */}
<NavBar/>
<SeatingSelectionScreen/>

   </div>
  )
}

export default Page
