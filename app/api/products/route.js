import { prisma } from "@/lib/prismadb";
import { userId } from "@/lib/userId";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const id = await userId();

        const { store : { id : businessId } } = await prisma.user.findUnique({
            where : {
                id : id
            },
            select : {
                store : true,
                id : true
            }
        });

        const product = await prisma.product.findMany({
            where : {
                businessId : businessId
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status : 401 })
    }
}