// lib/initData.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const eventData = [
    {
        id: 'e1',
        title: 'Programming for everyone',
        description:
            'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
        location: 'Somestreet 25, 12345 San Somewhereo',
        date: '2021-05-12',
        image: 'images/coding-event.jpg',
        isFeatured: false,
    },
    {
        id: 'e2',
        title: 'Networking for introverts',
        description:
            "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
        location: 'New Wall Street 5, 98765 New Work',
        date: '2021-05-30',
        image: 'images/introvert-event.jpg',
        isFeatured: true,
    },
    {
        id: 'e3',
        title: 'Networking for extroverts',
        description:
            'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
        location: 'My Street 12, 10115 Broke City',
        date: '2022-04-10',
        image: 'images/extrovert-event.jpg',
        isFeatured: true,
    },
];

async function main() {
    console.log('Starting to insert events...');

    try {
        // Loop through the event data and insert each event
        for (const event of eventData) {
            await prisma.event.create({
                data: {
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    date: new Date(event.date), // Convert string to Date object
                    image: event.image,
                    isFeatured: event.isFeatured,
                },
            });
            console.log(`Inserted event: ${event.title}`);
        }
        console.log('All events inserted successfully!');
    } catch (error) {
        console.error('Error inserting events:', error);
    } finally {
        await prisma.$disconnect(); // Close the database connection
    }
}

// Run the script
main();