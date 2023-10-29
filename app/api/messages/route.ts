import prisma from "@/libs/prismadb"
import { pusherServer } from "@/libs/pusher"
import { cookies } from "next/headers"

export async function POST(request:Request) {

    const body = await request.json()

    const {messages,chatId}=body


    const newMessage = await prisma.message.create({
        data:{
            text:messages,
            chat:{
                connect:{
                    id: chatId
                }
            },
            user:{
                connect:{
                    id: cookies().get("user")?.value
                }
            }
        }
        
    })
    
}