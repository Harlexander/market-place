import ProductItem from '@/components/Cards/ProductItem';
import SectionHeader from '@/components/Headers/SectionHeader'
import { Select } from '@/components/HeroPage/HeroPage';
import categories from '@/lib/categories';
import { prisma } from '@/lib/prismadb'
import React from 'react'

const Index = async ({ params : { category : id }}) => {
  const category = decodeURIComponent(id).replace(/-/g, " ");

  const products = await prisma.product.findMany({
    where : {
      category : category
    }
  });

  const { subcategories } = categories.find(item => item.category.toLowerCase() == category);

  return (
    <div className='space-y-4'>
      <SectionHeader title={decodeURIComponent(category)}/>

      <div className='w-full overflow-hidden'>
          <div className='flex gap-4 w-full overflow-x-auto'>
              {
                  subcategories.map((item, index) => (
                      <Select href={`/category/${category}/${item.replace(/ /g, "-")}`} key={index} name={item}/>
                  ))
              }
          </div>                    
      </div>

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