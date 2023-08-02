"use client"

import CategoryCard from '@/components/Cards/category';
import Header from '@/components/Headers/Header';
import HeroPage from '@/components/HeroPage/HeroPage';
import SearchInput from '@/components/Input/searchInput';
import Navbar from '@/components/Navbar/navbar';
import categories from '@/lib/categories';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data : user , status } = useSession();
  console.log(user, status);

  return (
    <>
      <Navbar user={user?.user}/>
      <main className='min-h-screen'>
        <HeroPage/>

        <section className='md:space-y-10 py-5 md:py-20 px-2 md:px-28 bg-[#FBFBFB]'>
          <Header subtitle={"FIND WHAT YOU'RE AFTER"} title={"Browse Popular Categories"}/>

          <div className='grid md:grid-cols-4  grid-cols-2 gap-3 md:gap-5'>
            {categories.map(category => (
              <CategoryCard 
                key={category.category}
                img={`/images/${category.category}.png`}
                category={category.category}
                items={category.subcategories.slice(0, 5).join(', ')}
              />
            ))}
          </div>
        </section>
        <section className='md:px-28 px-5  py-10'> 
          <div className='bg-pry space-y-10 text-white text-center p-5 md:p-20 rounded-xl'>
            <div>
              <p className='md:text-2xl text-xl font-curve'>Become A Vendor On Uniben Online Market</p>
              <p className='text-xs font-nunito'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod </p>
            </div>

            <SearchInput
            onChange={(e) => console.log(e)}
            buttonText={'Proceed'}
            onClick={() => console.log("clicked")}/>
           </div>
        </section>

      </main>
    </>
  )
}
