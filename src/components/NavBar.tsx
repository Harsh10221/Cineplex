import { MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

function NavBar() {
    return (
       <div className='bg-white h-16 sticky top-0 z-30 border-b flex items-center justify-between px-4'> 
    
    <Link href={"/"} >
        <div className='bg-red-500 rounded-full h-10 w-10 flex items-center justify-center shrink-0'>
            <span className='text-white text-xs font-extrabold leading-none'>
                SHOW<br/>TIME
            </span>
        </div>
    </Link>

        <div className='flex items-center mx-3 grow min-w-0'> 
            <div className='mr-1 shrink-0'>
                <MapPinIcon className='text-gray-600 h-5 w-5' />
            </div>
            <div className='flex flex-col min-w-0'>
                <span className='font-bold text-gray-900 leading-none truncate'>Mumbai</span>
                <span className='text-sm text-gray-500 leading-none truncate'>India</span>
            </div>
        </div>

        <div className='shrink-0'>
            <UserCircleIcon className='text-gray-600 w-8 h-8' /> 
        </div>

      </div>
    )
}

export default NavBar
