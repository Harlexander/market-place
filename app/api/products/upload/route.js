import { prisma } from "@/lib/prismadb";
import { userId } from "@/lib/userId";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const id = await userId();

        const { store : { id : businessId } } = await prisma.user.findUnique({
            where : {
                id : id
            },
            include : {
                store : {
                    select : {
                        id : true
                    }
                }
            }
        })

        const data = await req.json();

        const storeProduct = await prisma.product.create({
            data : {
                slug : data.slug,
                name : data.productName,
                category : data.category,
                subcategory : data.subcategory,
                description : data.description,
                price : data.price,
                images : data.images,
                features : data.features,
                negotiable : data.negotiable,
                pre_order : data.pre_order,
                brand_new : data.brand_new,
                businessId : businessId
            }
        })

        return NextResponse.json(storeProduct);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status : 401 })
    }
}

export async function PUT(req){
    try {
        const data = await req.json();

        console.log(data);

        const product = await prisma.product.findUnique({
            where : {
                id : data.id
            }
        });

        if(product){
            product.images = data.images;

            const update = await prisma.product.update({
                where : {
                    id : data.id
                },
                data : {
                    slug : data.slug,
                    name : data.productName,
                    category : data.category,
                    subcategory : data.subcategory,
                    description : data.description,
                    price : data.price,
                    images : product.images,
                    features : data.features,
                    negotiable : data.negotiable,
                    pre_order : data.pre_order,
                    brand_new : data.brand_new,
                }
            })
        }

        return NextResponse.json("Product Updated Successfully!");
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status : 401 })
    }
}