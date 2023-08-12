import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { BarsArrowDownIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Line } from 'react-chartjs-2'

const PageVisits = () => {
  return (
    <div className='grid gap-4 md:grid-cols-4'>
        <div className='md:col-1 flex flex-col gap-4'>
            <div className='bg-white rounded shadow-xs p-5 flex-1 font-montserrat space-y-4'>
                <p>Today&apos;s Page Visit</p>
                <div className='flex gap-5 items-center'>
                    <span className='text-3xl font-bold'>0</span>
                    <div className='bg-red-300 text-xs gap-1 px-2 rounded-full flex items-center justify-center px-2'>
                        <small>10%</small>
                        <BarsArrowDownIcon className='h-3'/>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <InformationCircleIcon className='h-6 w-6 text-pry'/><span className='text-xs text-gray-700'>Increase your page visit</span>
                </div>
            </div>
            <div className='bg-white rounded shadow-xs p-5 flex-1 font-montserrat space-y-4'>
                <p>Total Page Visits</p>
                <div className='flex gap-5 items-center'>
                    <span className='text-3xl font-bold'>121</span>
                </div>
                <div className='flex items-center gap-2'>
                    <InformationCircleIcon className='h-6 w-6 text-pry'/><span className='text-xs text-gray-700'>Increase your page visit</span>
                </div>
            </div>
        </div>

        <div className='bg-white rounded shadow-xs p-5 md:col-span-3 h-[400px]'>
            <Chart/>
        </div>
    </div>
  )
}

const Chart =  () => (
    <Line
    data={{
        labels: [21,34,45,34,23,12,32,53],
        datasets: [{
          label: [21,34,45,34,23,12,32,53],
          data: [21,34,45,34,23,12,32,53],
          backgroundColor: [
            '#684574'
          ],
          borderWidth: 2,
          borderColor : '#684574'
        }]
      }}
    options = {{
      indexAxis: 'x',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
          borderColor: "blue",
        }
      },
      responsive: true,
      maintainAspectRatio : false,
      plugins: {
        legend: {
          display : false,
          position: 'left',
        },
        title: {
          display: true,
          text: "Number of Daily Visits"
        }
      }
    }}/>
)
export default PageVisits