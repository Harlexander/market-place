'use client'
import AddProduct from "@/components/Forms/AddProduct"

const Index = () => {
    return (
      <div className='md:p-10 p-2 space-y-8'>
          <p className='bg-pry rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
              Add Products
          </p>      
  
          <AddProduct/>
      </div>
    )
  }
  
  export default Index