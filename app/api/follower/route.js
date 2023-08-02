import { prisma } from "@/lib/prismadb";
import { userId } from "@/lib/userId";
import { NextResponse } from "next/server";

export async function GET(req){

}

export async function POST(req){
    try {
        const user = await userId();
        const { vendorId } = await req.json() 
        const check  = await prisma.follower.findFirst({
            where : {
                followerId : user,
                followingId : vendorId
            }
        })

        if(check) return NextResponse.json("User already fllowing!");

        const follow = await prisma.follower.create({
            data : {
                followerId : user,
                followingId : vendorId
            }
        })

        return NextResponse.json(follow)
    } catch (error) {
        return NextResponse(error, { status : 401 })
    }
}