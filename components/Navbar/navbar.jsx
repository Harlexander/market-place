"use client"
import { Disclosure, Menu, Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Bars3CenterLeftIcon, Bars3Icon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { ChartBarIcon, ChartPieIcon, ChevronDownIcon, CubeIcon, EnvelopeOpenIcon, HeartIcon, PlusCircleIcon } from '@heroicons/react/20/solid'

const navigation = [
  { name: 'Market place', href: '/marketplace', current: true },
  { name: 'About Us', href: '/about', current: false },
  { name: 'Blog', href: '/login', current: false },
  { name: 'Terms', href: '/login', current: false },
  { name: 'Contact', href: '/login', current: false }
]

export const logo = "next.svg"

const styles = {
  bg : "bg-pry",
  opacity: "bg-opacity-100",
  position: "fixed",
  font: "font-nunito"
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({user}) {

  return (
    <div>
          <Disclosure as="nav" className={`z-10 w-full  ${styles.bg} ${styles.opacity} ${styles.position} ${styles.font}`}>
    {({ open }) => (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className={"flex w-full justify-between items-center "+styles.font}>
              <img src={logo} className='h-8'/>
              <div className="hidden md:block self-end">
                <div className="ml-10 flex items-baseline space-x-10 py-5 text-[white]">

                </div>
              </div>
              <div className='flex gap-4 items-center'>
                  <MenuOptions user={user}/> 
              </div>
            </div>
          </div>
        </div>
      </>
    )}
    </Disclosure>
    </div>

  )
}
  export const buyerlist = [
    {
      icon : <ChartBarIcon className='h-4 text-pry'/>,
      title : "My Dashboard",
      link : "/dashboard"
    },
    {
      icon : <HeartIcon className='h-4 text-pry'/>,
      title : "Wishlist",
      link : "/dashboard/wishlist"
    },
    {
      icon : <EnvelopeOpenIcon className='h-4 text-pry'/>,
      title : "Messages",
      link : "/dashboard/messages"
    }
  ]

  export const sellerlist = [
    {
      icon : <ChartPieIcon className='h-4 text-pry'/>,
      title : "My Dashboard",
      link : "/vendor"
    },
    {
      icon : <PlusCircleIcon className='h-4 text-pry'/>,
      title : "Add Product",
      link : "/vendor/add-product"
    },
    {
      icon : <CubeIcon className='h-4 text-pry'/>,
      title : "My Products",
      link : "/vendor/products"
    },
    {
      icon : <EnvelopeOpenIcon className='h-4 text-pry'/>,
      title : "Messages",
      link : "/vendor/messages"
    }
  ]
export const MenuOptions = (user) => {


  const list = user?.user?.role === "BUYER" ? buyerlist : sellerlist;

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="px-2 py-1 rounded text-pry bg-white rounded-full flex items-center gap-2">
            <UserCircleIcon className='h-8'/>
            Hey! {user?.user?.username} {!user?.user && "Sign in"}
            <ChevronDownIcon className='h-5'/>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              {
                list.map((item, index) => (
                  <Menu.Item key={index}>
                      <Link href={item.link} className={`group gap-4 flex w-full items-center rounded-md px-2 py-3 text-sm hover:bg-pry-300`}>
                          {item.icon}
                          {item.title}
                      </Link>
                  </Menu.Item>
                ))
              }
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
