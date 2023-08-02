import { prisma } from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server"

export const POST = async (req) => {
    try {
        const data = await req.json();
        const addReview = await prisma.review.create({
            data : data
        });
        return NextResponse.json(addReview);
    } catch (error) {
        return NextResponse.json(error, { status : 401 })
    }
}

export const GET = async (req) => {
    try {
        const { searchParams } = new URL(req.url)
        const id = searchParams.get('id');

        const path = req.nextUrl.searchParams.get('path')

        console.log(path)

        // const reviews = await prisma.review.findMany({
        //     where : {
        //         vendorId : id
        //     },
        //     include : {
        //         user : {
        //             select : {
        //                 username : true,
        //                 image : true
        //             }
        //         }
        //     }
        // });

        return NextResponse.json(path);
        
    } catch (error) {
        return NextResponse.json(error, { status : 401 })
    }
}