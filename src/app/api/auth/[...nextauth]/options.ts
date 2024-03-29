import bcrypt from 'bcrypt'
import NextAuth, { type NextAuthOptions } from "next-auth";
import  CredentialsProvider  from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/libs/prismadb';

 const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type:'text'},
                password: {label: 'password', type:'text'},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('Invalid credentials uno')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    }
                })

                if(!user || !user.hashedPassword){
                    throw new Error('Invalid credentials dos')
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password,user.hashedPassword)

                if(!isCorrectPassword){
                    throw new Error("Incorrect password tres")
                }

                return user;
            }
        })
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: 'jwt'
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET
    },
    secret: process.env.NEXTAUTH_SECRET
}
export default authOptions;
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };




