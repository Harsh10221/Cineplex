// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // 1. CLEANUP: Delete everything to start fresh
    // We use deleteMany because it's safer than raw SQL truncate
    //   await prisma.ticket.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.show.deleteMany()
    await prisma.movie.deleteMany()
    await prisma.screen.deleteMany()
    await prisma.theater.deleteMany()
    await prisma.user.deleteMany()

    console.log('🧹 Database cleaned.')

    // 2. Create a Dummy User (So you can login immediately)
    const user = await prisma.user.create({
        data: {
            userName: "harsh",
            fullName: "Harsh Phanse",
            email: "harsh@gmail.com",
            password: "password123", // In real app, hash this!
        }
    })

    // 3. Create a Theater
    const theater = await prisma.theater.create({
        data: {
            name: "PVR Icon: Infinity Mall",
            location: "Andheri West, Mumbai",
            total_screens: 1,
            Screen: {
                create: [
                    {
                        capacity : 100,
                        // Screen 1: The IMAX Hall
                        rows: 10,    // Rows A-J
                        columns: 12, // Seats 1-12
                    }
                ]
            }
        },
        include: { Screen: true }
    })

    const mainScreen = theater.Screen[0]

    // 4. Create Movies
    const movie1 = await prisma.movie.create({
        data: {
            title: "Interstellar",
            description: "A team of explorers travel through a wormhole in space.",
            language: "English",
            duration: 169,
            posterUrl: "https://image.tmdb.org/t/p/original/gEU2QniL6E8ahDsVKboDBYG84x0.jpg"
        }
    })

    const movie2 = await prisma.movie.create({
        data: {
            title: "The Dark Knight",
            description: "Batman raises the stakes in his war on crime.",
            language: "English",
            duration: 152,
            posterUrl: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
        }
    })

    // 5. Schedule Shows (Create the Inventory)
    // Show 1: Interstellar Tomorrow @ 6:00 PM
    const showTime1 = new Date()
    showTime1.setDate(showTime1.getDate() + 1) // Tomorrow
    showTime1.setHours(18, 0, 0, 0) // 6:00 PM

    await prisma.show.create({
        data: {
            startTime: showTime1,
            movieId: movie1.id,
            screenId: mainScreen.id,
            price: 450 // Rupees
        }
    })

    // Show 2: Dark Knight Tomorrow @ 9:00 PM
    const showTime2 = new Date()
    showTime2.setDate(showTime2.getDate() + 1)
    showTime2.setHours(21, 0, 0, 0)

    await prisma.show.create({
        data: {
            startTime: showTime2,
            movieId: movie2.id,
            screenId: mainScreen.id,
            price: 300
        }
    })

    console.log('✅ Seed successful! Created Theater, Movies, and Shows.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })