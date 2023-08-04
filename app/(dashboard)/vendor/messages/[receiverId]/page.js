"use client"
import Chat from '@/components/Chat-Sytem/Chat';
import ChatInput from '@/components/Chat-Sytem/ChatInput';
import { handleSendMessage } from '@/lib/chat';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

const Index = ({ params : { receiverId }}) => {
    const { data , status } = useSession();
    const [ messages, setMessages ] = useState([]);
    const [message, setMessage] = useState("");
    const searchParams = useSearchParams()
    const product = searchParams.get('product');

    useEffect(() => {
      if(status === 'authenticated'){
        const senderId = data.user.id;

          socket.emit('join', { receiverId, senderId})

          socket.on("message", (msg) => {
            if (Array.isArray(msg)) {
              // If msg is an array of messages, directly update the state
              setMessages((prevMessages) => [...prevMessages, ...msg]);
            } else {
              // If msg is a single message, add it to the state
              setMessages((prevMessages) => [...prevMessages, msg]);
            }
          })

          socket.on('connect', ()=> console.log("connect"));
          socket.on('disconnect', ()=> console.log("disconnect"));
          
          return () => {
            socket.off('message');
            socket.off('connect');
            socket.off('disconnect');
          };
      }
    }, [status])

    const { mutate, isLoading, data : result} = useMutation(async content => await handleSendMessage(content), { onSuccess : () => setMessage("")})

    const handleMessage = (e) => setMessage(e.target.value);

  return (
    <div className='p-4 h-full flex justify-between flex-col gap-2'>
        <Chat messages={messages} senderId={data?.user?.id}/>
        <div className='flex-shrink'>
            <ChatInput handleSendMessage={() => mutate({senderId : data?.user?.id, receiverId, message})} setMessage={handleMessage} message={message} loading={isLoading}/>
        </div>
    </div>
  )
}

export default Index