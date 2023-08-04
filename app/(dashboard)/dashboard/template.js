'use client'

import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faHeadphones, faHeart, faHomeAlt, faStar, faUpload, faUser, faUserAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import Sidebar from "@/components/Sidebar/Sidebar";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";

const navigation = [
  { 
    name: 'Overview', 
    href: '/dashboard', 
    icon:  <FontAwesomeIcon icon={faHomeAlt}/>, current: true 
  },
  { 
    name: 'Saved Items', 
    href: '/dashboard/wishlist', 
    icon:  <FontAwesomeIcon icon={faHeart}/>, current: true 
  },
  { 
    name: 'Messages', 
    href: '/dashboard/messages', 
    icon:  <FontAwesomeIcon icon={faEnvelope}/>, current: true 
  },
  { 
    name: 'Reviews', 
    href: '/dashboard/reviews', 
    icon:  <FontAwesomeIcon icon={faStar}/>, current: true 
  },
  { 
    name: 'Support', 
    href: '/dashboard/support', 
    icon:  <FontAwesomeIcon icon={faHeadphones}/>, current: true 
  },
]

const userNavigation = [
  { 
    name: 'Profile', 
    icon:  <FontAwesomeIcon icon={faUserAlt}/>,
    href: '/dashboard/profile' 
  },
  { 
    name: 'Become A Vendor', 
    icon:  <FontAwesomeIcon icon={faUserCheck}/>,
    href: '/dashboard' 
  },
]
const Template = ({children}) => {
  return (
    <div className="relative">
    <Sidebar 
    navigation={navigation}
    userNavigation={userNavigation}
    logo={"/next.svg"}
    />
    <div className="sidebar sidedashboard bg-gray-100 min-h-screen col-span-9 bg-blueGray-100">
    <DashboardHeader userNavigation={userNavigation} navigation={navigation}/>
        {children}
    </div>
</div>
  )
}

export default Template