import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb';

export async function GET(
    req: Request, 
    {params}: {params: {postId: string}}
){
    try {
        const postId = params.postId;

        if(!postId || typeof  postId !== 'string'){
            return new NextResponse('Not Found', { status: 404 });
        }
      
        const post = await prisma.post.findUnique({
            where: {id: postId},
            include:{
               user: true,
               comments: {
                    include:{
                        user:true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
               }
            }
        })

        return  NextResponse.json(post, {status:200})
        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}