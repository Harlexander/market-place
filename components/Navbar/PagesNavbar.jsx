"use client"

import Link from 'next/link'
import { Bars3CenterLeftIcon, Bars3Icon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SearchInput from '../Input/searchInput'
import SideMenu from '../Sidebar/SideNav'
import { useState } from 'react'
import { MenuOptions, buyerlist, sellerlist } from './navbar'
import categories from '@/lib/categories'
import { ChevronRightIcon, CubeIcon } from '@heroicons/react/20/solid'
const logo = "next.svg"

const styles = {
  bg : "bg-pry",
  opacity: "bg-opacity-100",
  position: "fixed",
  font: "font-[nunito]"
}

export default function PagesNavbar({user}) {
  const [open, setOpen] = useState(false);
  const links = user?.user?.role === "BUYER" ? buyerlist : sellerlist

  return (
    <div>
    <SideMenu open={open} setOpen={setOpen} user={user}>
      <SideMenuContent links={links}/>
    </SideMenu>
    <nav as="nav" className={`z-10 w-full shadow-md ${styles.bg} ${styles.opacity} ${styles.position} ${styles.font}`}>
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className={"flex w-full md:gap-14 justify-between items-center "+styles.font}>

              <div className="-mr-2 flex md:hidden">
              {/* Mobile menu button */}
                <button
                  type="button"
                  className="rounded-md p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              </div>

              <img src={logo} className='h-8'/>

              <div className="hidden md:block flex-3 flex-grow self-end ">
                <SearchInput
                width={"w-full"}
                buttonText={"Search"}
                placeholder={"What would you like to buy?"}/>
              </div>

              <div className='flex gap-6 items-center'>
                  <MenuOptions user={user}/>
              </div>
            </div>
          </div>
        </div>
      </>
  </nav>  
  <div className='py-10 bg-pry spacer'>
  </div>
  </div>

  )
}

const SideMenuContent = ({links}) => {
  return(
    <div className='p-4 space-y-4'>
    <div className='space-y-1'>
      <p className='font-semibold text-yellow-600 font-nunito'>Top Categories</p>

      <ul className='text-sm font-nunito'>
        {
          categories.map((item) => (
            <Link key={item.category} href={`/${item.category.replace(/ /g, "-")}`}>
              <li key={item} className='capitalize flex items-center justify-between gap-3 py-2'> 
                  <span className='flex gap-3 items-center'>
                    <CubeIcon className='h-4 text-pry'/>{item.category} 
                  </span>
                  <ChevronRightIcon className='h-4'/>
              </li>                          
            </Link>

          ))
        }
      </ul>
    </div>

    <div className='space-y-1'>
      <p className='font-semibold text-yellow-600 font-nunito'>My Account</p>

      <ul className='text-sm font-nunito'>
        {
          links.map((item) => (
            <Link key={item.title} href={`/${item.href}`}>
              <li key={item.title} className='capitalize flex items-center justify-between gap-3 py-2'> 
                  <span className='flex gap-3 items-center'>
                    {item.icon}{item.title} 
                  </span>
                  {/* <ChevronRightIcon className='h-4'/> */}
              </li>                          
            </Link>

          ))
        }
      </ul>
    </div>
  </div>
  )
}
