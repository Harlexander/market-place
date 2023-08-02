"use client"

import Link from 'next/link'
import { Bars3CenterLeftIcon, Bars3Icon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import SearchInput from '../Input/searchInput'
import SideMenu from '../Sidebar/SideNav'
import { useState } from 'react'
import { ShoppingBagIcon, UserCircleIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Markek place', href: '/', current: true },
  { name: 'About Us', href: '/about', current: false },
  { name: 'Blog', href: '/login', current: false },
  { name: 'Terms', href: '/login', current: false },
  { name: 'Contact', href: '/login', current: false }
]

const logo = "next.svg"

const styles = {
  bg : "bg-pry",
  opacity: "bg-opacity-100",
  position: "fixed",
  font: "font-[nunito]"
}

export default function PagesNavbar() {
  const [open, setOpen] = useState(false);

  const user = {}

  return (
    <div>
    <SideMenu open={open} setOpen={setOpen}/>
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
                      <Link href={user ? "/user/wishlist" : "/login"} class="relative cursor-pointer">
                        <ShoppingBagIcon className="h-7 text-white" />
                        <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1.5 text-xs font-bold leading-none text-pry transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full">
                          3
                        </span>
                      </Link>
                      
                    
                      <Link href={user ? "/user/" : "/login"} className='cursor-pointer'>
                        <UserCircleIcon className='h-8 text-white'/>
                      </Link>
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
