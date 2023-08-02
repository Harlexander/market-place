"use server"

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Dashboard({ children }) {
    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/signin")
    }

    return (
        <>
         {children}
        </>
    )
}
