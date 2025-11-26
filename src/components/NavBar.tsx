import { MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';

// function NavBar() {
//     return (
//         // REMOVED: bg-white, sticky, border-b. 
//         // WHY: The parent container in Page.tsx handles the glassmorphism and positioning now.
//         // If we kept bg-white here, it would block the blur effect.
//         <div className='w-full bg-red-500 flex items-center justify-between py-2'> 

//             {/* Logo - Added gradient and shadow for depth */}
//             <a href="/">
//                 <div className='bg-linear-to-br from-red-600 to-red-700 shadow-lg shadow-red-900/50 rounded-full h-10 w-10 flex items-center justify-center shrink-0 border border-white/10'>
//                     <span className='text-white text-[10px] font-extrabold leading-tight text-center tracking-tighter'>
//                         SHOW<br/>TIME
//                     </span>
//                 </div>
//             </a>

//             {/* Location Info - Updated text colors for dark mode */}
//             <div className='flex items-center mx-4 grow min-w-0'> 
//                 <div className='mr-2 shrink-0 p-1.5 bg-white/10 rounded-full backdrop-blur-md border border-white/5'>
//                     <MapPinIcon className='text-red-400 h-4 w-4' />
//                 </div>
//                 <div className='flex flex-col min-w-0'>
//                     {/* Text is now white/gray to be visible on dark bg */}
//                     <span className='font-bold text-white leading-none truncate text-sm'>Mumbai</span>
//                     <span className='text-xs text-gray-400 leading-none truncate mt-1'>India</span>
//                 </div>
//             </div>

//             {/* User Profile - Updated icon color */}
//             <div className='shrink-0'>
//                 <div className='p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer'>
//                     <UserCircleIcon className='text-white/90 w-8 h-8' /> 
//                 </div>
//             </div>

//         </div>
//     )
// }
function NavBar() {
    return (
        <div className='w-full max-w-7xl mx-auto flex items-center justify-between py-2 sm:py-3 px-2 sm:px-6 lg:px-8'>
            <a href="/">
                <div className='bg-gradient-to-br from-red-600 to-red-700 shadow-lg shadow-red-900/50 rounded-full h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center shrink-0 border border-white/10 transition-transform hover:scale-105'>
                    <span className='text-white text-[10px] lg:text-xs font-extrabold leading-tight text-center tracking-tighter'>
                        SHOW<br />TIME
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

export default NavBar;