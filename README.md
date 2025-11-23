Phase 1: The Foundation (Today)
Goal: Define the Relational Schema and Seed the Database.

Why: You cannot book a movie if there are no movies in the database.

Task: Create tables for Movie, Show, and Booking.

📌 Phase 2: The Display (Tomorrow)
Goal: Show the movies and specific showtimes.

Why: Users need to click "Avengers" -> Select "5:00 PM".

Task: Fetch data using Server Components.

📌 Phase 3: The Seat Layout (The UI Challenge)
Goal: Render a grid of seats (A1...H10).

Logic:

Fetch "Booked Seats" for that specific show.

If Booking table has "A1", render it Red (Disabled).

If not, render it Green (Available).

📌 Phase 4: The Transaction (The "Senior" Logic)
Goal: The Booking Action.

Logic:

User clicks "Book A1".

Prisma Transaction: Check if A1 is free -> If yes, Create Booking -> If no, Throw Error.

Concurrency: Handle the race condition where 2 people click exactly at once.


 <div className=' grid grid-cols-[20px_1fr_1fr_1fr] mb-3 h-96 w-full border p-5 border-t-black'>
                {/* <div className='h-96 flex w-full border p-5 border-t-black'> */}

                {/* column1  */}

                <div className='text-black   w-10 ' >


                    {rows.map((row) => <div className='mt-2 m-1 w-5 h-5 p-1 text-xs items-center justify-center flex  font-bold text-gray-500 ' key={row} >{row}</div>)}



                </div>

                {/* column2  */}

                <div className='flex ' >

                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 mt-2 m-1 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>

                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 mt-2
                                 m-0.5 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>

                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 m-1 mt-2 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>

                </div>
                {/* column3  */}

                <div className='flex ' >


                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 m-1 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>

                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 m-1 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>

                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 m-1 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>

                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 m-1 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>

                </div>

                {/* column4  */}

                <div className='flex justify-end ' >

                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 m-1 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>
                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 m-1 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>
                    <div className='text-black' >
                        {seatLayot.A.map((row) =>
                            <div
                                className='w-5 h-5 p-1 m-1 flex items-center justify-center text-[8px] font-medium text-gray-800 border border-[#cbcbcb] rounded-[3px] transition-colors hover:border-blue-500 '

                                key={row} >
                                {row}
                            </div>
                        )}

                    </div>

                </div>




                <div></div>
                <div></div>



            </div>