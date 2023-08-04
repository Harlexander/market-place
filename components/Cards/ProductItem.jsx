'use client'

import { productImage } from '@/lib/imagePath'
import { ChatBubbleBottomCenterIcon, TrashIcon } from '@heroicons/react/20/solid'
import { EyeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React from 'react'

const ProductItem = ({name, price, brandNew, image, id="#", slug, wishlist, removeItem}) => {
  return (
    <Link href={`/product/${slug}-${id}`} className='flex w-full'>
        <div className='rounded-lg bg-white flex flex-col relative hover:shadow-xl shadow w-full p-0'>
            {
                brandNew && <span class="text-xs m-3 font-lato absolute shadow-xl top-0 right-0 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-yellow-500 text-white rounded-full">Brand New</span>
            }
            <img src={productImage+image} className='object-cover w-full h-48 rounded-t-lg'/>
            <div className='py-4 px-3 justify-between flex flex-col flex-grow space-y-1'>
                <p className='font-nunito text-sm'>{name.substr(0, 50)}...</p>
                <p className='font-montserrat font-bold text-pry text-lg'>N{price.toLocaleString()}</p>
            </div>

          {
            wishlist && (
              <div className='flex px-3 pb-3 gap-4 text-white '>
                <button className='w-full p-2 rounded font-nunito bg-pry flex justify-center items-center'><ChatBubbleBottomCenterIcon className='h-5'/></button>
                <button onClick={(e) => e.stopPropagation()} className='w-full p-2 rounded bg-pry font-nunito flex justify-center items-center'><TrashIcon className='h-5'/></button>
              </div>              
            )
          }
        </div>
    </Link>
  )
}

export default ProductItem


export const VendorProductItem = ({ setIsOpen, product, index, setActive}) => {
  return(
        <div className='rounded-lg relative flex justify-between flex-col bg-white hover:shadow-xl shadow'>
        <div>
          {
              product.brand_new && <span class="text-xs m-3 font-lato absolute top-0 right-0 inline-block p-1 md:py-2 md:px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-lg">Brand New</span>
          }
          <img src={productImage+product.images[0]?.image} className='object-cover w-full h-48 rounded-t-lg'/>
          <div className='py-4 px-3 space-y-1'>
              <p className='font-nunito'>{product.name.slice(0,32)}</p>
              <p className='font-montserrat font-bold text-pry'>N{product.price.toLocaleString()}</p>
          </div>
        </div>

        <div className='flex px-3 pb-3 gap-4 text-white '>
          <button onClick={() => {setIsOpen(true); setActive(index)}}  className='w-full p-2 rounded font-nunito bg-pry flex justify-center items-center'><EyeIcon className='h-5'/></button>
          <button className='w-full p-2 rounded bg-pry font-nunito flex justify-center items-center'><TrashIcon className='h-5'/></button>
        </div>
    </div>
  )
}