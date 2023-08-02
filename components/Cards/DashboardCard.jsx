import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

const DashboardCard = ({title, value, icon, subtitle}) => {
  return (
    <div className='rounded-3xl text-white shadow-lg bg-pry p-5 grid grid-cols-6'>
        <div className='col-span-4 space-y-2 md:space-y-4'>
            <p className='font-montserrat text-sm text-gray-200 font-semibold'>{title}</p>
            <p className='font-montserrat text-4xl font-bold'>{value}</p>
            <div className='flex gap-3 items-center'>
                <FontAwesomeIcon icon={faChartLine} className="text-sm text-green-500"/>
                <span className='font-montserrat text-xs'>
                    {subtitle}
                </span>
            </div>
        </div>
        <div className='col-span-2 flex justify-end items-center'>
            {icon}
        </div>
    </div>
  )
}

export default DashboardCard