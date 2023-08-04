"use client"

import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'

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
      msg.map(({message, createdAt, senderId}) => (
        <ChatMessage
          message={message}
          time={moment(createdAt).format("H:ssa")}
          userImage={"/user.png"}
          receiver={senderId === id}
          />  
      ))
    }     
    <div ref={messagesRef}></div>   
</div>
  )
}

export default Chat

const ChatMessage = ({ message, time, userImage, receiver }) => {
  return (
    <div style={{ maxWidth: '56%' }} className={`flex flex-col rounded-lg gap-2 items-start px-3 py-2 mb-4 ${receiver ? 'ml-auto bg-pry-800 text-white' : 'mr-auto bg-gray-200'}`}>
      <div className={`bg-white p-2 rounded-lg flex gap-3 ${receiver ? 'text-black bg-gray-200' : ''}`}>
        <img src="/user.png" alt="img" className='h-8' />
        <div className='flex flex-col'>
          <span className='text-xs'>Xiaomi pop 4 245GB Ram and digital scanning</span>
          <span className='font-semibold text-xs'>N15,000.00</span>
        </div>
      </div>
      <div className='flex flex-col w-full'>
          <span className='text-sm font-nunito'>{message}</span>
          <span className='text-[10px] font-nunito ml-auto font-semibold'>{time}</span>
      </div>
    </div>
  );
};