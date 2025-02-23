// src/app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all events or a single event by ID
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    try {
        if (id) {
            // Fetch a single event by ID
            const event = await prisma.event.findUnique({
                where: { id },
            });
            if (!event) {
                return NextResponse.json({ error: "Event not found" }, { status: 404 });
            }
            return NextResponse.json(event);
        }

        // Prepare filters
        const filters: any = {};

        if (year && month) {
            // Filter events that match the given year and month
            filters.date = {
                gte: new Date(`${year}-${month}-01`), // Start of the month
                lt: new Date(`${year}-${Number(month) + 1}-01`), // Start of the next month
            };
        } else if (year) {
            filters.date = {
                gte: new Date(`${year}-01-01`), // Start of the year
                lt: new Date(`${Number(year) + 1}-01-01`), // Start of the next year
            };
        }

        // Fetch filtered events
        const events = await prisma.event.findMany({
            where: filters,
            orderBy: { date: "asc" }, // Sort by date
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


// POST: Create a new event
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, title, description, location, date, image, isFeatured } = body;

        // Basic validation
        if (!id || !title || !location || !date || !image) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newEvent = await prisma.event.create({
            data: {
                id,
                title,
                description,
                location,
                date: new Date(date), // Convert string to Date
                image,
                isFeatured: isFeatured ?? false, // Default to false if not provided
            },
        });

        return NextResponse.json(newEvent, { status: 201 });
    } catch (error) {
        console.error('Error creating event:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT: Update an existing event by ID
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, title, description, location, date, image, isFeatured } = body;

        if (!id) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: {
                title,
                description,
                location,
                date: date ? new Date(date) : undefined, // Only update if provided
                image,
                isFeatured,
            },
        });

        return NextResponse.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        return NextResponse.json({ error: 'Event not found or internal error' }, { status: 404 });
    }
}

// DELETE: Delete an event by ID
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    try {
        await prisma.event.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json({ error: 'Event not found or internal error' }, { status: 404 });
    }
}