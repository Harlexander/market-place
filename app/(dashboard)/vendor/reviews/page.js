import { StarIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { CheckBadgeIcon, ClipboardDocumentIcon, ClockIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import moment from 'moment/moment'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import SimpleLoader from '../../../components/Loader/simpleLoader'
import { useAuth } from '../../../context/user'
import Dashboard from '../../../layout/dashboard'

const Index = () => {
  const { token, loading } = useAuth();

  const { data } = useQuery("myreviews", async () => {
    const { data } = await axios.get('/api/vendor/reviews', { headers : { authorization : token }});

    return data;
  }, {enabled : (token != null)});


  console.log(data);

  if(loading){
    return(
      <SimpleLoader/>
    )
  }
  
  return (
    <div>
        <div className='md:p-10 p-2 space-y-8'>
            <p className='bg-pry flex items-center justify-center gap-4 rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
            <StarIcon className='h-6 w-6'/> Your Reviews
            </p> 
            <div className="overflow-x-auto">
            <table className="min-w-full table-auto border rounded">
                <thead>
                <tr className="bg-gray-200 text-left font-montserrat">
                    <th className="px-4 py-2">Reviewer</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Rating</th>
                    <th className="px-4 py-2">Comment</th>
                </tr>
                </thead>
                <tbody>
                {data && data.map((review, index) => (
                    <tr key={index} className={`py-2 font-nunito ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                    <td className="border px-4 py-2">{review.username}</td>
                    <td className="border px-4 py-2">{moment(review.createdAt).format('ddd, MMM D, h:mm A')}</td>
                    <td className='flex items-center gap-1'>
                        {
                            Array(review.rating).fill("10").map((star, index) => (
                                <StarIcon key={index} className='h-4 text-yellow-400'/>
                            ))
                        }
                        {
                            Array(5-review.rating).fill("10").map((star, index) => (
                                <StarIcon key={index} className='h-4 text-gray-400'/>
                            ))
                        }
                    </td>           
                    <td className="border px-4 py-2">{review.comment}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default Index
