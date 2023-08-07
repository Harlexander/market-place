import { CheckBadgeIcon, HeartIcon, StarIcon, UsersIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'

const VendorWindow = ({data}) => {
  return (
    <div className='bg-pry sticky top-28  px-3 py-5 text-white space-y-5 shadow'>
        <p className='font-lato font-bold'>VENDOR INFORMATION</p>

        <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-3'>
                <img src='/user.jpg' className='rounded-full w-full'/>
            </div>
            <div className='col-span-9 space-y-3'>
                <div className='flex gap-3 items-center'>
                    <p className='font-bold font-lato text-lg'>{data.name}</p>
                    <CheckBadgeIcon className='h-6 text-blue-500'/>
                </div>
                <div>
                    <p className='font-nunito text-sm'>{data.description || `At ${data.name}, we are committed to excellence. Offering top-quality products and services tailored to your needs. Your satisfaction is our priority. Experience the best with us!`}</p>
                </div>
                <div className='flex gap-2 font-nunito'>
                    <button className='bg-yellow-300 text-pry text-xs py-1 px-5'>Follow</button>
                    <Link href={`/${data.slug}`}>
                        <button className='border-yellow-300 border-2 text-xs text-yellow-300 whitespace-nowrap py-1 px-3 w-full'>View Profile</button>
                    </Link>
                </div>

            </div>
        </div>
    </div>
  )
}

export default VendorWindow