import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBar({ width }:{width:string}) { 
    return (
        <div
            style={{ width: width }}
            className={`
                group
                flex items-center rounded-xl 
                
                bg-gray-50 
                border-2 border-transparent
                
                /* Interaction States */
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

export default SearchBar;