'use server'

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Layut = async ({children}) => {
    const session = await getServerSession();
    
    if(session?.user){
        redirect("/dashboard")
    }

    return (
        <div>{children}</div>
    )

}

export default Layut