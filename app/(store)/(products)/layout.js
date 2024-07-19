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
      <section className='sm:grid sm:grid-cols-12 gap-5 px-4 md:px-10'>
        <aside className='col-1 sm:col-span-3 bg-transaparent hidden md:block'>
            <CategoryList/>
        </aside>
        <main className='col-1 sm:col-span-9 space-y-4 md:space-y-8'>
            {children}
        </main>
    </section>    
    </>

  )
}

export default Index