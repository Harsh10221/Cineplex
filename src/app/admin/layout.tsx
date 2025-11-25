"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut, LayoutDashboard, Film, Clock, Building2, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Navigation Items
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Movies", href: "/admin/movies", icon: Film },
    { name: "Showtimes", href: "/admin/showtimes", icon: Clock },
    { name: "Theaters", href: "/admin/theaters", icon: Building2 },
    { name: "Bookings", href: "/admin/bookings", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* 📱 MOBILE OVERLAY (Click outside to close) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 👈 SIDEBAR (Fixed Left) */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111827] text-white transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-[10px] font-bold text-center leading-tight">SHOW<br/>TIME</span>
                </div>
                <span className="text-xl font-bold">ADMIN</span>
            </div>
            {/* Close Button (Mobile Only) */}
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                <X size={24} />
            </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)} // Close menu on mobile when link is clicked
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group
                  ${isActive 
                    ? "bg-red-500 text-white shadow-md shadow-red-500/20" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <Icon size={20} className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-colors">
                <LogOut size={20} />
                Logout
            </button>
        </div>
      </aside>

      {/* 👉 MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* TOP HEADER (Mobile Only) */}
        <header className="bg-[#111827] text-white shadow-md h-16 flex items-center px-4 md:hidden">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md hover:bg-gray-700">
                <Menu size={24} />
            </button>
            <span className="ml-4 font-bold text-lg">Dashboard</span>
        </header>

        {/* PAGE CONTENT (The Children) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
        </main>
      </div>
    </div>
  );
}