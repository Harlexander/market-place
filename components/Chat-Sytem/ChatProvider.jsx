"use client"
import Chat from '@/components/Chat-Sytem/Chat';
import ChatInput from '@/components/Chat-Sytem/ChatInput';
import { useProductHighlight } from '@/hooks/useProductHighlight';
import { followUser } from '@/lib/fetcher';
import socket from '@/lib/socket';
import { faHeart, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query';

const ChatProvider = ({receiverId}) => {
    const { data , status } = useSession();
    const [ messages, setMessages ] = useState([]);
    const [ message, setMessage ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ user, setUser ] = useState({});
    const { productId } = useProductHighlight();

    useEffect(() => {
      if(status === 'authenticated'){
        const senderId = data.user.id;

          socket.emit('join', { receiverId, senderId})

          socket.on("message", ({user, msg}) => {
            if (Array.isArray(msg)) {
              // If msg is an array of messages, directly update the state
              setMessages((prevMessages) => [...prevMessages, ...msg]);
            } else {
              // If msg is a single message, add it to the state
              setMessages((prevMessages) => [...prevMessages, msg]);
            }
            setLoading(false);
            user && setUser(user);
            setMessage("");
          })

          socket.emit('read_messages', { senderId : senderId, receiverId : receiverId } )
          socket.emit('open_messages', { senderId : senderId, receiverId : receiverId } )

          socket.on('connect', ()=> console.log("connect"));
          socket.on('disconnect', ()=> console.log("disconnect"));
          
          return () => {
            socket.off('message');
            socket.off('read_messages');
            socket.off('open_messages');
            socket.off('connect');
            socket.off('disconnect');
          };
      }
    }, [status])

    const handleMessage = (e) => setMessage(e.target.value);

    const sendMessage = async () => {
        setLoading(true)
        const content = {
            senderId : data?.user?.id,
            receiverId, 
            message, 
            productId : productId
        }
        socket.emit("message", content);
    }

    console.log(user)

  return (
    <div className='p-4 h-full flex justify-between flex-col gap-2'>
        <div className='bg-gray-100 px-4 py-2 justify-between flex gap-4'>
          <div className='flex gap-4'>
            <img src="/user.png" alt="logo" className='h-10' />
            <div className='flex flex-col font-nunito' >
              <span className=''>{user.store ? user?.store.name : user?.username}</span>
              <span className='text-xs'>Active</span>
            </div>            
          </div>

          <div className='flex items-center text-pry'>
            <a href={`tel:${user?.mobile}`}>
              <FontAwesomeIcon icon={faPhone}  className='text-2xl px-3'/>
            </a>
            <a>
            <FontAwesomeIcon icon={faHeart}  className='text-2xl pl-3'/>
            </a>
          </div>

        </div>
        <Chat 
            messages={messages} 
            senderId={data?.user?.id}/>
        <div className='flex-shrink'>
            <ChatInput 
                handleSendMessage={sendMessage} 
                setMessage={handleMessage} 
                message={message} 
                loading={loading}/>
        </div>
    </div>
  )
}

export default ChatProvider