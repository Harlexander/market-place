import { prisma } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req, { params : { productId } }){
    try {
        const product = await prisma.product.findUnique({
            where : {
                id : productId
            },
            include : {
                business : {
                    select : {
                        name : true,
                        description : true,
                        logo : true,
                        vendor : {
                            select : {
                                mobile : true,
                                id : true
                            }
                        }
                    }
                }
            }
        });

        return NextResponse.json(product);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status : 401 })
    }
}