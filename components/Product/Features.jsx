import { ChevronRightIcon } from "@heroicons/react/24/solid";

export const Features = ({features}) => (
    <div className='space-y-3'>
        <p className='font-semibold text-lg font-montserrat'>Key Features</p>
        <ul className='font-nunito space-y-1'>
            {
                features.map(({feature}, index) => (
                    <li className='flex items-center gap-4 text-sm' key={index}>
                        <span className=''>
                            <ChevronRightIcon className='h-4'/>
                        </span>
                        <span className='text-sm'>
                            {feature}
                        </span>
                    </li>
                ))
            }
         </ul>
    </div>
)