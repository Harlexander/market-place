'use client'
import React, { useEffect, useState } from 'react'
import OpenChatList from './OpenChatList'
import { useQuery } from 'react-query'
import axios from 'axios'
import socket from '@/lib/socket'

const ChatOverview = ({children, userId}) => {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    socket.emit("get_messages", userId);
    socket.on("active_messages", (msgs) => setData(msgs))
    socket.on("connect", () => console.log("connected"))
    return () => {
      socket.off("get_messages")
      socket.off("active_messages")
      socket.off("connect")
    }
  }, []);

  console.log(data)

  return (
    <div className='grid md:grid-cols-12 gap-2 w-full overflow-hidden flex-1 h-full border'>
        <div className='md:col-span-4 hidden sm:block bg-white h-full w-full overflow-y-auto'>
          <OpenChatList data={data}/>
        </div>
        <div className='md:col-span-8 h-full w-full bg-white overflow-y-auto'>
          {children}
        </div>
    </div>
  )
}

export default ChatOverview