"use client"
import { Menu, Transition } from '@headlessui/react'
import { ChatBubbleBottomCenterIcon, DocumentDuplicateIcon, EllipsisHorizontalIcon, StarIcon, TrashIcon } from '@heroicons/react/24/solid'
import moment from 'moment'
import React, { Fragment } from 'react'

const ReviewsTable = ({reviews}) => {
  return (
    <div className='overflow-x-auto min-h-screen'>
        <table className='w-full'>
            <thead>
                <tr className='font-nunito font-light text-left'>
                    <td>User</td>
                    <td>Review</td>
                    <td>Rating</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody className='font-nunito divide-y-8'>
                {
                    reviews.map(({ rating, comment, createdAt, id, user : { username, image, id : userId } }) => (
                        <tr key={id} className='bg-white'>
                        <td className='py-2 flex gap-4 items-center'>
                            <img src='/user.png' className='h-16 p-2'/> 
                            <span className='flex flex-col gap-1'>
                                <span className='whitespace-nowrap font-semibold text-lg'>
                                    {username}
                                </span>
                                <span className='text-sm'>
                                    {moment(createdAt).format("h:mm A do MM, YYYY")}
                                </span>
                            </span>
                        </td>
                        <td className='py-2 max-w-xs'>
                            {comment}
                        </td>
                        <td className='py-2 '>
                            <span className='flex gap-3 items-center'>
                                <span className='text-2xl font-semibold'>{rating}.0</span>
                                <span className='flex'>
                                    {
                                        Array(rating).fill("").map((item, index) => (
                                            <StarIcon key={index} className='text-yellow-600 h-4'/>
                                        ))
                                    }
                                    {
                                        Array(5-rating).fill("").map((item, index) => (
                                            <StarIcon key={index} className='text-gray-600 h-4'/>
                                        ))
                                    }
                                </span>                            
                            </span>
                        </td>
                        <td>
                            <MenuButton/>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export const UserReviewsTable = ({reviews}) => {
  return (
    <div className='overflow-x-auto min-h-screen'>
        <table className='w-full'>
            <thead>
                <tr className='font-nunito font-light text-left'>
                    <td>Vendor</td>
                    <td>Your Comment</td>
                    <td>Rating</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody className='font-nunito divide-y-8'>
                {
                    reviews.map(({ rating, comment, createdAt, id, vendor : { name, image, id : vendorId } }) => (
                        <tr key={id} className='bg-white'>
                        <td className='py-2 flex gap-4 items-center'>
                            <img src='/user.png' className='h-16 p-2'/> 
                            <span className='flex flex-col gap-1'>
                                <span className='whitespace-nowrap font-semibold text-lg'>
                                    {name}
                                </span>
                                <span className='text-sm'>
                                    {moment(createdAt).format("h:mm A do MM, YYYY")}
                                </span>
                            </span>
                        </td>
                        <td className='py-2 max-w-xs'>
                            {comment}
                        </td>
                        <td className='py-2 '>
                            <span className='flex gap-3 items-center'>
                                <span className='text-2xl font-semibold'>{rating}.0</span>
                                <span className='flex'>
                                    {
                                        Array(rating).fill("").map((item, index) => (
                                            <StarIcon key={index} className='text-yellow-600 h-4'/>
                                        ))
                                    }
                                    {
                                        Array(5-rating).fill("").map((item, index) => (
                                            <StarIcon key={index} className='text-gray-600 h-4'/>
                                        ))
                                    }
                                </span>                            
                            </span>
                        </td>
                        <td>
                            <MenuButton/>
                        </td>
                    </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

const MenuButton = () => {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="bg-gray-200 p-1 rounded">
            <EllipsisHorizontalIcon className='h-8'/>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group gap-4 flex w-full items-center rounded-md px-2 py-3 text-sm`}
                  >
                    {active ? (
                      <DocumentDuplicateIcon className='h-5 text-pry-800'/>
                    ) : (
                      <DocumentDuplicateIcon className='h-5 text-pry-500'/>
                    )}
                    Reply
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group gap-4 flex w-full items-center rounded-md px-2 py-3 text-sm`}
                  >
                    {active ? (
                      <ChatBubbleBottomCenterIcon className='h-5 text-pry-800'/>
                    ) : (
                      <ChatBubbleBottomCenterIcon className='h-5 text-pry-500'/>
                    )}
                    Chat Customer
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`group gap-4 flex w-full items-center rounded-md px-2 py-3 text-sm`}
                  >
                    {active ? (
                      <TrashIcon className='h-5 text-red-800'/>
                    ) : (
                      <TrashIcon className='h-5 text-red-500'/>
                    )}
                    Delete Review
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ReviewsTable