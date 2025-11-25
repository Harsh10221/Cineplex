import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBar({ width }: { width: string }) { 
    return (
        <div
            style={{ width: width }}
            className={`
                flex items-center rounded-xl 
                
                bg-gray-50 border-gray-200 border 
                
                px-3 py-2                
                shadow-sm                
                transition-all duration-200
            `} 
        >
            <MagnifyingGlassIcon className='h-5 w-5 ml-1 text-gray-500 shrink-0' />
            <input
                className='
                    w-full ml-2 
                    bg-transparent          
                    focus:outline-none 
                    placeholder-gray-400  
                    text-gray-800          
                ' 
                placeholder='Search for movies..' 
                type="text" 
            />
        </div>
    );
}

export default SearchBar;