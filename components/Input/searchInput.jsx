import React from 'react'

const SearchInput = ({onChange, onClick, buttonText, placeholder}) => {
  return (
    <div className='grid grid-cols-12 border-2 md:border-2 border-white rounded-full bg-white md:mx-20'>
    <input
    placeholder={placeholder}
    onChange={() => onChange}
    onClick={() => onClick}
    className='px-3 placeholder:font-nunito col-span-9 rounded-full text-pry  py-1 md:py-2'
    />
    <button className='col-span-3 text-white font-nunito text- flex items-center bg-pry justify-center rounded-full'>
        <p>{buttonText}</p>
    </button>
</div>
  )
}

export default SearchInput