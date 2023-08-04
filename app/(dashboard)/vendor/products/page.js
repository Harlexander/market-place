'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { VendorProductItem } from '@/components/Cards/ProductItem'
import EditProduct from '@/components/Modals/EditProduct'

const Index = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState(0);

    const { data, isLoading, isError, error, refetch } = useQuery("myProducts", async () => {
        const data = await getProducts(); 
        return data;
    })    

    const getProducts = async ( ) => {
     const { data } = await axios.get("/api/products");
     return data;
    }

    console.log(data, error)

  return (
    <div className='md:p-10 p-2 space-y-8'>

    {
      (data && data.length > 0) && (
      <EditProduct
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        data={data[active]}/>
      )
    }
      
      <p className='bg-pry rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
       Your Products  
      </p>      

      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 flex-wrap'>
        {
         data?.map((product, index) => (
            <>
            <VendorProductItem
            key={index}
            setIsOpen={setIsOpen}
            product={product}
            index={index}
            setActive={setActive}/>            
            </>

          ))
        }
      </div>

    </div>
  )
}

export default Index
