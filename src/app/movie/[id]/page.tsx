"use client"
import AppFooter from '@/src/components/AppFooter'
import LanguageModal from '@/src/components/LanguageButton';
import MovieCard from '@/src/components/MovieCard'
import MovieDetailScreen from '@/src/components/MovieDetailScreen'
import NavBar from '@/src/components/NavBar';
import  { useState } from 'react'

function page() {

  const [isClickedOnBookBtn, setisClickedOnBookBtn] = useState(false)

  const movieDescription = "Exploring the origins of Kaadubettu Shiva during the Kadamba dynasty era, it delves into the untamed wilderness and forgotten lore surrounding his past.";

  const castList = [
    "Rishab Shetty as Berme",
    "Rukmini Vasanth as Kanakavathi",
    "Gulshan Devaiah as Kulashekara",
    "Jayaram as Vijayendra",
    "Rakesh Poojary (role unspecified)",
    "Pramod Shetty (role unspecified)",
    "Prakash Thuminad (role unspecified)",
    "Deepak Rai Panaje (role unspecified)"
  ];

  const handleBookBtnClickToggle = () => {
    setisClickedOnBookBtn(prev => !prev)
  }

  return (
    <div>


      {isClickedOnBookBtn ?
        (<div className=' w-96 h-full absolute inset-0 z-10 ' >
          <LanguageModal onClose={handleBookBtnClickToggle} />
        </div>) : null
      }
          {/* <LanguageModal isOpen={isClickedOnBookBtn} /> */}


      <NavBar />
      <MovieDetailScreen isNavigaationEnabled={true} handleBookBtnClickToggle={handleBookBtnClickToggle} />
      <div className="bg-white p-6 max-w-2xl">

        {/* 1. About Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            About the movie
          </h2>
          <p className="text-gray-600 leading-relaxed text-base">
            {movieDescription}
          </p>
        </div>

        {/* 2. Cast Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Cast
          </h2>

          {/* Cast List Container */}
          <div className="flex flex-col items-start gap-3">
            {castList.map((actor, index) => (
              <div
                key={index}
                className="
                                bg-gray-200           /* Light gray background */
                                text-gray-900         /* Dark text */
                                px-4 py-2             /* Horizontal & Vertical padding */
                                rounded-full          
                                text-sm font-medium   /* Typography styles */
                                cursor-default        /* Optional: indicates not clickable */
                            "
              >
                {actor}
              </div>
            ))}
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  )
}

export default page
