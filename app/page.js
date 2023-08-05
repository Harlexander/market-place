import Register from '@/components/Ads/Register';
import CategoryCard from '@/components/Cards/category';
import HeroPage from '@/components/HeroPage/HeroPage';
import Navbar from '@/components/Navbar/navbar';
import Section from '@/components/Product/Section';
import { authOptions } from '@/lib/authOptions';
import categories from '@/lib/categories';
import { prisma } from '@/lib/prismadb';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const latestProducts = await prisma.product.findMany({
    orderBy : {
      createdAt : "desc"
    },
    select : {
      name : true,
      price : true,
      slug : true,
      id : true,
      images : true
    },
    take : 12
  });

  const topProducts = await prisma.product.findMany({
    orderBy : {
      views : "desc"
    },
    select : {
      name : true,
      price : true,
      slug : true,
      id : true,
      images : true
    },
    take : 12
  });
  return (
    <>
      <Navbar user={session?.user}/>
      <main className=''>
        <HeroPage/>

        <section className='md:space-y-10 py-5 md:py-20 px-2 md:px-28 bg-gray-100'>
          {/* <Header subtitle={"FIND WHAT YOU'RE AFTER"} title={"Browse Popular Categories"}/> */}

          <div className='grid md:grid-cols-5 gap-2 grid-cols-2 md:gap-5'>
            {categories.map(category => (
              <CategoryCard 
                key={category.category}
                img={`/images/${category.category}.png`}
                category={category.category}
                items={category.subcategories.slice(0, 4).join(', ')}
              />
            ))}
          </div>
        </section>

        <Register/>

        <Section
        title={"Top Products"}
        products={topProducts}/>

        <Section
        title={"Latest Products"}
        products={latestProducts}/>


      </main>
    </>
  )
}
