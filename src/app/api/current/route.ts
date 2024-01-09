import serverAuth from "@/libs/serverAuth"
import { NextApiRequest } from "next"
import { NextResponse } from "next/server"
export async function GET(req: NextApiRequest){
    // return NextResponse.json({msj:'Hola mundo desde /api/'})

    try {
        const {currentUser} = await serverAuth(req)
        // console.log(currentUser.email)
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