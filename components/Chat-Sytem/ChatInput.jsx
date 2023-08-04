"use client"
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import React from 'react';

const ChatInput = ({handleSendMessage, setMessage, message, loading}) => {
  return (
    <div className="w-full bottom-0 font-nunito space-y-1">
      <div className='bg-gray-100 p-2 rounded-t-lg flex gap-2'>
        <img src="/user.png" alt="img" className='h-10' />
        <div className='flex flex-col gap-2'>
          <span className='text-sm'>Techno pop3 x, Amoled screen with gorilla glass screen with gorilla glass</span>
          <span className='font-semibold'>N13,000</span>
        </div>
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={setMessage}
          placeholder="Type your message..."
          className="border rounded-l-md px-4 py-2 flex-1 focus:outline-none"
        />
        <button
          className="bg-pry flex gap-2 font-figtree items-center text-white px-6 py-2 rounded-r-md hover:bg-pry-600"
          onClick={handleSendMessage}
        >
          {
            loading ? (<FontAwesomeIcon icon={faSpinner} spin className='text-white'/>) : (
              <>
              <span>Send</span> <PaperAirplaneIcon className='h-6 text-white'/>
              </>
            )
          }
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
