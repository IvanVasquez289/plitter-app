import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'
import prisma from '@/libs/prismadb';

export async function POST(request: Request){
    const {name,username,password,email} = await request.json()

    try {
        
        const hashedPassword = await bcrypt.hash(password,12)
        const user = await prisma.user.create({
            data:{
                name,
                username,
                email,
                hashedPassword
            }
        })
    
        return NextResponse.json({user})
    } catch (error) {
       if(error instanceof Error){
         return NextResponse.json(
          {msj: error.message},
          {status:400}
         )
       }
    }

}