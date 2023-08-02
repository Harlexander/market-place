'use client'

import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartArea, faCube, faEnvelope, faHeadphones, faHeart, faHomeAlt, faStar, faUpload, faUser, faUserAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons'
import Sidebar from "@/components/Sidebar/Sidebar";
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader";

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const navigation = [
  { 
    name: 'Home', 
    href: '/vendor', 
    icon:  <FontAwesomeIcon icon={faHomeAlt}/>, 
    current: true 
  },
  { 
    name: 'My Products', 
    href: '/vendor/products', 
    icon:  <FontAwesomeIcon icon={faCube}/>, 
    current: true 
  },
  { 
    name: 'Upload Product', 
    href: '/vendor/add-products', 
    icon:  <FontAwesomeIcon icon={faUpload}/>, 
    current: true 
  },
  { 
    name: 'Reviews', 
    href: '/vendor/reviews', 
    icon:  <FontAwesomeIcon icon={faStar}/>, 
    current: true 
  },
  { 
    name: 'Messages', 
    href: '/vendor/messages', 
    icon:  <FontAwesomeIcon icon={faEnvelope}/>, 
    current: true 
  },
  { 
    name: 'Performance', 
    href: '/vendor/performance', 
    icon:  <FontAwesomeIcon icon={faChartArea}/>, 
    current: true 
  }
]

const userNavigation = [
  { 
    name: 'Profile', 
    icon:  <FontAwesomeIcon icon={faUserAlt}/>,
    href: '/vendor/profile' 
  },
  { 
    name: 'Verify Account', 
    icon:  <FontAwesomeIcon icon={faUserCheck}/>,
    href: '/' 
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
    <div className="sidebar bg-gray-100 min-h-screen col-span-9 bg-blueGray-100">
    <DashboardHeader userNavigation={userNavigation} navigation={navigation}/>
        {children}
    </div>
</div>
  )
}

export default Template