import React from 'react'
import Link from 'next/link'

const CategoryCard = ({category, items, img}) => {
  return (
    <Link className='col-1' href={`/category/${category.replace(/ /g, '-')}`}>
      <div className='hover:shadow-lg h-full flex flex-col rounded-xl bg-white p-2 gap-2 md:gap-5 col-span-1'>
          <img src={img} className='w-full h-32 sm:h-44 object-cover rounded-xl'/>
          <div className='space-y-1 sm:space-y-1.5'>
              <p className='font-montserrat font-semibold text-md md:text-lg capitalize'>{category}</p>
              <p className='font-nunito text-xs sm:text-sm capitalize'>{items}...</p>
          </div>
      </div>
    </Link>

  )
}

export default CategoryCard