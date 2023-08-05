import ChatOverview from '@/components/Chat-Sytem/ChatOverview'
import { authOptions } from '@/lib/authOptions'
import { EnvelopeIcon } from '@heroicons/react/20/solid'
import { getServerSession } from 'next-auth'
import React from 'react'

const Index = async({children}) => {
  const session = await getServerSession(authOptions)

  return (
    <div>
        <div className='md:p-10 h-screen p-2 sticky top-0 space-y-8 flex flex-col'>
            <p className='bg-pry flex items-center gap-4 justify-center rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
            <EnvelopeIcon className='h-6 w-6'/> Messages 
            </p>  
            <ChatOverview userId={session?.user?.id} children={children}/>  
        </div>
    </div>
  )
}


export default Index