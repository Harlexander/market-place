import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarAlt, faList, faShop } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import categories from '@/lib/categories'

const CategoryList = () => {
  return (
    <div className='rounded-lg sticky top-28 bg-white'>
        <div className='bg-pry px-4 py-2 rounded-t-lg'>
            <p className='font-montserrat text-white text-lg'>Categories</p>
        </div>
        <div className='py-5'>
            {
                categories.map((item, index) => (
                    <Link key={index} href={`/category/${item.category.toLowerCase().replace(/ /g, "-")}`}>
                        <div key={index} className='flex font-nunito text-pry justify-between px-5 hover:bg-pry-300 py-2 items-center'>
                            <div className='flex items-center gap-4'>
                            <FontAwesomeIcon icon={faShop} className="text-sm"/>
                                <p className='capitalize'>{item.category}</p>
                            </div>
                            <ChevronRightIcon className='h-4'/>
                        </div>                    
                    </Link>

                ))
            }
        </div>
    </div>
  )
}

export default CategoryList