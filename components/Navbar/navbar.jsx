import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { Bars3CenterLeftIcon, Bars3Icon, EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

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
  font: "font-[nunito]"
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
          <div className="flex items-center justify-between h-20">
            <div className={"flex w-full justify-between items-center "+styles.font}>
              <img src={logo} className='h-8'/>
              <div className="hidden md:block self-end">
                <div className="ml-10 flex items-baseline space-x-10 py-5 text-[white]">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={"hover:text-[#6666] text-sm text-white font-[montserrat]"}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                      <Link href={user ? "/user/" : "/login"} className='cursor-pointer'>
                        <UserCircleIcon className='h-8 text-white'/>
                      </Link>
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
