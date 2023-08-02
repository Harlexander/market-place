import React from 'react'
import Link from 'next/link'

const CategoryCard = ({category, items, img}) => {
  return (
    <div className='shadow-lg flex justify-between flex-col rounded-xl bg-white p-3 gap-2 md:gap-5 col-span-1'>
        <img src={img} className='w-full h-32 sm:h-44 object-cover rounded-xl'/>
        <div className='space-y-1 sm:space-y-3'>
            <p className='font-montserrat font-semibold text-md md:text-xl capitalize'>{category}</p>
            <p className='font-nunito text-xs sm:text-sm capitalize'>{items}...</p>
        </div>
        
        <div className='grid grid-cols-2 bg-white '>
            <p className='col-1 font-curve text-xs my-auto'>Add to Favourite</p>
            <Link className='col-1' href={`/c/${category.replace(/ /g, '-')}`}>
              <button className='bg-pry text-white shadow text-xs font-nunito flex-1 rounded w-full py-2 md:py-3'>
                  Checkout
              </button>            
            </Link>
        </div>
    </div>
  )
}

export default CategoryCard