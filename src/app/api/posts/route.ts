import serverAuth from "@/libs/serverAuth";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request, reqNext: NextApiRequest ) {
  const { body } = await request.json();

  try {
    const { currentUser } = await serverAuth(reqNext);
    const post = await prisma.post.create({
      data: {
        body,
        userId: currentUser.id,
      }
    });
    return NextResponse.json({ post });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ msj: error.message }, { status: 400 });
    }
  }
}


export async function GET(req: NextApiRequest){
    try {
        const posts = await prisma.post.findMany({
          include: {
            comments: true,
            user: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
        return NextResponse.json(posts,{status:200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json(
                {msj: error.message},
                {status:400}
            )
        }
    }
}