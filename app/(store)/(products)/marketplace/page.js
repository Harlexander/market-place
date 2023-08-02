import CategoryList from '@/components/Cards/CategoryList'
import ProductItem from '@/components/Cards/ProductItem'
import SectionHeader from '@/components/Headers/SectionHeader'
import React from 'react'

const Index = () => {
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