import CategoryList from '@/components/Cards/CategoryList'
import React from 'react'

const Index = ({children}) => {
  return (
    <section className='grid md:grid-cols-12 relative gap-5 px-4 md:px-10'>
    <aside className='col-span-3 bg-white hidden md:block'>
        <CategoryList/>
    </aside>
    <main className='col-span-9 space-y-4 rmd:space-y-8'>
        {children}
    </main>
</section>
  )
}

export default Index