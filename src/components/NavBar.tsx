"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPinIcon, UserCircleIcon, TicketIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    // 1. Check for User Session on Mount
    useEffect(() => {
        // Safe check for localStorage (only runs on client)
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("userData");
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (e) {
                    console.error("Failed to parse user data");
                }
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userData");
        setUser(null);
        setIsMenuOpen(false);
        router.push("/login");
        // Optional: Force a refresh if needed to update other components
        // router.refresh();
    };

    const handleProfileClick = () => {
        if (user) {
            // Toggle Menu if logged in
            setIsMenuOpen(!isMenuOpen);
        } else {
            // Redirect to Login if guest
            router.push("/login");
        }
    };

    return (
        <div className='relative w-full max-w-7xl mx-auto flex items-center justify-between py-2 sm:py-3 px-2 sm:px-6 lg:px-8'> 
            
            {/* Logo */}
            <Link href="/">
                <div className='bg-linear-to-br from-red-600 to-red-700 shadow-lg shadow-red-900/50 rounded-full h-10 w-10 lg:h-12 lg:w-12 flex items-center justify-center shrink-0 border border-white/10 transition-transform hover:scale-105'>
                    <span className='text-white text-[10px] lg:text-xs font-extrabold leading-tight text-center tracking-tighter'>
                        SHOW<br/>TIME
                    </span>
                </div>
            </Link>

            {/* Location Info */}
            <div className='flex items-center mx-4 grow min-w-0'> 
                <div className='mr-2 shrink-0 p-1.5 bg-white/10 rounded-full backdrop-blur-md border border-white/5'>
                    <MapPinIcon className='text-red-400 h-4 w-4 lg:h-5 lg:w-5' />
                </div>
                <div className='flex flex-col min-w-0'>
                    <span className='font-bold text-white leading-none truncate text-sm lg:text-base'>Mumbai</span>
                    <span className='text-xs text-gray-400 leading-none truncate mt-1 lg:text-sm'>India</span>
                </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-6 mr-6">
                <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Movies</Link>
                <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Events</Link>
                <Link href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Sports</Link>
            </div>

            {/* User Profile Section */}
            <div className='shrink-0 relative'>
                
                {/* 2. Profile Trigger Button */}
                <div 
                    onClick={handleProfileClick}
                    className={`
                        flex items-center gap-2 p-1 pr-3 rounded-full transition-all cursor-pointer group select-none
                        ${isMenuOpen ? 'bg-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'}
                    `}
                >
                    {/* User Icon: Turns Red if logged in */}
                    <UserCircleIcon 
                        className={`
                            w-8 h-8 lg:w-10 lg:h-10 transition-colors 
                            ${user ? 'text-red-500' : 'text-white/90 group-hover:text-red-400'}
                        `} 
                    />
                    
                    {/* Show Name if Logged In, otherwise "Sign In" */}
                    <span className="hidden md:block text-sm font-medium text-white transition-colors">
                        {user ? (user.fullName?.split(' ')[0] || "Profile") : "Sign In"}
                    </span>
                </div>

                {/* 3. The Dropdown Menu (Rendered only if user is logged in AND menu is open) */}
                {user && isMenuOpen && (
                    <>
                        {/* Invisible Backdrop to handle "Click Outside" */}
                        <div 
                            className="fixed inset-0 z-40 cursor-default" 
                            onClick={() => setIsMenuOpen(false)} 
                        />

                        {/* Dropdown Content */}
                        <div className="absolute right-0 mt-3 w-48 bg-[#1f2937] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                            
                            {/* Simple User Header */}
                            <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Signed in as</p>
                                <p className="text-xs font-bold text-white truncate mt-0.5">{user.email}</p>
                            </div>

                            <div className="p-1 space-y-0.5">
                                {/* My Bookings Link */}
                                <Link 
                                    href="/my-bookings" 
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <TicketIcon className="w-4 h-4" />
                                    My Bookings
                                </Link>

                                {/* Logout Button */}
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

        </div>
    );
}