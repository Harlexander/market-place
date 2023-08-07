"use client"
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage';

const Chat = ({messages, senderId : id, user}) => {
  const [ msg, setMsg] = useState(messages);

  useEffect(() => {
    setMsg(messages);
    console.log('change')
  }, [messages]);

  const messagesRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [msg]);

  const scrollToBottom = () => {
    console.log('scroll')
    messagesRef?.current?.scrollIntoView({ behaviour : 'smooth'})
  };

  console.log(msg);

  return (
    <div className='flex-grow overflow-y-auto flex flex-col gap-2'>   
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
    <div ref={messagesRef}/>   
</div>
  )
}

export default Chat