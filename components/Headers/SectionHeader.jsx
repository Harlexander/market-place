import React from 'react'

const SectionHeader = ({title}) => {
  return (
    <div className='rounded-t-lg shadow bg-pry text-center py-1 md:py-4'>
        <p className='capitalize font-montserrat text-sm md:text-lg text-white'>{title}</p>
    </div>
  )
}

export default SectionHeader