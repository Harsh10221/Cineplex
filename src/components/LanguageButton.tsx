import Link from 'next/link';
import React from 'react';

// Reusable Button Component for uniformity
const LanguageButton = ({ label, onClick }:any) => (
  <button
    onClick={onClick}
    className="
      w-full
      py-3
      bg-gray-50             /* Very light gray background */
      border border-red-500  
      rounded-xl             /* Rounded corners for buttons */
      text-gray-900          /* Dark text */
      font-medium
      hover:bg-red-50        /* Subtle hover effect */
      transition-colors duration-200
    "
  >
    {label}
  </button>
);

function LanguageModal({ isOpen, onClose, onSelect }:any) {
  // if (!isOpen) return null;

  return (
    // 1. Overlay (Backdrop)
    // <Link href={} >
    
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000070]  p-4">
      
      
      {/* 2. Modal Container */}
      <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Select Language</h2>
          
          {/* Close Button (X) */}
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Buttons List */}
        <div className="flex flex-col space-y-4">
          <Link href={`/movie/${"kanrata"}/shows?lang=Hindi`} >
          <LanguageButton label="Hindi"  />
          </Link>

          <LanguageButton label="Kannada" onClick={() => onSelect('Kannada')} />

          <LanguageButton label="Telugu" onClick={() => onSelect('Telugu')} />
        </div>

      </div>
    </div>
    // </Link>
  );
}

export default LanguageModal;