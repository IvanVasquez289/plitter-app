import useCurrentUser from "@/hooks/useCurrentUser";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb';

export async function POST(
    request: Request, 
    reqNext: NextApiRequest
){
    try {
        const {currentUser} = await serverAuth(reqNext)
        const {body,postId} = await request.json()

        if(!postId || typeof postId !== 'string'){
            throw new Error('Post ID must be a string');
        }

        const comment = await prisma.comment.create({
            data: {
                body,
                postId,
                userId: currentUser.id

            }
        })

        return NextResponse.json(comment,{status:200})

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}