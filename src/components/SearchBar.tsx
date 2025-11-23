import React from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


function SearchBar() {
    return (
        <div className='h-10 w-1/2 flex items-center  rounded-xl border border-[#717171] ' >
            <MagnifyingGlassIcon className='h-6 w-6 ml-2  text-white' />
            <input className='w-full h-full ml-2 ' placeholder='Search for movies..' type="text" name="" id="" />
        </div>
    )
}

export default SearchBar
