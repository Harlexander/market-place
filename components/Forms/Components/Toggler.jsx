import { Switch } from '@headlessui/react'
import React from 'react'

const Toggler = ({label, name, onChange, value }) => {
  return (
    <Switch.Group>
        <div className="flex justify-between">
            <Switch.Label className="mr-4 font-nunito">{label}</Switch.Label>
            <Switch
            checked={value}
            name={name}
            onChange={onChange}
            className={`relative flex h-6 gap-0 font-nunito bg-gray-light w-20 px-0 items-center justify-center  rounded-full transition-colors focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-2`}
            >
            <span className={`${value ? 'bg-pry text-white' : 'bg-gray-light'} px-3 rounded-full`}>Yes</span>
            <span className={`${!value ? 'bg-pry text-white' : 'bg-gray-light'} px-3 rounded-full`}>No</span>
            </Switch>
        </div>
    </Switch.Group>  
  )
}

export default Toggler