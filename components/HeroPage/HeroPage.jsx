"use client"
import categories from '@/lib/categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'

const HeroPage = () => {
  return (
    <div className='bg-pry py-24 md:py-40 px-5 md:px-20 space-y-10'>
        <div className='text-center text-white space-y-1'>
            <p className='text-xl md:text-4xl font-montserrat'>The Biggest Online Market For Uniben Students</p>
            <p className='font-nunito md:text-xl text-sm'>Buy and sell from the comfort of your home</p>
        </div>
        <div className='grid grid-cols-12 border-2 md:border-4 border-white rounded-full bg-white md:mx-20'>
            <input
            placeholder='What would you like to buy?'
            className='px-3 placeholder:font-nunito col-span-9 rounded-full  py-1 md:py-2'
            />
            <button className='col-span-3 text-pry font-nunito text- flex items-center bg-yellow-300 justify-center rounded-full'>
                <p>Search</p>
            </button>
        </div>
        <div className='flex gap-5 flex-wrap justify-center'>
            {
                categories.map(({category, subcategories}, index) => (
                    <Select
                    key={index}
                    href={`/category/${category.replace(/ /g, "-")}/${subcategories[0].replace(/ /g, "-")}`}
                    name={subcategories[0]}/>
                ))
            }
        </div>
    </div>
  )
}

export const Select = ({name, href="#"}) => {
    return(
        <Link href={href}>
            <div className='flex grid-cols-12 hover:shadow-xl border md:border-4 border-white rounded-full bg-white'>
                <div className='col-span-3 px-2 text-white font-nunito text- flex items-center bg-pry justify-center rounded-full'>
                    <MagnifyingGlassIcon className='h-2 md:h-3'/>
                </div>
                <p className='text-center capitalize text-xs font-nunito py-1 md:text-md px-3 col-span-9 whitespace-nowrap'>
                    {name}
                </p>
            </div>
        </Link>
    )
}

export default HeroPage