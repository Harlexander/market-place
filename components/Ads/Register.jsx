"use client"
import React from 'react'
import SearchInput from '../Input/searchInput'

const Register = () => {
  return (
    <section className='md:px-28 px-5  py-10'> 
    <div className='bg-pry space-y-10 text-white text-center p-5 md:p-20 rounded-xl'>
      <div>
        <p className='md:text-2xl text-xl font-curve'>Become A Vendor On Uniben Online Market</p>
        <p className='text-xs font-nunito'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </p>
      </div>

      <SearchInput
      onChange={(e) => console.log(e)}
      buttonText={'Proceed'}
      onClick={() => console.log("clicked")}/>
     </div>
  </section>
  )
}

export default Register