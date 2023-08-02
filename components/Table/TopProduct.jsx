import { EyeIcon } from '@heroicons/react/24/outline'
import React from 'react'

const TopProduct = ({data}) => {
  console.log(data);
  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <tbody>
            {
              data.data && data.data.map((product, index) => (
                <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <td className="text-sm text-gray-900 font-light md:px-6 md:py-4 whitespace-nowrap">
                    <div style={{ width : "50px"}}>
                      <img src={product.images[0].image} className='block'/>
                    </div>
                  </td>
                  <td className="text-sm font-nunito text-gray-900 font-light px-2 py-4 md:px-6 md:py-4 whitespace-nowrap">
                    <p>
                    {product.productName.slice(0, 28)}...
                    </p>
                    <p className='font-bold font-montserrat'>N{product.price.toLocaleString()}</p>
                  </td>
                  <td className="text-sm font-nunito flex flex-col items-center text-gray-900 font-light md:px-6 md:py-4 whitespace-nowrap">
                    <EyeIcon className='h-4'/>
                    {product.views}
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

export default TopProduct