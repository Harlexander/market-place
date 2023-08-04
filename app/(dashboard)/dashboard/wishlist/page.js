import ProductItem, { VendorProductItem } from '@/components/Cards/ProductItem'
import { prisma } from '@/lib/prismadb';
import { userId } from '@/lib/userId'

const Index = async () => {

  const id = await userId();

  const products = await prisma.wishlist.findMany({
    where: {
      userId : id
    },
    select : {
      product : {
        select : {
          images : true,
          name : true,
          price : true,
          id : true,
          slug : true
        }
      }
    }
  })

  const removeItem = async (e) => {
    'use server'
     e.stopPropagation();
  }

  return (
    <div className='md:p-10 p-2 space-y-8'>
      
      <p className='bg-pry rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
       My Wishlist  
      </p>      

      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 flex-wrap'>
        {
         products.map(({product : { name, price, slug, id, images}}, index) => (
            <>
            <ProductItem
            key={index}
            name={name}
            price={price}
            slug={slug}
            id={id}
            image={images[0].image}
            wishlist={true}
            removeItem={removeItem}/>            
            </>

          ))
        }
      </div>

    </div>
  )
}

export default Index
