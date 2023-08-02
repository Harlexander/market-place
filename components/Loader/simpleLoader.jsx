"use client"

import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { ScaleLoader } from 'react-spinners'

const SimpleLoader = ({title}) => {
  return (
    <div className='bg-white p-10 h-screen w-screen rounded-xl fixed flex justify-center bg-opacity-10 items-center z-10'>
       <div className='bg-white p-10 rounded-xl shadow-xl'>
          <ScaleLoader/>
          <p className='font-nunito'>{title}</p>
       </div>  
    </div>
  )
}

export default SimpleLoader