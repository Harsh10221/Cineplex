import React from 'react';
// Ideally, use react-icons (e.g., Lucide or FontAwesome) instead of PNGs for faster loading and sharp scaling.

function AppFooter() {
    return (
        // Changed bg to match the main theme. Added border-t for separation from content.
        <footer className="bg-[#0f3460] text-white w-full py-10 sm:px-10 mt-0">
            
            {/* Main Content Area */}
            <div className="max-w-6xl p-5 mx-auto">
                
                {/* 1. Link Columns Section */}
                <div className="flex flex-col sm:flex-row justify-between border-b border-white/10 pb-8">
                    
                    {/* A. Support Column */}
                    <div className="mb-8 sm:mb-0 w-full sm:w-1/2 lg:w-1/4">
                        <h3 className="text-lg text-white font-bold tracking-wide mb-4">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Contact Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">FAQs</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Terms of Service</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</li>
                        </ul>
                    </div>
                    
                    {/* B. ShowTime Column */}
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <h3 className="text-lg text-white font-bold tracking-wide mb-4">ShowTime</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors duration-200">Press</li>
                        </ul>
                    </div>
                </div>

                {/* 2. Follow Us / Social Media Section */}
                <div className="py-8 border-b border-white/10">
                    <h3 className="text-lg text-white font-bold tracking-wide mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        
                        {/* <a href="#" aria-label="Facebook" className=" p-1.5 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors flex items-center justify-center"> */}
                            <img className='w-10 h-10 ' src="/FacebookLogo.png" alt="Facebook" />
                        {/* </a> */}

                        {/* <a href="#" aria-label="Twitter" className="bg-white p-1.5 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors flex items-center justify-center"> */}
                            <img className='w-9 h-9 object-contain' src="/TwitterLogo.png" alt="Twitter" />
                        {/* </a> */}

                        {/* <a href="#" aria-label="Instagram" className="bg-white p-1.5 rounded-full w-9 h-9 hover:bg-gray-200 transition-colors flex items-center justify-center"> */}
                            <img className='w-9 h-9 object-contain' src="/InstagramLogo.png" alt="Instagram" />
                        {/* </a> */}

                    </div>
                </div>

                {/* 3. Copyright Section */}
                <div className="pt-8 text-center text-sm text-gray-500 font-medium">
                    &copy; {new Date().getFullYear()} ShowTime. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;