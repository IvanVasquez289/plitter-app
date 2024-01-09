import { NextApiRequest } from "next"
import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb';

export async function GET(req: NextApiRequest){
    try {
        const {userId} = req.query

        if(!userId || typeof userId !== 'string'){
            return new NextResponse('Bad Request', { status: 400 })
        }
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user){
            return new NextResponse('Not Found', {status: 404})
        }

        const followersCount = await prisma.user.count({
            where:{
                followingIds:{
                    has: userId
                }
            }
        })

        return  NextResponse.json({...user,followersCount}, {status:200})
        
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}