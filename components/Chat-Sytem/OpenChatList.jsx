import React from 'react'

const OpenChatList = () => {
  return (
    <div>
        <ChatListContainer
        name="Eloghosa Prosper"/>
        <ChatListContainer
        name="Omah"/>
        <ChatListContainer
        name="Idemudia Divine"/>
        <ChatListContainer
        name="Williams"/>
        <ChatListContainer
        name="Golden Exchange"/>
        <ChatListContainer
        name="Eloghosa Prosper"/>
        <ChatListContainer
        name="Eloghosa Prosper"/>
    </div>
  )
}

const ChatListContainer = ({name}) => {
    return(
        <div className='grid border-b py-2 grid-cols-12 gap-1 px-3 hover:bg-pry-200 cursor-pointer'>
            <div className='col-span-2 flex justify-center items-center'>
                <img src="/user.jpg" className='h-12 w-12 rounded-full' alt="" />
            </div>

            <div className='col-span-10 flex justify-between'>
                <div className='space-y-1'>
                    <p className='text-sm font-lato'>{name}</p>
                    <p className='text-xs font-nunito text-gray-500'>You: How much last...</p>
                </div>
                <div className='space-y-2'>
                 <p className='text-xs font-nunito'>23 Dec</p>
                 <span className="text-sm rounded-full font-montserrat float-right inline-block px-2 py-1 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">2</span>
                </div>
            </div>
        </div>
    )
}

export default OpenChatList