'use client'
import { useEditProfileModal } from '@/hooks/useEditProfileModal'
import React from 'react'

const EditButton = ({type}) => {
    const { toggleModal } = useEditProfileModal();
  return (
    <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><button onClick={() => toggleModal(type)} className='bg-pry w-full rounded py-1 text-white'>Edit</button></li>
  )
}

export default EditButton