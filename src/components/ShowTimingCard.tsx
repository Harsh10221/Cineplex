import React from 'react';

function ShowTimingCard() {
    return (
        <div className='
            bg-white 
            p-4 
            rounded-xl 
            shadow-lg 
            max-w-xs
        '>
            <div className='
                text-xl 
                font-semibold 
                text-gray-900 
                mb-4
            '>
                Eros Cinema, Churchgate
            </div>
            
            <div className='flex flex-row gap-3'>
                <button className='
                    px-4 py-2
                    text-base
                    font-medium
                    text-green-600
                    border-2
                    border-gray-200
                    rounded-lg
                    transition-colors
                    hover:border-green-600
                '>
                    06:00 PM
                </button>

                <button className='
                    px-4 py-2
                    text-base
                    font-medium
                    text-green-600
                    border-2
                    border-gray-200
                    rounded-lg
                    transition-colors
                    hover:border-green-600
                '>
                    11:00 PM
                </button>
            </div>
        </div>
    );
}

export default ShowTimingCard;
