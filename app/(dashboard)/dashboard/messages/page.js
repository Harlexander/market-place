// import socket from '@/lib/socket';
import { userId } from '@/lib/userId';
import { EnvelopeIcon } from '@heroicons/react/20/solid';
import React from 'react'


const Index = async () => {
  return (
        <div className='flex h-full font-montserrat flex-col justify-center gap-3 items-center'>
                <EnvelopeIcon className='h-20 w-20'/>
                <p>Open chat to view messages</p>
        </div>
  )
}

export default Index;