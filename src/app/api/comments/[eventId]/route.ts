// GET api
import {NextRequest, NextResponse} from "next/server";
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { eventId: string } }) {
    // 获取/api/comments/e2的e2
    const eventId = params.eventId;

    if (!eventId) {
        return NextResponse.json({message: 'Invalid eventId, '}, {status: 400});
    }

    try {
        const comments = await prisma.comment.findMany({
            where: {
                eventId: eventId,
            },
        });

        return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500});
    }
    // Fetch comments for the given eventId
}

// POST api
export async function POST(req: NextRequest, { params }: { params: { eventId: string } }) {
    const eventId = params.eventId;

    if (!eventId) {
        return NextResponse.json({message: 'Invalid eventId, '}, {status: 400});
    }

    const body = await req.json();
    const {email, name, comment} = body
    if (!email || !email.includes('@') || !name || name.trim() === '' || !comment || comment.trim() === '') {
        return NextResponse.json({error: 'Invalid input'}, {status: 422})
    }

    try {
        // Create a new comment in the database
        const newComment = await prisma.comment.create({
            data: {
                email,
                name,
                comment,
                eventId,
            },
        });

        return NextResponse.json({ message: 'Success', comment: newComment }, { status: 201 });
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
