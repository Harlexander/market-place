import { prisma } from "@/lib/prismadb"
import { userId } from "@/lib/userId";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        // const id = "64ccbb3a4b56354f9a7f5044";
        const id = await userId();
        const openChats = await getOpenConversations(id);  
        return NextResponse.json(openChats);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status : 401 });
    }
}

export async function getOpenConversations(userId) {
    const userMessages = await prisma.messages.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId },
        ],
      },
      select: {
        senderId: true,
        receiverId: true,
        message : true,
        createdAt : true,
        isRead : true
      },
      orderBy : {
        createdAt : "desc"
      }
    });
  
    const usersSet = new Set();
  
    userMessages.forEach((message) => {
      if (message.senderId !== userId) {
        usersSet.add(message.senderId);
      }
      if (message.receiverId !== userId) {
        usersSet.add(message.receiverId);
      }
    });

    // Convert the set of users to an array
    const openConversations = Array.from(usersSet);

    console.log(openConversations);

    const userInfo = await Promise.all(
      openConversations.map(async (openUserId) => {
        const user = await prisma.user.findUnique({
            where: {
              id: openUserId,
            },
            select: {
              id: true,
              username: true,
              image: true,
              store : {
                select : {
                    name : true,
                    logo : true
                }
              }
            },
          }); 

          console.log(user)
          
          const lastMessage = userMessages.find(
            (message) => message.senderId === userId || message.receiverId === userId
          );

          return {
            lastMessage, ...user
          }
      })
    )

    console.log(userInfo);  
    return userInfo;
  }