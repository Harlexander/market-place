import ChatProvider from '@/components/Chat-Sytem/ChatProvider';
import React from 'react'

const Index = ({ params : { receiverId }}) => {
  return (
    <ChatProvider receiverId={receiverId}/>
  )
}

export default Index