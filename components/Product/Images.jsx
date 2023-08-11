"use client"

import { useImageModal } from "@/hooks/useImageModal"
import { productImage } from "@/lib/imagePath"
import { HeartIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import { useMutation } from "react-query"
import { Carousel } from "react-responsive-carousel"
import { ScaleLoader } from "react-spinners"

export const Images = ({data}) => {
    const wishList = useMutation(async productId => {
        const { data } = await axios.post("/api/products/wishlist", { productId : productId })
        return data;
     })

     const {toggleModal} = useImageModal()

    return(
        <div className='md:col-span-2'>
            <Carousel showArrows={true} >
            {
                data.images.map(({image}, index) => (
                    <div key={index} onClick={() => toggleModal(productImage+image)} className={`w-full`}>
                        <img
                            src={productImage+image}
                            className="block w-full"
                            alt="product"
                        />
                    </div>
                ))
            }
            </Carousel>
        <div className='py-2'>
            <button onClick={() => wishList.mutate(data.id)} className='text-pry py-2 font-nunito px-3 bg-opacity-20 hidden bg-pry-200 rounded sm:flex items-center gap-4'>
                <HeartIcon className='h-6 w-6'/>
                {
                    wishList.isLoading && (<ScaleLoader height={16} className="text-pry"/>)
                }
                {
                    wishList.isIdle && (
                        <>
                         Add to wishlist
                        </>
                    )
                }
                {
                    wishList.isSuccess && (wishList.data)
                }
            </button>
        </div>
        </div>
    )
}