"use client"
import { useProductHighlight } from '@/hooks/useProductHighlight';
import { productImage } from '@/lib/imagePath';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import React from 'react';

const ChatInput = ({handleSendMessage, setMessage, message, loading}) => {
  const { productId, productName, productImage: img, productPrice } = useProductHighlight()
  return (
    <div className="w-full bottom-0 font-nunito space-y-1 bg-gray-200">
      {
        productId && (
          <div className='bg-gray-100 p-2 rounded-t-lg flex gap-2'>
            <img src={productImage+img} alt="img" className='h-10' />
            <div className='flex flex-col gap-2'>
              <span className='text-sm'>{productName}</span>
              <span className='font-semibold'>N{productPrice.toLocaleString()}</span>
            </div>
          </div>
        )
      }
      <form className="flex gap-1" onSubmit={e => {e.preventDefault(); handleSendMessage()}}>
        <button
          className="flex gap-2 font-figtree items-center text-white p-2 rounded-full"
          type='button'
        >
          <PaperClipIcon className='h-6 text-pry'/>
        </button>
        <input
          type="text"
          value={message}
          onChange={setMessage}
          required
          placeholder="Type your message..."
          className="border rounded-full px-4 py-2 flex-1 focus:outline-none"
        />
        <button
          className="bg-pry flex gap-2 font-figtree items-center text-white px-4 py-2 rounded-full hover:bg-pry-600"
        >
          {
            loading ? (<FontAwesomeIcon icon={faSpinner} spin className='text-white'/>) : (
              <>
              <PaperAirplaneIcon className='h-6 text-white'/>
              </>
            )
          }
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
