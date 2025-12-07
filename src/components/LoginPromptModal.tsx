import React from 'react';
import Link from 'next/link';
import { XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface LoginPromptModalProps {
  onClose: () => void;
}

export default function LoginPromptModal({ onClose }: LoginPromptModalProps) {
  return (
    // Overlay (z-[100] ensures it is on top of everything)
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      
      {/* Dark Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-[#16213e] border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 animate-in zoom-in-95 duration-200">
        
        {/* Close Button (X) */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center ring-1 ring-white/10 shadow-inner">
             <UserCircleIcon className="w-8 h-8 text-gray-300" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2 tracking-wide">Login Required</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Please log in to continue booking your tickets. It only takes a moment!
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {/* Login Button - Navigates to /login */}
          <Link href="/login" className="block w-full">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 active:scale-[0.98]">
              Login to Continue
            </button>
          </Link>
          
          {/* Cancel Button - Closes Modal */}
          <button 
            onClick={onClose}
            className="w-full bg-white/5 hover:bg-white/10 text-gray-300 font-semibold py-3.5 rounded-xl transition-all border border-white/5 active:scale-[0.98]"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}