import React from 'react';
import { logo } from '../Navbar/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
  return (
    <footer className="bg-pry py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 mb-4 md:mb-0 space-y-5">
            <img src={logo} alt="Logo" className="w-32" />
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0 space-y-5">
            <h2 className="font-semibold text-white mb-2 font-montserrat text-xl">Categories</h2>
            <ul className='font-nunito space-y-2'>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Electronics</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Fashion</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Home &amp; Garden</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Beauty &amp; Health</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Sports &amp; Outdoors</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Toys &amp; Hobbies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Automotive</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0 space-y-5">
            <h2 className="font-semibold text-white mb-2 font-montserrat text-xl">Quick Links</h2>
            <ul className='font-nunito space-y-2'>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm">Shipping</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-4 md:mb-0 space-y-5">
            <h2 className="font-semibold text-white mb-2 font-montserrat text-xl">Follow Us</h2>
            <ul className="flex font-nunito space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm"><FontAwesomeIcon icon={[ 'fab', 'facebook']}/></a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm"><i className="fab fa-twitter"></i></a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-500 text-sm"><i className="fab fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap mt-8">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <p className="text-gray-300 font-montserrat">&copy; 2023 Uniben Online Market. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>

  )
}


export default Footer