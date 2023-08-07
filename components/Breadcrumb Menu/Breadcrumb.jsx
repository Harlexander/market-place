import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import React from 'react'

const Breadcrumb = ({items = [
  {
      title : "Home",
      href : "/"
  },
  {
      title : "Marketplace",
      href : "/marketplace"
  },
  {
      title : "Vehicles",
      href : "/vehicles"
  },
  {
      title : "Toyota",
      href : "/toyota"
  },
]}) => {
 
  return (
<nav class="relative md:m-5 flex flex-wrap items-center justify-between py-3 bg-ry-200 text-pry-800 hover:text-pry-800 focus:text-pry-800 navbar navbar-expand-lg navbar-light">
  <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
    <nav class="bg-grey-light rounded-md w-full" aria-label="breadcrumb">
      <ol class="list-reset flex flex-wrap">
        {
            items.map(({title, href}, index) => (
                <div key={index} className="flex link-reset">
                    <li><Link href={href} class="text-pry-800 capitalize text-xs md:text-sm font-lato hover:text-pry-800">{title}</Link></li>
                    {
                      items.length !== index+1 && (
                        <li><span class="text-pry-800 text-xs md:text-sm mx-1 md:mx-5">/</span></li>
                      )
                    }                    
                </div> 
            ))
        }
      </ol>
    </nav>
  </div>
</nav>
  )
}

export default Breadcrumb