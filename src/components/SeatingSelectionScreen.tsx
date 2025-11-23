import { ArrowLeftCircleIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import React from 'react'

function SeatingSelectionScreen() {
    return (
        <div>
            <div className='flex items-center gap-2 ' >

                <div>
                    <ArrowLeftIcon className='text-gray-600 w-6 h-6' />
                </div>
                <div>
                    <div className='text-xl font-bold text-gray-900 mb-0.5'>
                        Kantara A Legend: Chapter 1</div>
                    <div className='flex flex-col' >
                        <span className='text-sm text-gray-700 mb-0.5' >Eros Cinema, Churchgate, Mumbai</span>
                        <span className='text-xs text-gray-500' >U/A • Hindi • 2h 45m</span>
                    </div>
                </div>

            </div>
            <div></div>
            <div></div>
        </div>
    )
}

export default SeatingSelectionScreen
