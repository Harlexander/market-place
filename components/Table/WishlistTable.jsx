import { productImage } from '@/lib/imagePath'
import Link from 'next/link'
import React from 'react'

const Wishlist = ({data= []}) => {
  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <tbody>
            {
              data.map(({ product : { name, slug, images, id, views, price }}, index) => (
                <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="text-sm text-gray-900 font-light md:px-6 md:py-4 whitespace-nowrap">
                    <div style={{ width : "50px"}}>
                      <img src={productImage+images[0].image} className='block'/>
                    </div>
                  </td>
                  <td className="text-sm font-nunito text-gray-900 font-light px-2 py-4 md:px-6 md:py-4 whitespace-nowrap">
                    <p>
                    {name.slice(0, 28)}...
                    </p>
                    <p className='font-bold font-montserrat'>N{price.toLocaleString()}</p>
                  </td>
                  <td className="text-sm text-white font-nunito flex flex-col justify-between items-center text-gray-900 font-light md:px-6 md:py-4 whitespace-nowrap">
                    <Link href={`/product/${slug}-${id}`}>
                        <button className='bg-pry rounded shadow-xl px-4 py-2'>
                            View
                        </button>                    
                    </Link>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default Wishlist