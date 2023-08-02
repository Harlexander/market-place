import React from 'react'

const FollowersTable = ({data}) => {
  console.log(data);

  return (
    <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <div className="min-w-full">
            {
              data.data && data.data.map(({followerData}, index) => (
                // <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                  <div key={index} className="text-sm flex gap-3 items-center capitalize text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                      <img src='user.jpg' className='h-10'/>
                      <span>
                        {followerData[0].brandName || followerData[0].username }
                      </span>
                  </div>
              ))
            }
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default FollowersTable