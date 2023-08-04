"use client"

import { productImage } from "@/lib/imagePath"
import { HeartIcon } from "@heroicons/react/24/solid"
import axios from "axios"
import { useMutation } from "react-query"
import { ScaleLoader } from "react-spinners"

export const Images = ({data}) => {
    const wishList = useMutation(async productId => {
        const { data } = await axios.post("/api/products/wishlist", { productId : productId })
        return data;
     })

    return(
        <div className='md:col-span-2'>
            <div id="carouselExampleIndicators" className="carousel slide relative" data-bs-ride="carousel">
            <div className="carousel-inner relative w-full overflow-hidden">
            {
                data.images.map(({image}, index) => (
                    <div key={index} className={`carousel-item float-left w-full ${index == 0 && "active"}`}>
                        <img
                            src={productImage+image}
                            className="block w-full"
                            alt="product"
                        />
                    </div>
                ))
            }
            </div>
            <button
                className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
        <div className='flex block flex-wrap justify-start gap-3 py-5'>
            {
                data.images.map(({image}, index) => (
                    <img src={productImage+image} key={index} className="h-10 w-10"/>
                ))
            }
        </div>

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