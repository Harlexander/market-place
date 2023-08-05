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