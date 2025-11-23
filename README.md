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