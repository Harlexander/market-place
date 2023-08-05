import { HomeIcon, InformationCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'
import Link from 'next/link'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { signOut } from 'next-auth/react'

const Sidebar = ({navigation, userNavigation, logo}) => {
  return (
    <div className="w-64 h-full fixed space-y-5 shadow-md bg-gray-200 hidden md:block font-[Nunito]" id="sidenavSecExample">
        <div className="pt-4 pb-2 px-6">
            <a href="#!">
                <div className="mx-auto">
                    <img
                    className="object-cover h-10 mx-auto"
                    src={logo}
                    alt="logo"
                    />
                </div>
            </a>
        </div>
        <ul className="relative px-1 pt-6">
            {
                navigation.map(({name, href, sublink, icon}, index) => (
                    sublink ? (
                        <li className="relative accordion"  id="accordionExample"  key={index}>
                            <div className='accordion-item'>
                                <a  type="button" data-bs-toggle="collapse" data-bs-target={"#"+name} aria-expanded="false"
                                    aria-controls={name}
                                    className="flex justify-between items-center gap-5 text-sm py-4 px-6 h-12 overflow-hidden text-gray-600 text-ellipsis whitespace-nowrap rounded hover:text-pry hover:bg-pry-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                    <div className='flex gap-5'>
                                        {icon}
                                        <span>{name}</span>
                                    </div>
                                    <ChevronDownIcon  className='h-3'/>
                                </a>
                                <div id={name} class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        {
                                            sublink.map(({name, href}, index) => (
                                                <Link href={href} legacyBehavior key={index}>
                                                    <a key={index} className="flex justify-between items-center gap-5 text-sm py-4 px-6 mx-5 h-10 overflow-hidden text-gray-600 text-ellipsis whitespace-nowrap rounded hover:text-pry hover:bg-pry-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                                        <div className='flex gap-5'>
                                                            {icon}
                                                            <span>{name}</span>
                                                        </div>
                                                    </a>     
                                                </Link>   
                                            ))
                                        }   
                                    </div>
                            </div>
                        </li>
                    ) : (
                        <li className="relative" key={index}>
                            <Link shallow href={href} legacyBehavior key={index}>
                                <a className="flex justify-between items-center gap-5 text-sm py-4 px-6 h-12 overflow-hidden text-gray-600 text-ellipsis whitespace-nowrap rounded hover:text-pry hover:bg-pry-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                    <div className='flex gap-5'>
                                        {icon}
                                        <span>{name}</span>
                                    </div>
                                </a>
                            </Link>
                        </li>
                    )
                ))
            }
        </ul>
        <hr className="h-0.5 bg-gray-800"/>
        {
            userNavigation && (
                <>
                    
                    <ul className="relative px-1">
                    {
                            userNavigation.map(({name, href, icon}, index) => (
                                <li className="relative" key={index}>
                                    <Link href={href} legacyBehavior>
                                        <a className="flex justify-between items-center gap-5 text-sm py-4 px-6 h-12 overflow-hidden text-gray-600 text-ellipsis whitespace-nowrap rounded hover:text-pry hover:bg-pry-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                                            <div className='flex gap-5'>
                                                {icon}
                                                <span>{name}</span>
                                            </div>
                                        </a>
                                    </Link>
                                </li>
                            ))
                        }
                        <li className="relative">
                            <a onClick={() => signOut()} className="flex items-center gap-5 text-sm py-4 px-6 h-12 overflow-hidden text-gray-600 text-ellipsis whitespace-nowrap rounded hover:text-pry hover:bg-pry-200 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="primary">
                            <FontAwesomeIcon icon={faSignOutAlt}/>
                                <span>Sign Out</span>
                            </a>
                        </li>
                    </ul>
                </>
            )
        }
    </div>
  )
}

export default Sidebar