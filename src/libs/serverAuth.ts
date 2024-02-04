import { getSession } from "next-auth/react"
import prisma from '@/libs/prismadb';
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/options";

const serverAuth = async (req:Request) => {
    const session = await getServerSession(authOptions);
    // console.log(session)
    if(!session?.user?.email){
        throw new Error("No registrado")
    }

    const currentUser = await prisma.user.findUnique({
        where:{
            email: session.user.email
        }
    })

    if(!currentUser){
        throw new Error('Usuario no encontrado')
    }

    return {currentUser}
}
export default serverAuth;