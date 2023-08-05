import Breadcrumb from '@/components/Breadcrumb Menu/Breadcrumb';
import ProductItem from '@/components/Cards/ProductItem';
import VendorWindow from '@/components/Cards/VendorWindow'
import { Images } from '@/components/Product/Images';
import { ProductDetails } from '@/components/Product/ProductDetails';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prismadb'
import { getServerSession } from 'next-auth';

const Index = async ({ params : { productId : id } }) => {
  const productId = id.split("-").pop();
  const session = await getServerSession(authOptions)

  const data = await prisma.product.findUnique({
    where : {
        id : productId
    },
    include : {
        business : {
            select : {
                name : true,
                id : true,
                logo : true,
                description : true,
                slug : true,
                vendor : {
                    select : {
                        mobile : true,
                        id : true
                    }
                }
            }
        }
    }
  })

  const similarProducts = await prisma.product.findMany({
    where : {
        category : data.category
    },
    select : {
        name : true,
        price : true,
        slug : true,
        id : true,
        images : true
    }
  })

  const vendorProducts = await prisma.product.findMany({
    where : {
        businessId : data.businessId
    },
    select : {
        name : true,
        price : true,
        slug : true,
        id : true,
        images : true
    }
  })
  const path = [
    {
        title : "Home",
        href : "/"
    },
    {
        title : data.category,
        href : `/category/${data.category.replace(/ /g, "-")}`
    },
    {
        title : data.subcategory,
        href : `/category/${data.subcategory.replace(/ /g, "-")}`
    },
    {
        title : data.slug,
        href : "#"
    },
  ]

  return (
    <>
        <Breadcrumb items={path}/>
        <div className="sm:space-y-12">
            <div className='md:px-10 md:grid gap-5 md:grid-cols-12 '>
                <div className='col-span-9 bg-white p-5 md:grid md:grid-cols-5'>
                    <>
                    <Images wishList={{}} data={data}/>
                    <ProductDetails isVendor={session?.user.role} data={data} vendorId={data?.business.vendor.id}/>
                    </>
                </div>
                <div className='col-span-3 sticky py-8 md:py-0'>
                    <VendorWindow data={data.business}/>
                </div> 
            </div>

            <section className='md:px-10 px-2 bg-white py-5 space-y-5'>
                <div className='sm:rounded-t-lg shadow bg-pry px-4  py-1 md:py-2'>
                    <p className='font-montserrat text-sm md:text-lg font-semibold text-white'>Similar Products</p>
                </div>

                <div className='flex gap-4 overflow-x-auto pt-2 pb-4'>
                    {
                        similarProducts.map((item, index) => (
                            <div className='flex-shrink-0'>
                                <ProductItem
                                    key={index}
                                    slug={item.slug}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    image={item.images[0].image}
                                    />
                            </div>

                        ))
                    }
                </div>

            </section>
            
            <section className='md:px-10 px-2 bg-white  py-5 space-y-5'>
                    <div className='sm:rounded-t-lg shadow bg-pry px-4  py-1 md:py-2'>
                        <p className='font-montserrat text-sm md:text-lg font-semibold text-white'>Vendor Products</p>
                    </div>

                        <div className='flex gap-4 overflow-x-auto pt-2 pb-4'>
                        {
                                vendorProducts.map((item, index) => (
                                    <div className='flex-shrink-0'>
                                        <ProductItem
                                            key={index}
                                            id={item.id}
                                            slug={item.slug}
                                            name={item.name}
                                            price={item.price}
                                            image={item.images[0].image}
                                            />
                                    </div>

                                ))
                            }
                        </div>

            </section>
        </div>    
    </>

  )
}

export default Index