import { ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

// HARDCODED DATA FOR UI TESTING
const MOCK_DATA = [
    { 
        id: 1, 
        title: "Kantara: A Legend", 
        year: "2022", 
        rating: "9.8", 
        genre: "Thriller", 
        posterUrl: "https://image.tmdb.org/t/p/w200/fGodXWqJkkkbSebPIlxLSygV8GY.jpg" 
    },
    { 
        id: 2, 
        title: "Avengers: Endgame", 
        year: "2019", 
        rating: "8.4", 
        genre: "Action", 
        posterUrl: "https://image.tmdb.org/t/p/w200/or06FN3Dka5tukK1e9sl16pB3iy.jpg" 
    },
    { 
        id: 3, 
        title: "Oppenheimer", 
        year: "2023", 
        rating: "8.1", 
        genre: "Drama", 
        posterUrl: "https://image.tmdb.org/t/p/w200/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" 
    },
    { 
        id: 4, 
        title: "Leo", 
        year: "2023", 
        rating: "7.5", 
        genre: "Action/Thriller", 
        posterUrl: "https://image.tmdb.org/t/p/w200/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg" 
    }
];

function SearchResultsDropdown({ results = MOCK_DATA, isLoading, isVisible }:any) {
    // if (!isVisible) return null;

    // Use mock data if results are empty for testing purposes, otherwise use passed results
    const displayResults = results.length > 0 ? results : MOCK_DATA;

    return (
        <div className="
            absolute top-full left-0 right-0 mt-2 
            bg-white 
            rounded-xl 
            shadow-2xl shadow-black/20 
            border border-gray-100 
            overflow-hidden 
            z-50
            flex flex-col
            animate-in fade-in zoom-in-95 duration-200
        ">
            {/* Loading State */}
            {isLoading && (
                <div className="p-4 flex items-center justify-center text-gray-400 gap-2">
                    <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Searching...</span>
                </div>
            )}

            {/* Empty State */}
            {!isLoading && displayResults.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    <p className="text-sm">No movies found.</p>
                </div>
            )}

            {/* Results List */}
            {!isLoading && displayResults.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto scrollbar-hide py-2">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Movies & TV
                    </div>
                    
                    {displayResults.map((movie:any) => (
                        <div 
                            key={movie.id}
                            className="
                                group
                                flex items-center gap-4 
                                px-4 py-3 
                                hover:bg-gray-50 
                                cursor-pointer 
                                transition-colors
                                border-l-4 border-transparent hover:border-red-500
                            "
                        >
                            {/* Thumbnail / Poster */}
                            <div className="relative w-12 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200 shadow-sm group-hover:shadow-md transition-shadow">
                                <img 
                                    src={movie.posterUrl} 
                                    alt={movie.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay Icon on Hover */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <PlayCircleIcon className="w-6 h-6 text-white" />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                                <h4 className="text-gray-900 font-semibold text-sm truncate group-hover:text-red-600 transition-colors">
                                    {movie.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <StarIcon className="w-3 h-3 text-yellow-500" />
                                        {movie.rating}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <ClockIcon className="w-3 h-3" />
                                        {movie.year}
                                    </span>
                                    <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium border border-gray-200">
                                        {movie.genre}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* View All Button */}
                    <div className="border-t border-gray-100 p-2 mt-1">
                        <button className="w-full py-2 text-xs font-bold text-center text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            View all {displayResults.length} results
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchResultsDropdown;