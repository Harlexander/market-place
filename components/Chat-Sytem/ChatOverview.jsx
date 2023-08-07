'use client'
import React, { useEffect, useState } from 'react'
import OpenChatList from './OpenChatList'
import socket from '@/lib/socket'
import { usePathname } from 'next/navigation'

const ChatOverview = ({children, userId}) => {
  const [ data, setData ] = useState([]);
  const path = usePathname();
  const link = (path.split("/").length);

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

  return (
    <div className='grid md:grid-cols-12 gap-2 w-full overflow-hidden flex-1 h-full border'>
        <div className={`md:col-span-4 bg-white h-full w-full overflow-y-auto ${link !== 3 && "hidden sm:block"}`}>
          <OpenChatList data={data}/>
        </div>
        <div className={`md:col-span-8 h-full w-full bg-white overflow-y-auto ${link === 3 && "hidden sm:block"}`}>
          {children}
        </div>
    </div>
  )
}

export default ChatOverview