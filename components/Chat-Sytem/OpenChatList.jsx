import moment from 'moment'
import Link from 'next/link'
import React from 'react'

const OpenChatList = ({data}) => {
  return (
    <div className=''>
        {
            data.map(({id, username, store, lastMessage : { createdAt, message, senderId, isRead }}) => (
                <ChatListContainer
                name={store ? store.name : username}
                store={store === null}
                message={message}
                createdAt={createdAt}
                sender={senderId !== id}
                unread={!isRead}
                id={id}/>                
            ))
        }
    </div>
  )
}

const ChatListContainer = ({name, id, store, message, createdAt, sender, unread}) => {
    return(
        <Link href={`/${store ? "vendor" : "dashboard"}/messages/${id}`}>
            <div className='grid border-b py-2 grid-cols-12 gap-1 px-3 hover:bg-pry-200 cursor-pointer'>
                <div className='col-span-2 flex justify-center items-center'>
                    <img src="/user.jpg" className='h-12 w-12 rounded-full' alt="" />
                </div>

                <div className='col-span-10 flex justify-between'>
                    <div className='space-y-1'>
                        <p className='text-sm font-lato'>{name}</p>
                        <p className='text-xs font-nunito text-gray-500'>{sender && "You: "}{message.substring(0, 30)}...</p>
                    </div>
                    <div className='space-y-2'>
                    <p className='text-xs font-nunito'>{moment(createdAt).format("Do MMM")}</p>
                        {
                            unread && (<span className="text-sm rounded-full font-montserrat float-right inline-block p-2 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full"></span>)
                        }                 
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default OpenChatList