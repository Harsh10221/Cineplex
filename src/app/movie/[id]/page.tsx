"use client"
import AppFooter from '@/src/components/AppFooter'
import LanguageModal from '@/src/components/LanguageButton';
import MovieDetailScreen from '@/src/components/MovieDetailScreen'
import NavBar from '@/src/components/NavBar';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react'

function Page() {

  const [isClickedOnBookBtn, setisClickedOnBookBtn] = useState(false)

  const movieDescription = "Exploring the origins of Kaadubettu Shiva during the Kadamba dynasty era, it delves into the untamed wilderness and forgotten lore surrounding his past. A tale of divinity, conflict, and the eternal struggle between man and nature.";

  const castList = [
    { name: "Rishab Shetty", role: "Berme" },
    { name: "Rukmini Vasanth", role: "Kanakavathi" },
    { name: "Gulshan Devaiah", role: "Kulashekara" },
    { name: "Jayaram", role: "Vijayendra" },
    { name: "Rakesh Poojary", role: "Supporting" },
    { name: "Pramod Shetty", role: "Supporting" },
    { name: "Prakash Thuminad", role: "Supporting" },
    { name: "Deepak Rai Panaje", role: "Supporting" }
  ];

  const handleBookBtnClickToggle = () => {
    setisClickedOnBookBtn(prev => !prev)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans relative'>
      
      {/* 1. FIXED NAVBAR - Consistent with Home Page */}
      <div className="fixed top-0 z-50 w-full px-4 pt-4 pb-2 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-none">
        <div className="max-w-7xl mx-auto pointer-events-auto">
            <div className="backdrop-blur-xl rounded-2xl p-2 border border-white/10 bg-white/5 shadow-2xl">
              <NavBar />
            </div>
        </div>
      </div>

      {/* 2. MODAL OVERLAY */}
      {isClickedOnBookBtn && (
        <div className='fixed inset-0 z-[60] flex items-center justify-center  backdrop-blur-sm p-4 animate-in fade-in duration-200'>
           {/* Clicking outside closes the modal */}
           <div className="absolute inset-0" onClick={handleBookBtnClickToggle}></div>
           <div className="relative z-10">
             <LanguageModal onClose={handleBookBtnClickToggle} />
           </div>
        </div>
      )}

      {/* 3. HERO SECTION - Full width */}
      <div className="relative w-full">
         <MovieDetailScreen isNavigaationEnabled={true} handleBookBtnClickToggle={handleBookBtnClickToggle} />
      </div>

      {/* 4. CONTENT SECTION - Constrained width, Glassmorphic look */}
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        
        {/* About Section */}
        <section className="relative">
           <div className="absolute -inset-4 bg-white/5 rounded-2xl blur-xl opacity-0 md:opacity-100"></div>
           <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-8 bg-red-600 rounded-full"></span>
                Storyline
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg font-light">
                {movieDescription}
              </p>
           </div>
        </section>

        {/* Cast Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 px-2">
             <span className="w-1 h-8 bg-red-600 rounded-full"></span>
             Top Cast
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {castList.map((actor, index) => (
              <div
                key={index}
                className="
                    group
                    flex flex-col items-center justify-center text-center
                    bg-[#1f2937] border border-white/5
                    p-4 rounded-xl
                    transition-all duration-300
                    hover:bg-white/10 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40
                "
              >
                {/* Removed Avatar Circle as requested */}
                
                <div className="text-white font-bold text-base line-clamp-1 group-hover:text-red-400 transition-colors">
                    {actor.name}
                </div>
                <div className="text-gray-400 text-xs font-medium mt-1 uppercase tracking-wide">
                    {actor.role}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <div className="border-t border-white/10 bg-[#0f3460] mt-10">
        <AppFooter />
      </div>

    </div>
  )
}

export default Page