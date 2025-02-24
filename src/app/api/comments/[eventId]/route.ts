import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest, context: any) {
    // 升级到 Next.js 15 后，所有的 params、searchParams、headers()、cookies() 都是异步的，必须 await！
    const params = await context.params; // ✅ 先 `await` `params`
    const eventId = params?.eventId as string;

    if (!eventId) {
        return NextResponse.json({ message: 'Invalid eventId' }, { status: 400 });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: {
                eventId: eventId,
            },
        });

        console.log("comments: ", comments)

        return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(req: NextRequest, context: any) {
    const params = await context.params;
    const eventId = params.eventId as string;

    if (!eventId) {
        return NextResponse.json({ message: 'Invalid eventId' }, { status: 400 });
    }

    const body = await req.json();
    const { email, name, comment } = body;

    if (!email || !email.includes('@') || !name || name.trim() === '' || !comment || comment.trim() === '') {
        return NextResponse.json({ error: 'Invalid input' }, { status: 422 });
    }

    try {
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