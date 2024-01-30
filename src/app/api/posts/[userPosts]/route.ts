import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb';

export async function GET(
    req: Request, 
    {params}: {params: {userPosts: string}}
){
    try {
        const userId = params.userPosts;
        console.log(userId)
        if(!userId || typeof userId !== 'string'){
            return new NextResponse('Bad Request', { status: 400 })
        }

        const userPosts = await prisma.post.findMany({
            where: {
                userId
            },
            include: {
                comments: true,
                user: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
      
        return  NextResponse.json({userPosts}, {status:200})
        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}