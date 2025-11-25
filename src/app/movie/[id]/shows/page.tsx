'use client'
import AppFooter from '@/src/components/AppFooter';
import NavBar from '@/src/components/NavBar';
import React, { useState, useEffect } from 'react';

interface DateItem {
    dayName: string;
    dateString: string;
    id: number;
}

function DateSelector() {
    // 1. State to track which card is selected (Index 0 = Today)
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dates, setDates] = useState<DateItem[]>([]);



    // 2. Logic to generate the next 7 days
    useEffect(() => {
        const generateDates = () => {
            const dayList = [];
            const today = new Date();

            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);

                dayList.push({
                    // format: "Tue"
                    dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                    // format: "25 Nov"
                    dateString: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
                    id: i
                });
            }
            setDates(dayList);
        };

        generateDates();
    }, []);

    return (
        <div className="w-full bg-white">
            <NavBar />
            <div className='w-full p-5' >


                {/* Header (Optional, matches image) */}
                <div className="flex items-center mb-4">
                    {/* <ChevronLeftIcon className="w-6 h-6 mr-2" /> */}
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">Sunny Sanskari Ki Tulsi Kumari</h1>
                        <p className="text-xs text-gray-500">U/A • Hindi • 2h 15m</p>
                    </div>
                </div>

                {/* 📅 DATE SCROLL CONTAINER */}
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {dates.map((item, index) => {

                        // Check if this card is selected
                        const isSelected = index === selectedIndex;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setSelectedIndex(index)}
                                className={`
                                flex flex-col items-center justify-center
                                min-w-20 h-14 
                                rounded-lg               /* Rounded corners */
                                border                 
                                transition-all duration-200
                                
                                /* --- CONDITIONAL STYLING --- */
                                ${isSelected
                                        ? 'bg-red-500 border-red-500 shadow-md'
                                        : 'bg-white border-gray-300 hover:border-red-300'
                                    }
                            `}
                            >
                                {/* Day Name (Tue, Wed) */}
                                <span className={`
                                text-sm font-semibold mb-1
                                ${isSelected ? 'text-white' : 'text-gray-800'}
                            `}>
                                    {item.dayName}
                                </span>

                                {/* Date (25 Nov) */}
                                <span className={`
                                text-xs font-medium
                                ${isSelected ? 'text-white' : 'text-gray-500'}
                            `}>
                                    {item.dateString}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Example Cinema List below to show context */}
                <div className="mt-6 space-y-4">
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <h3 className="font-bold text-gray-900 text-sm mb-3">INOX, Nehru Place</h3>
                        <div className="inline-block px-4 py-2 border border-green-500 text-green-600 font-medium text-xs rounded-lg">
                            10:30 AM
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />

        </div>
    );
}

export default DateSelector;