"use client"
import React, { useState, useEffect } from 'react';
import { ArrowLeftCircleIcon, ArrowUturnLeftIcon, ChevronLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getAllMovies, getShow } from '@/src/actions/movies';
import { match } from 'assert';
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { MapPinIcon, Minus } from 'lucide-react';
import { v4 as uuidv4 } from "uuid";


// --- INLINE COMPONENTS FOR PREVIEW ---

// 1. NavBar Component
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
                <div className='flex flex-col min-w-0'>
                    <span className='font-bold text-white leading-none truncate text-sm lg:text-base'>Mumbai</span>
                    <span className='text-xs text-gray-400 leading-none truncate mt-1 lg:text-sm'>India</span>
                </div>
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

// 2. AppFooter Component
function AppFooter() {
    return (
        <footer className="bg-[#0f3460] text-white w-full py-10 sm:px-10 mt-0">
            <div className="max-w-7xl p-5 mx-auto">
                <div className="flex flex-col sm:flex-row justify-between border-b border-white/10 pb-8">
                    <div className="mb-8 sm:mb-0 w-full sm:w-1/2 lg:w-1/4">
                        <h3 className="text-lg text-white font-bold tracking-wide mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Contact Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">FAQs</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Terms of Service</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</li>
                        </ul>
                    </div>

                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <h3 className="text-lg text-white font-bold tracking-wide mb-4">ShowTime</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Press</li>
                        </ul>
                    </div>
                </div>

                <div className="py-8 border-b border-white/10">
                    <h3 className="text-lg text-white font-bold tracking-wide mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <div className="bg-white p-2 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors cursor-pointer text-black font-bold flex items-center justify-center text-xs">FB</div>
                        <div className="bg-white p-2 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors cursor-pointer text-black font-bold flex items-center justify-center text-xs">TW</div>
                        <div className="bg-white p-2 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors cursor-pointer text-black font-bold flex items-center justify-center text-xs">IG</div>
                    </div>
                </div>

                <div className="pt-8 text-center text-sm text-gray-500 font-medium">
                    &copy; {new Date().getFullYear()} ShowTime. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

// --- MAIN PAGE COMPONENT ---

interface DateItem {
    dayName: string;   // e.g., "Wed"
    dayNumber: number; // e.g., 26
    month: string;     // e.g., "Nov"
    fullDate: Date;
    id: number;
}

function DateSelector() {
    // 1. State

    // const theaters = [
    //     {
    //         id: 1, name: "INOX: Nehru Place", times: ["10:30 AM", "01:15 PM", "04:45 PM", "09:00 PM"], amenities: ["M-Ticket", "F&B"], location: "Eros One, Jangpura Extension, New Delhi",
    //     },
    //     {
    //         id: 2, location: "Eros One, Jangpura Extension, New Delhi",
    //         name: "PVR: Select City Walk", times: ["11:00 AM", "02:30 PM", "06:00 PM", "10:30 PM"], amenities: ["Dolby Atmos", "Recliner"]
    //     },
    //     {
    //         id: 3, location: "Eros One, Jangpura Extension, New Delhi",
    //         name: "Cinepolis: DLF Avenue", times: ["09:45 AM", "12:15 PM", "03:45 PM"], amenities: ["IMAX", "4DX"]
    //     },
    // ];
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [dates, setDates] = useState<DateItem[]>([]);
    const [theaters, setTheaters] = useState<any[]>([])
    let formatedTime
    let url
    // console.log("theaters", theaters)

    const { isPending, data: movieData, isError } = useQuery({
        queryKey: ["movieCardData"],
        queryFn: async () => await getAllMovies()

    })

    const movieId = useParams()?.movieid
    // const fullUrl = window.location.href

    const urlConstructor = (showid: string) => {
        // fullUrl
        // const arr = fullUrl.split("?")
        // const url = `${arr[0]}/seats`
        // const querys = `${arr[1]}/`

        const params = new URLSearchParams()
        params.set("lang", "Hindi")
        params.set("showId", showid)

        const queryString = params.toString()

        const pathName = usePathname()
        const fullUrl = `${pathName}/seats?${queryString}`

        console.log(fullUrl)

        return fullUrl
    }


    // console.log(fullUrl)

    // console.log(window.location.href)


    const matchedData = movieData?.Movie?.filter((item) => movieId == item.id)[0]

    // console.log(typeof movieId)

    // 2. Date Logic
    useEffect(() => {
        const generateDates = () => {
            const dayList = [];
            const today = new Date();
            for (let i = 0; i < 7; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                dayList.push({
                    dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
                    dayNumber: date.getDate(),
                    month: date.toLocaleDateString('en-US', { month: 'short' }),
                    fullDate: date,
                    id: i
                });
            }
            setDates(dayList);
        };
        generateDates();
    }, []);

    useEffect(() => {
        async function fetchShows() {
            if (!movieId) return console.log("no movie id");

            // console.log("inside useEffect");
            const shows = await getShow(movieId.toString());
            // console.log("shows", shows);
            setTheaters(shows)
        }

        fetchShows();


    }, [])


    const timeformater = () => {

        const hours = Math.floor((matchedData?.duration ?? 0) / 60)
        const mintues = Math.floor((matchedData?.duration ?? 0) % 60)
        // console.log(`Duration:${hours}:${mintues}`)
        return `${hours}h ${mintues}m`
    }



    // console.log("This is from dataselector function ", movieData)

    // Mock Theaters Data


    return (
        <div className='min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans flex flex-col'>

            {/* 1. FIXED NAVBAR */}
            <div className="fixed top-0 z-50 w-full px-4 pt-4 pb-2 bg-gradient-to-b from-black/90 via-black/60 to-transparent pointer-events-none">
                <div className="max-w-7xl mx-auto pointer-events-auto">
                    <div className="backdrop-blur-xl rounded-2xl p-2 border border-white/10 bg-white/5 shadow-2xl">
                        <NavBar />
                    </div>
                </div>
            </div>

            <main className='flex-1 w-full max-w-5xl mx-auto px-4 pt-32 pb-12'>

                {/* 2. MOVIE HEADER */}
                <div className=" grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 mb-8 border-b border-white/10 pb-8">


                    <div className=" flex flex-col gap-3">

                        <div className='flex items-center gap-3 ' >
                            <Link href={"/"} >
                                <ChevronLeftIcon strokeWidth={4} className='text-gray-400  w-6 h-6' />
                            </Link>

                            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                {matchedData?.title}
                            </h1>
                        </div>

                        {/* Metadata Container - Uses flex-wrap to handle long text gracefully */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm md:text-base text-gray-300 font-medium">

                            {/* Certificate Badge */}
                            <span className="px-2 py-0.5 rounded-md border border-gray-500 text-gray-300 text-xs font-bold tracking-wider uppercase bg-white/5">
                                U/A
                            </span>

                            {/* Separator */}
                            <span className="hidden sm:inline-block text-gray-600">•</span>

                            {/* Languages */}
                            <span className="text-gray-300">
                                {matchedData?.languages}
                            </span>

                            {/* Separator (Hide on mobile if wrapping) */}
                            <span className="hidden sm:inline-block text-gray-600">•</span>

                            {/* Genres (Restricted width on mobile to force wrap if needed, styling distinct) */}
                            <span className="text-gray-400">
                                {matchedData?.genres}
                            </span>

                            {/* Separator */}
                            <span className="hidden sm:inline-block text-gray-600">•</span>

                            {/* Duration */}
                            <span className="text-white font-semibold">
                                {timeformater()}
                            </span>
                        </div>
                    </div>

                    {/* Right Side: Date Display (Desktop Only) */}
                    <div className="hidden md:flex flex-col items-end justify-center min-w-[100px] border-l border-white/10 pl-6">
                        {/* Safety check for undefined dates */}
                        {/* {dates.length > 0 && ( */}
                        <>
                            <div className="text-4xl font-light text-white">
                                {/* {dates[selectedIndex]?.dayNumber} */}
                                {dates[selectedIndex]?.dayNumber}
                            </div>
                            <div className="text-sm font-bold text-red-500 uppercase tracking-widest mt-1">
                                {/* {dates[selectedIndex]?.month} */}
                                {dates[selectedIndex]?.month}
                            </div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider mt-0.5">
                                {/* {dates[selectedIndex]?.dayName} */}
                                {dates[selectedIndex]?.dayName}

                            </div>
                        </>
                        {/* )} */}
                    </div>
                </div>

                {/* 3. DATE SCROLL CONTAINER */}
                <div className="mb-10">
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {dates.map((item, index) => {
                            const isSelected = index === selectedIndex;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setSelectedIndex(index)}
                                    className={`
                                        snap-start
                                        flex flex-col items-center justify-center
                                        min-w-[4.5rem] h-20
                                        rounded-xl
                                        border transition-all duration-300
                                        ${isSelected
                                            ? 'bg-red-600 border-red-500 shadow-lg shadow-red-600/30 scale-105'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-300 hover:text-white'
                                        }
                                    `}
                                >
                                    {/* DAY NAME (Wed) on Top */}
                                    <span className={`text-xs font-medium uppercase mb-1 block ${isSelected ? 'text-red-100' : ''}`}>
                                        {item.dayName.slice(0, 3)}
                                    </span>
                                    {/* DATE NUMBER (26) on Bottom - Added explicit text-gray-300 for unselected */}
                                    <span className={`text-xl font-bold block ${isSelected ? 'text-white' : 'text-gray-200'}`}>
                                        {item.dayNumber}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 4. THEATER LIST */}
                {/* {console.log("This is just test", theaters[0])} */}
                <div className="space-y-4">
                    {theaters?.map((theater) => (
                        // {console.log(theaters)}
                        <div key={uuidv4()} className="group bg-[#1f2937]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6">
                            {/* Theater Info */}
                            <div className="md:w-1/3 shrink-0">
                                <h3 className="font-bold text-white text-lg tracking-wide group-hover:text-red-400 transition-colors mb-1">
                                    {theater.name}
                                </h3>
                                {/* Location - Replacing amenities */}
                                <div className="flex items-start gap-1.5 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <MapPinIcon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                    <span>{theater.location}</span>
                                </div>
                            </div>

                            {/* Show Times */}
                            <div className="flex flex-wrap gap-3 flex-1 justify-start md:justify-start">
                                {theater?.shows?.map((time, Index) => {

                                    {
                                        // console.log("Inside form the map function",time)
                                        const date = new Date(time.startTime)

                                        formatedTime = date.toLocaleTimeString("en-IN", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        });

                                        url = urlConstructor(time.showId)
                                    }

                                    return <Link key={Index} href={url}>
                                        <button
                                            className="
                                                px-5 py-2.5 
                                                rounded-xl 
                                                border border-green-500/30 
                                                text-green-400 
                                                text-sm font-semibold
                                                bg-green-500/5 
                                                hover:bg-green-500 hover:text-black hover:border-green-500
                                                active:scale-95
                                                transition-all duration-200
                                                shadow-sm
                                            "
                                        >
                                            {formatedTime}


                                        </button>
                                    </Link>
                                    // <div>{time.toLocaleDateString()}</div>
                                })}

                            </div>
                        </div>
                    ))}
                </div>

            </main>

            {/* Footer */}
            <div className="border-t border-white/10 bg-[#0f3460] mt-auto">
                <AppFooter />
            </div>

        </div>
    );
}

export default DateSelector;