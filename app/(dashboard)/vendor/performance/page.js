import { ChartBarIcon } from '@heroicons/react/24/solid'
import React from 'react'
import PageVisits from '../../../components/Analytics/PageVisits'
import Dashboard from '../../../layout/dashboard'

const Index = () => {
  return (
    <div className='md:p-10 p-2 space-y-8'>
        <p className='bg-pry flex items-center gap-4 justify-center rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
        <ChartBarIcon className='h-6 w-6'/> Performance 
        </p>      

        <PageVisits/>
    </div>
  )
}


export default Index