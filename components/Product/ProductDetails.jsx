"use client"

import { ClockIcon } from "@heroicons/react/24/solid"
import { Badge } from "./Badge"
import { Description } from "./Description"
import { Features } from "./Features"
import moment from "moment"
import { useRouter } from "next/navigation"
import { useProductHighlight } from "@/hooks/useProductHighlight"

export const ProductDetails = ({data, vendorId, isVendor}) => {
    const router = useRouter();
    const  { setProductId } = useProductHighlight();

    console.log(isVendor);

    const chatVendor = async () => {
      const product = { productId : data.id, productName : data.name, productPrice : data.price, productImage : data.images[0].image}
      await setProductId(product);

      router.push(`/${isVendor === "BUYER" ? "dashboard" : "vendor"}/messages/${vendorId}`)
    }

    return(
        <div className='col-span-3 space-y-4 md:px-8'>
            <p className='font-lato text-3xl font-semibold capitalize'>{data.name}</p>
            <div className='flex gap-4 items-center'>
                {<Badge content={data.brand_new ? "Brand New" : "Used"} color={"bg-pry"}/>}
                {data.pre_order && <Badge content={"Pre-order"} color={"bg-pry"}/>}
                {data.negotiable && <Badge content={"Negotiable"} color={"bg-pry"}/>}
            </div>
            <div className='font-nunito flex items-center gap-4'>
                <ClockIcon className='h-5 text-pry'/>
                <span>Uploaded {moment(data.createdAt).subtract(1, "calender").fromNow()}</span>
            </div>
            <Description description={data.description}/>
            <div className='flex gap-4 justify-between'>
                <button onClick={chatVendor} className='py-2 border text-pry border-pry font-nunito w-full rounded-lg'>
                    Chat with Vendor
                </button>                
                <a className="w-full" href={`tel:${data.business.vendor.mobile}`}>
                    <button className='py-2 bg-pry text-white font-nunito w-full rounded-lg'>
                        Contact Seller
                    </button>                    
                </a>

            </div>
            <Features features={data.features}/>
        </div>
    )
}