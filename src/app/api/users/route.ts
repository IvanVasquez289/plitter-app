import { NextResponse } from "next/server"
import prisma from '@/libs/prismadb';

export async function GET(req: Request){
    try {
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt:'asc'
            }
        })
        return NextResponse.json(users,{status:200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}