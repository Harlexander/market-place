import { Tab } from '@headlessui/react'
import React from 'react'

const RegistrationTab = ({buyer, seller}) => {
  return (
    <Tab.Group>
      <Tab.List className={"space-x-1 flex justify-between mb-2"}>
        <Tab className="border-b-2 flex-1 text-pry">
            { ({selected}) => (
                <span className={`w-full h-full inline-block py-2 ${selected && 'bg-pry-200'}`}>Buyer</span>
            ) } 
        </Tab>
        <Tab className="border-b-2 flex-1 text-pry">
            { ({selected}) => (
                <span className={`w-full h-full inline-block py-2 ${selected && 'bg-pry-200'}`}>Vendor</span>
            ) } 
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>{buyer}</Tab.Panel>
        <Tab.Panel>{seller}</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  )
}

export default RegistrationTab