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

        try {
            const post = await prisma.post.findUnique({
                where:{
                    id: postId
                }
            })

            if(post?.userId){
                await prisma.notification.create({
                    data:{
                        body: 'Alguien comentó tu tweet',
                        userId: post.userId
                    }
                })
        
                await prisma.user.update({
                    where:{
                        id : post.userId
                    },
                    data: {
                        hasNotification: true
                    }
                })
            }
        } catch (error) {
            console.log(error)
        }
        


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