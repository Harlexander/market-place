import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prismadb";
import { removeSymbols } from "@/lib/removeSymbols";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        const { email, firstName, lastName, username, mobile, password, user_type, business_name } = await req.json();
        const hash = await hashPassword(password);

        const data = {
            email,
            firstName,
            lastName,
            username,
            mobile,
            password : hash,
        }

        if(user_type === "vendor"){
            const user = await prisma.user.create({
                data : {
                    ...data, 
                    role : "SELLER",
                    store : {
                        create :  {
                            name : business_name,
                            slug : removeSymbols(business_name).replace(/ /g, "-").toLowerCase()
                        }
                    }
                }
            })            
        }else{
            const user = await prisma.user.create({
                data : data
            });
        }

        const userName = await prisma.user.findMany({
            include : {
                store : true
            }
        });

        return NextResponse.json(userName, { status : 200 });
    } catch (error) {
        console.log(error)
        if (error.code === 'P2002') {
            let message;
              if (error.meta.target.includes('email')) {
                message = 'Email address is already in use.';
              } else if (error.meta.target.includes('username')) {
                message = 'Username is already taken.';
              } else if (error.meta.target.includes('name')) {
                message = 'Business Name is already taken.';
              }
              // Add more conditions for other fields as needed
            return NextResponse.json(message, { status : 400 })
        }
      
        return NextResponse.json(error, { status : 500 });
    }
}