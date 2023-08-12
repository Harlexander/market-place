import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'

const DashboardCard = ({title, value, icon, subtitle}) => {
  return (
    <div className='rounded text-white shadow-lg bg-pry flex-1 p-5 space-y-3'>
        <div className='flex justify-between gap-16 sm:gap-0 items-start'>
            <div className='space-y-2'>
                <p className='font-montserrat text-xs text-gray-200 font-semibold'>{title}</p>
                <p className='font-montserrat text-3xl font-bold'>{value}</p>
            </div>

            <div className='col-span-2 flex justify-end items-center'>
                {icon}
            </div>
        </div>            
        {/* <div className='flex gap-3 items-center'>
            <FontAwesomeIcon icon={faChartLine} className="text-sm text-green-500"/>
            <span className='font-montserrat text-[10px]'>
                {subtitle}
            </span>
        </div> */}
    </div>
  )
}

export default DashboardCard