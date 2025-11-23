'use client'
import React, { useState } from 'react';
import Mumbai_image from "@/public/Mumbai.png"
import DelhiNcr_image from "@/public/Delhi.png"
import Kolkata_image from "@/public/Kolkata.png"
import Ahmedabad_image from "@/public/Ahmedabad.png"
import Chennai_image from "@/public/Chennai.png"

const handleSelectCity = (id:number) =>{
        console.log("i clicked ",id)
    }

const CityCard = ({ city, id, icon, isSelected,onSelect }: any) => {


    const cardClasses = isSelected
        ? 'border-2 border-purple-500 shadow-xl'
        : 'hover:shadow-md';

    return (
        <div
            onClick={() => onSelect(id)}
            // onClick={(city) => console.log("this is the clicked city", id)}

            className={`
                flex flex-col items-center justify-center 
                w-full h-full   
                bg-white 
                rounded-xl 
                cursor-pointer 
                transition-all duration-100
                ${cardClasses}
            `}
        >
            <img src={icon} className='text-4xl w-full h-full text-gray-500' alt="" />
        </div>
    );
};

function SelectCityModal() {

    const [isSelected, setIsSelected] = useState(1)

    


    const cities = [
        { icon: Mumbai_image.src, id: 1 },
        { icon: DelhiNcr_image.src, id: 2 },
        { icon: Kolkata_image.src, id: 3 },
        { icon: Ahmedabad_image.src, id: 4 },
        { icon: Chennai_image.src, id: 5 },
    ];

    const selectedCityId = 2;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4'>
            <div className='
                bg-white
                rounded-2xl 
                p-6 sm:p-8 
                max-w-md 
                w-full 
                shadow-2xl
                h-1/2
            '>
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-bold text-gray-900'>Select a City</h2>
                    <button className='text-gray-400 hover:text-gray-600 transition-colors'>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className='grid grid-cols-3 gap-3'>
                    {cities.map((city) => (
                        <CityCard
                            // onClick={() => console.log("this is the clicked city", city.id)}
                            onSelect={setIsSelected}
                            key={city.id}
                            id={city.id}
                            icon={city.icon}
                            isSelected={city.id === isSelected}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SelectCityModal;
