import React from 'react'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import LongText from '../Text/LongText'
import { productImage } from '@/lib/imagePath'
import { useImageModal } from '@/hooks/useImageModal'
import Link from 'next/link'

const EditProduct = ({isOpen, setIsOpen, data}) => {
      const { toggleModal } = useImageModal();
      return (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
    
          {/* Full-screen scrollable container */}
          <div className="fixed inset-0 overflow-y-auto">
            {/* Container to center the panel */}
            <div className="flex min-h-full items-center justify-center p-4">
              {/* The actual dialog panel  */}
              <Dialog.Panel className="mx-auto p-4 md:p-10 font-nunito w-full md:max-w-xl space-y-5 rounded bg-white">
                <Dialog.Title className={'font-montserrat border-b py-2 font-bold text-lg'}>{data.productName}</Dialog.Title>

                <div className='flex flex-wrap gap-2'>
                    <div className={`px-2 md:px-5 text-xs py-1 ${data.brand_new ? "bg-green-300" : "bg-gray-200"} rounded-xl`}>
                        Brand New
                    </div>
                    <div className={`px-2 md:px-5 text-xs py-1 ${data.negotiable ? "bg-green-300" : "bg-gray-200"} rounded-xl`}>
                        Negotiable
                    </div>
                    <div className={`px-2 md:px-5 text-xs py-1 ${data.pre_order ? "bg-green-300" : "bg-gray-200"} rounded-xl`}>
                        Pre-order
                    </div>
                </div>

                <div className='flex md:grid grid-cols-5 gap-4 overflow-x-auto'>
                  {
                    data.images.map(({image}, index) => (
                      <img onClick={() => toggleModal(productImage+image)} src={productImage+image} key={index} alt="img" className='h-28 w-28'/>
                    ))
                  }
                </div>

                <div className='space-y-3'>
                    <p className='font-montserrat font-semibold border-b'>Description</p>
                    <LongText
                    text={data.description}
                    maxChars={250}/>
                </div>
                <div className='space-y-3'>
                    <p className='font-montserrat font-semibold border-b'>Features</p>
                    <ul className='space-y-2'>
                      {
                        data.features.map(({feature}, index) => (
                          <li key={index} className='grid grid-cols-12'><ArrowRightIcon className='h-4 col-3'/><span className='col-span-11'>{feature}</span></li>
                        ))
                      }

                    </ul>
                </div>
                <Link href={`/vendor/products/${data.id}`}>
                    <button className='rounded w-full bg-blue-400 py-2'>Edit Product</button>
                </Link>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )
}

export default EditProduct