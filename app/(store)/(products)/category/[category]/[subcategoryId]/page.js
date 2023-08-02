import ProductItem from '@/components/Cards/ProductItem';
import SectionHeader from '@/components/Headers/SectionHeader'
import { Select } from '@/components/HeroPage/HeroPage';
import { prisma } from '@/lib/prismadb'
import React from 'react'

const Index = async ({ params : { subcategoryId : id }}) => {
  const subCategory = decodeURIComponent(id).replace(/-/g, " ");

  const products = await prisma.product.findMany({
    where : {
      subcategory : subCategory
    }
  });

  return (
    <div className='space-y-4'>
      <SectionHeader title={subCategory}/>

      <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
                {
                  products.map(({name, price, images, id, brand_new, slug}, index) => (
                        <ProductItem
                        key={index}
                        brandNew={brand_new}
                        name={name}
                        price={price}
                        image={images[0].image}
                        slug={slug}
                        id={id}/>                    
                    ))
                }
                </div>
    </div>
  )
}

export default Index