import serverAuth from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function POST (request: Request, reqNext: NextApiRequest){
    try {
        const {userId} = await request.json()
        const {currentUser} = await serverAuth(reqNext)

        if(!userId || typeof userId !== 'string'){
            return NextResponse.json({msj:  'Invalid data'},  {status:401})
        }

        //? Aqui debe ser userId o currentUser.id
        const user = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            }
        })

        if(!user){
            return NextResponse.json({msg:'User not found' }, { status: 404 })
        }

        const updatedFollowingIds = [...(user.followingIds || [] )];

        updatedFollowingIds.push(userId)

        const updatedUser = await prisma.user.update({
            where:{
                id : currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })
        return NextResponse.json(updatedUser,{status:200})

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}

export async function DELETE (request: Request, reqNext: NextApiRequest){
    try {
        const {userId} = await request.json()
        const {currentUser} = await serverAuth(reqNext)

        if(!userId || typeof userId !== 'string'){
            return NextResponse.json({msj:  'Invalid data'},  {status:401})
        }

        //? Aqui debe ser userId o currentUser.id
        const user = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            }
        })

        if(!user){
            return NextResponse.json({msg:'User not found' }, { status: 404 })
        }

        let updatedFollowingIds = [...(user.followingIds || [] )];

        updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !==  userId);

        const updatedUser = await prisma.user.update({
            where:{
                id : currentUser.id
            },
            data: {
                followingIds: updatedFollowingIds
            }
        })
        return NextResponse.json(updatedUser,{status:200})

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}