"use client";

import React from 'react';
import { 
  IndianRupee, 
  Ticket, 
  TrendingUp, 
  CalendarCheck 
} from 'lucide-react';

// Mock data
const dashboardData = {
  todaysRevenue: 0,
  todaysBookings: 0,
  totalRevenue: 1789,
  totalBookings: 2,
  recentBookings: [
    { id: 'SHOWTIME-2', user: 'shubham', movie: 'Superstar Santa Ki Kahani', date: '2025-11-24' },
    { id: 'SHOWTIME-1', user: 'shubham', movie: 'KGF Chapter 1', date: '2025-11-23' },
  ],
};

// --- Components ---

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  isCurrency = false 
}: { 
  title: string; 
  value: number; 
  icon: React.ElementType; 
  isCurrency?: boolean 
}) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
      <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
        <Icon size={20} />
      </div>
    </div>
    <div className="flex items-baseline">
      <span className="text-3xl font-bold text-gray-900">
        {isCurrency ? '₹' : ''}{value.toLocaleString()}
      </span>
    </div>
  </div>
);

const RecentBookingsTable = ({ bookings }: { bookings: any[] }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
      <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
      <button className="text-sm text-red-600 font-semibold hover:text-red-700 transition">
        View All
      </button>
    </div>
    
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100">
        <thead className="bg-gray-50/50">
          <tr>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Booking ID
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Movie
            </th>
            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50/80 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                  {booking.id}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {booking.user.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{booking.user}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                {booking.movie}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {booking.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- Main Page ---

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back, here is what's happening today.</p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Today's Revenue" 
          value={dashboardData.todaysRevenue} 
          icon={IndianRupee} 
          isCurrency 
        />
        <MetricCard 
          title="Today's Bookings" 
          value={dashboardData.todaysBookings} 
          icon={Ticket} 
        />
        <MetricCard 
          title="Total Revenue" 
          value={dashboardData.totalRevenue} 
          icon={TrendingUp} 
          isCurrency 
        />
        <MetricCard 
          title="Total Bookings" 
          value={dashboardData.totalBookings} 
          icon={CalendarCheck} 
        />
      </div>

      {/* Recent Bookings Table */}
      <RecentBookingsTable bookings={dashboardData.recentBookings} />
    </div>
  );
}