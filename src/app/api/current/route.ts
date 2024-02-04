import serverAuth from "@/libs/serverAuth"
import { NextRequest, NextResponse } from "next/server"
export async function GET(req: Request){
    // return NextResponse.json({msj:'Hola mundo desde /api/'})

    try {
        const {currentUser} = await serverAuth(req)
        console.log(currentUser.name)
        return NextResponse.json(
            currentUser,
            {status:200}
        )
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}