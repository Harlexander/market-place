import { EnvelopeOpenIcon } from '@heroicons/react/24/outline'
import React from 'react'
import OpenChatList from './OpenChatList'

const ChatOverview = () => {
  return (
    <div className='grid md:grid-cols-12 gap-2 min-h-[400px]'>
        <div className='md:col-span-4 bg-white'>
        <OpenChatList/>
        </div>
        <div className='hidden md:block col-span-8 bg-white'>
            <div className='flex h-full font-montserrat flex-col justify-center gap-3 items-center'>
                <EnvelopeOpenIcon className='h-20 w-20'/>
                <p>Open chat to view messages</p>
            </div>
        </div>
    </div>
  )
}

export default ChatOverview