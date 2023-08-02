import { EyeIcon } from '@heroicons/react/24/outline'
import React from 'react'

const FollowingTable = () => {
  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <tbody>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                <img src='user.jpg' className='h-10'/>
              </td>
              <td className="text-sm font-nunito text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                Dunkwu Alexander
              </td>
            </tr>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                <img src='user.jpg' className='h-10'/>
              </td>
              <td className="text-sm font-nunito text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                Dunkwu Alexander
              </td>
            </tr>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                <img src='user.jpg' className='h-10'/>
              </td>
              <td className="text-sm font-nunito text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                Dunkwu Alexander
              </td>
            </tr>
            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                <img src='user.jpg' className='h-10'/>
              </td>
              <td className="text-sm font-nunito text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                Dunkwu Alexander
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
  )
}

export default FollowingTable