import AddProduct from "@/components/Forms/AddProduct"
import { prisma } from "@/lib/prismadb"

const Index = async ({params : {productId}}) => {

    const product = await prisma.product.findUnique({
        where : {
             id : productId
        }
    })

    return (
      <div className='md:p-10 p-2 space-y-8'>
          <p className='bg-pry rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
              Edit Product
          </p>      
  
          <AddProduct product={product}/>
      </div>
    )
  }
  
  export default Index