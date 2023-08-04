import ChatOverview from '@/components/Chat-Sytem/ChatOverview'
import OpenChatList from '@/components/Chat-Sytem/OpenChatList'
import { EnvelopeIcon } from '@heroicons/react/20/solid'
import React from 'react'

const Index = ({children}) => {
  return (
    <div>
        <div className='md:p-10 h-screen p-2 space-y-8 flex flex-col'>
            <p className='bg-pry flex items-center gap-4 justify-center rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
            <EnvelopeIcon className='h-6 w-6'/> Messages 
            </p>  
            <ChatOverview children={children}/>  
        </div>
    </div>
  )
}


export default Index