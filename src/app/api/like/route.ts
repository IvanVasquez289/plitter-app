import serverAuth from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";


export async function POST (request: Request, reqNext: NextApiRequest){
    try {
        const {postId} = await request.json()
        const {currentUser} = await serverAuth(request)

        if(!postId || typeof postId !== 'string'){
            return NextResponse.json({msj:  'Invalid data'},  {status:401})
        }

        //? Aqui debe ser userId o currentUser.id
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(!post){
            return NextResponse.json({msg:'User not found' }, { status: 404 })
        }

        const updatedLikeIds = [...(post.likeIds || [] )];

        updatedLikeIds.push(currentUser.id)

        await prisma.notification.create({
            data:{
                body: 'Alguien le dio me gusta a tu tweet',
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
        
        const updatedPost = await prisma.post.update({
            where:{
                id : postId
            },
            data: {
                likeIds: updatedLikeIds
            }
        })
        return NextResponse.json(updatedPost,{status:200})

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
        const {postId} = await request.json()
        const {currentUser} = await serverAuth(request)

        if(!postId || typeof postId !== 'string'){
            return NextResponse.json({msj:  'Invalid data'},  {status:401})
        }

        //? Aqui debe ser userId o currentUser.id
        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        })

        if(!post){
            return NextResponse.json({msg:'User not found' }, { status: 404 })
        }

        let updatedLikeIds = [...(post.likeIds || [] )];

        updatedLikeIds = updatedLikeIds.filter(likeId => likeId !==  currentUser.id);

        const updatedPost = await prisma.post.update({
            where:{
                id : postId
            },
            data: {
                likeIds: updatedLikeIds
            }
        })
        return NextResponse.json(updatedPost,{status:200})

    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}