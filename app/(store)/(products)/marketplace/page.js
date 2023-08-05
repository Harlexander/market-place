import ProductItem from '@/components/Cards/ProductItem'
import SectionHeader from '@/components/Headers/SectionHeader'
import { prisma } from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import React from 'react'

const Index = async () => {
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
        <SectionHeader title={"Marketplace"}/>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            />
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
            <ProductItem
            name={"Iphone 12pro max wiith no face id"}
            price={"150,000"}
            image={"/image.jpg"}
            brandNew={true}/>
        </div>
    </>
  )
}

export default Index