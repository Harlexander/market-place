import React from 'react'
import SectionHeader from '../Headers/SectionHeader'
import ProductItem from '../Cards/ProductItem'

const Section = ({title, products}) => {
  return (
    <div className='py-5 md:pt-20 px-2 md:px-28 bg-gray-100'>
        <SectionHeader title={title}/>

        <div className='grid md:grid-cols-6 py-5 sm:grid-cols-4 grid-cols-2 gap-2 sm:gap-1 overflow-x-auto'>
            {
                products.map(({name, slug, price, id, images}) => (
                    <ProductItem
                    key={id}
                    name={name}
                    price={price}
                    id={id}
                    slug={slug}
                    image={images[0].image}/>                    
                ))
            }
        </div>
    </div>
  )
}

export default Section