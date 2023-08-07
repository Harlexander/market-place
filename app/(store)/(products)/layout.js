"use client"
import Breadcrumb from '@/components/Breadcrumb Menu/Breadcrumb'
import CategoryList from '@/components/Cards/CategoryList'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

function getCategoryArray(url) {
  const categories = url.split('/').filter(item => item !== ''); // Split the URL and remove empty items

  const categoryArray = [];
  let href = '';
  categories.forEach((category, index) => {
    href += `/${category}`;
    if (index !== 0) {
      // Exclude the first item (category 'category')
      categoryArray.push({ title: category.replace('-', ' '), href });
    }
  });

  return categoryArray;
}

const Index = ({children}) => {
  const paths = usePathname();

  const path = [{
    title : "Home",
    href : "/"
  }, ...getCategoryArray(paths)];

  return (
    <>
      <Breadcrumb items={path}/>
      <section className='grid md:grid-cols-12 relative gap-5 px-4 md:px-10'>
        <aside className='col-span-3 bg-transaparent relative hidden md:block'>
            <CategoryList/>
        </aside>
        <main className='col-span-9 space-y-4 rmd:space-y-8'>
            {children}
        </main>
    </section>    
    </>

  )
}

export default Index