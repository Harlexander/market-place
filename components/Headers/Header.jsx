import React from 'react'

const Header = ({subtitle, title}) => {
  return (
    <div className='py-10 space-y-2 text-center'>
        <p className='md:text-lg font-bold font-montsrrat text-xs text-yellow-300'>{subtitle}</p>
        <p className='md:text-4xl text-2xl font-bold text-pry font-montserrat'>{title}</p>
    </div>
  )
}

export default Header