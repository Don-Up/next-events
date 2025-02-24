// GET api
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, { params }: { params: { eventId: string } }) {
    // 获取/api/comments/e2的e2
    const eventId = params.eventId;

    if (!eventId) {
        return NextResponse.json({message: 'Invalid eventId, '}, {status: 400});
    }

    const dummyList = [
        { id: "c1", name: "Max", text: "A first comment"},
        { id: "c2", name: "Maximilian", text: "A second comment"},
        { id: "c3", name: "Maximilian", text: "A third comment"},
    ]

    return NextResponse.json({comments: dummyList}, {status: 200})
}

// POST api
export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email, name, text} = body
    if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
        return NextResponse.json({error: 'Invalid input'}, {status: 422})
    }

    const newComment = {
        id: new Date().toISOString(),
        email,
        name,
        text
    }

    console.log(newComment)

    return NextResponse.json({message: 'Success', comment: newComment}, {status: 201})
}
