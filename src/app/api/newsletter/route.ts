// src/app/api/newsletter/route.ts
import {NextRequest, NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const {email: usrEmail} = body

    if(!usrEmail || !usrEmail.includes('@')){
        return NextResponse.json({error: 'Invalid email'}, {status: 400})
    }

    console.log('usrEmail', usrEmail)

    // 返回201状态码
    return NextResponse.json({message: 'Signed up!'}, {status: 201})
}