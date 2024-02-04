import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb';

export async function GET(
    req: Request, 
    {params}: {params: {userId: string}}
){
    try {
        const userId = params.userId;

        if(!userId || typeof userId !== 'string'){
            return new NextResponse('Bad Request', { status: 400 })
        }
        const notifications = await prisma.notification.findMany({
            where: {
                userId
            },
            orderBy:{
                createdAt: 'desc'
            }
        })

        await prisma.user.update({
            where:{
                id: userId
            },
            data:{
                hasNotification: false
            }
        })
        
        return  NextResponse.json(notifications, {status:200})
        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}