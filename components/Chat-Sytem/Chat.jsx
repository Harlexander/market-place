"use client"
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage';

const Chat = ({messages, senderId : id}) => {
  const [ msg, setMsg] = useState(messages);

  useEffect(() => {
    setMsg(messages)
  }, [messages]);

  const messagesRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesRef.current.scrollIntoView()
  };

  return (
    <div ref={messagesRef} className='flex-grow overflow-y-auto flex flex-col gap-2'>   
    {
      msg.map(({message, createdAt, senderId, product}, index) => (
        <ChatMessage
          message={message}
          key={index}
          time={moment(createdAt).format("H:ssa")}
          userImage={"/user.png"}
          receiver={senderId === id}
          product={product}
          />  
      ))
    }     
    <div ref={messagesRef}></div>   
</div>
  )
}

export default Chat