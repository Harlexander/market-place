import { prisma } from "@/lib/prismadb";
import { userId } from "@/lib/userId";
import { headers } from "next/dist/client/components/headers"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    try {
        const id = await userId();

        const user = await prisma.user.findUnique({
            where : {
                id : id
            },
            include : {
                store : true
            }
        })

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(error, {
            status : 401
        });
    }
}