import React from 'react';
// Assuming you have imported FontAwesome or similar icons for Facebook, Twitter, and Instagram
// import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; 

function AppFooter() {
    return (
        // Outer Container: Dark background, padding, and width
        <footer className="bg-[#e7e7e7] shadow text-white w-full py-10  sm:px-10 mt-10">
            
            {/* Main Content Area */}
            <div className="max-w-6xl p-5  mx-auto">
                
                {/* 1. Link Columns Section */}
                <div className="flex  sm:flex-row justify-between border-b border-gray-400 pb-8">
                    
                    {/* A. Support Column */}
                    <div className="mb-6 sm:mb-0 w-full sm:w-1/2 lg:w-1/4">
                        <h3 className="text-lg text-black font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-sm text-[#4b5563]">
                            <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                        </ul>
                    </div>
                    
                    {/* B. ShowTime Column */}
                    <div className="w-full sm:w-1/2 lg:w-1/4">
                        <h3 className="text-lg text-black font-semibold mb-4">ShowTime</h3>
                        <ul className="space-y-2 text-sm text-[#4b5563]">
                            <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Press</li>
                        </ul>
                    </div>
                </div>

                {/* 2. Follow Us / Social Media Section */}
                <div className="py-6  border-b border-gray-400">
                    <h3 className="text-lg text-black font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="text-gray-400  w-7 h-7  rounded-full hover:text-white transition-colors">
                            {/* <FaFacebookF className="w-5 h-5" /> */}
                            <img className='w-full h-full ' src="/FacebookLogo.png" alt=""  />
                        </a>
                        <a href="#" aria-label="Twitter" className="text-gray-400 w-6.5 h-6.5 hover:text-white transition-colors">
                            {/* <FaTwitter className="w-5 h-5" /> */}
                            <img className='w-full h-full'  src="/TwitterLogo.png" alt=""  />
                        </a>
                        <a href="#" aria-label="Instagram" className="text-gray-400 w-7 h-7 hover:text-white transition-colors">
                            {/* <FaInstagram className="w-5 h-5" /> */}
                            <img className='w-full h-full'  src="/InstagramLogo.png" alt=""  />
                        </a>
                    </div>
                </div>

                {/* 3. Copyright Section */}
                <div className="pt-6 text-center text-sm text-gray-400">
                    © 2024 ShowTime. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
}

export default AppFooter;