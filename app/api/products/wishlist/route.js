import { prisma } from "@/lib/prismadb";
import { userId } from "@/lib/userId";
import { NextResponse } from "next/server";

export async function GET(req){

}

export async function POST(req){
    try {
        const id = await userId();
        const { productId } = await req.json();

        if(!productId) return NextResponse.json("ProductId is required!", { status : 402 })

        const check = await prisma.wishlist.findFirst({
            where : {
                userId : id,
                productId : productId
            }
        })

        console.log(check)

        if(check) return NextResponse.json("Product already in wishlist!")

        const wishlist = await prisma.wishlist.create({
            data : {
                userId : id,
                productId : productId
            }
        });

        return NextResponse.json("Product added to wishlist!");
        
    } catch (error) {
        return NextResponse.json(error, { status : 401 });
    }
}

export async function DELETE(req){
    try {
        const id = await userId();
        const productId = await req.json();

        const removeProduct = await prisma.wishlist.delete({
            where : {
                userId : id,
                productId : productId
            }
        });

        return NextResponse.json("Item removed successfully!")
        
    } catch (error) {
        return NextResponse.json(error, { status : 500 })
    }
}