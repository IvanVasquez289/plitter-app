import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export async function PATCH(req: Request, nextReq: NextApiRequest) {
  try {
    const { currentUser } = await serverAuth(nextReq);

    const { name, username, bio, profileImage, coverImage } = await req.json();

    if (!name || !username) {
      throw new Error("Faltan campos");
    }

    const updatedUser = await prisma.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            name,
            username,
            bio,
            profileImage,
            coverImage
        }
    })

    return NextResponse.json(updatedUser,{status:200})
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ msj: error.message }, { status: 400 });
    }
  }
}
