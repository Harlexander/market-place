'use client'
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline'
import React from 'react'
import OpenChatList from './OpenChatList'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'
import axios from 'axios'

const ChatOverview = ({children}) => {
  const { data = [], isLoading } = useQuery("openChat", async () => {
    const { data } = await axios.get("/api/messages");

    return data;
  })

  console.log(data);
  return (
    <div className='grid md:grid-cols-12 gap-2 w-full overflow-hidden flex-1 h-full border'>
        <div className='md:col-span-4 bg-white h-full w-full overflow-y-auto'>
          <OpenChatList data={data}/>
        </div>
        <div className='md:col-span-8 h-full w-full bg-white overflow-y-auto'>
          {children}
        </div>
    </div>
  )
}

export default ChatOverview