"use client"
import VendorTab from '@/components/Tabs/VendorTab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrip, faList, faSpinner} from '@fortawesome/free-solid-svg-icons'
import { ChevronRightIcon, ClockIcon, EnvelopeIcon, MinusCircleIcon, PlusCircleIcon, StarIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState, useTransition } from 'react'
import ProductItem from '@/components/Cards/ProductItem'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import moment from 'moment/moment'
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { revalidate } from '@/lib/revalidate'

const Overview = ({ vendor, user}) => {
    const [following, setFollowing] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const addReview = useMutation(async reviewData => {
        const res = await axios.post("/api/reviews", reviewData)
        return res.data;
    }, { onSuccess : () => revalidate(startTransition, router)});
    
    const follow = useMutation(async followerData => {
       const res = await axios.post("/api/follower", followerData)
        return res.data;
    }, { onSuccess : () => revalidate(startTransition, router)});

    const unfollow = useMutation(async followerData => {
        const res = await axios.delete("/api/follower/follow", { data : followerData, headers : { authorization : token }})
        return res.data;
    }, {
        onSuccess: () => {
            vendor.refetch();
        }
    });
    
    const followVendor = () => {
            follow.mutate({vendorId : vendor.id})            
    }
    const unfollowVendor = () => {
            unfollow.mutate(data)            
    }

  return (
    <>
    <div className='col-span-4 space-y-4'>
        <Vendor 
            brandName={vendor.name}
            description={vendor.description}
            type={vendor.type}
            createdAt={ moment(vendor.createdAt).subtract(1, 'calender').fromNow()}
        />
        <Address 
            businessLocation={vendor.businessLocation}
        />
        <Followers 
            followVendor={followVendor} 
            unfollowVendor={unfollowVendor}
            following={vendor.follower[0]} 
            followers={vendor._count.follower}
            user={user}
            />

        <div className='hidden md:block'>
            <Reviews 
                addReview={addReview} 
                id={vendor.id} 
                user={user.id}
                businessReview={[...vendor.reviews].reverse()}
            />      
        </div>
    </div>

        <div className='col-span-8 hidden md:block'>
            <Products 
                products={vendor.products}
            />
        </div>   
        <div className='md:hidden'>
            <Tab 
                products={vendor.products} 
                addReview={addReview} 
                brandUid={vendor.uid} 
                businessReview={[...vendor.reviews].reverse()}
            />
        </div>              
    </>
  )
}


const Vendor = ({brandName, description, createdAt, type}) => (
    <div className='bg-white p-5 space-y-5'>
        <div className='grid grid-cols-12'>
            <div className='col-span-4'>
               <img src='user.jpg'/>
            </div>
            <div className='col-span-8 space-y-2'>
                <div>
                <p className='font-lato font-bold text-lg capitalize'>{brandName}</p>

                </div>
                <p className='font-nunito'>{description}</p>
            </div>
        </div>

        <div className='flex justify-between text-pry'>
            <Badge
            content={<><ClockIcon className="h-5"/><span>{createdAt}</span></>}
            color={"bg-gray-200"}/>
            <Badge
            content={<><BuildingStorefrontIcon className="h-5"/><span>{type}</span></>}
            color={"bg-gray-200"}/>
        </div>
    </div>
)

const Address = ({businessLocation}) => (
    <div className='bg-white space-y-3 p-5'>
        <p className='font-bold font-lato'>Store Address</p>

        <p className='font-nunito'>{businessLocation || " No address available."}</p>
    </div>
)

const Followers = ({followers, followVendor, following, unfollowVendor, user}) => {
    return(
        <div className='bg-white p-5 space-y-3'>
           <div className='flex justify-between items-center'>
            <p className='font-bold font-lato'>Followers</p>
            <p className='font-montserrat font-bold text-pry'>{followers}</p>
           </div>
    
           <button onClick={() => { user ? ( following ? unfollowVendor() : followVendor() ) : (alert("Sign In First"))}} className='bg-yellow-300 font-nunito py-2 w-full'>
            {following ? "Unfollow" : "Follow"}
           </button>
        </div>
    )
}

const Reviews = ({addReview, user, businessReview, id}) => {    
    const [comment, setComment] = useState("");
    const [count, setCount] = useState(0);

    const incrementCount = () => {
      if (count < 5) {
        setCount(count + 1);
      }
    };
  
    const decrementCount = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };

    const reviewData = {
        vendorId : id,
        userId :  user,
        rating : count,
        comment : comment,
    }

    return (
        <div className='bg-white space-y-3 p-5'>
            <p className='font-bold font-lato hidden md:block'> Reviews</p>
    
    
            <div className='space-y-3'>
                {
                    businessReview.map((review, index) => (
                            index < 4 && (
                                <div key={index}>
                                    <ReviewContainer review={review}/>
                                    <hr/>
                                </div>                                
                            )
                    ))
                }
            </div>
    
            <form onSubmit={(e) => {e.preventDefault(); user ? addReview.mutate(reviewData) : alert("Sign In first")}}>
                <textarea 
                className='bg-pry-200 w-full' required onChange={(e) => setComment(e.target.value)} rows={6}/>
    
                <div className='flex py-2 font-nunito items-center justify-between'>
                    <p>Num of rating</p>
                    <div className='flex gap-3 items-center'>
                        <span onClick={decrementCount}><MinusCircleIcon className='h-6 text-yellow-400 bg-black rounded-full'/></span>
                        <p className='text-xl'>{count}</p>
                        <span onClick={incrementCount}><PlusCircleIcon className='h-6 text-yellow-400 bg-black rounded-full'/></span>
                    </div>
                </div>
    
                <button disabled={addReview.isLoading} className='py-2 font-montserrat my-2 w-full bg-yellow-400'>
                    {
                        addReview.isLoading ? <FontAwesomeIcon icon={faSpinner} spin className="text-lg"/> : "Comment"
                    }
                </button>
            </form>
        </div>
    )
}

const ReviewContainer = ({review}) => (
    <div className='space-y-4'>
        <div>
            <p className='font-lato font-semibold mb-1'>{review.user.username}</p>
            <div className='flex items-center gap-1'>
                {
                    Array(review.rating).fill("10").map((star, index) => (
                        <StarIcon key={index} className='h-4 text-yellow-400'/>
                    ))
                }
                {
                    Array(5-review.rating).fill("10").map((star, index) => (
                        <StarIcon key={index} className='h-4 text-gray-400'/>
                    ))
                }
            </div>            
        </div>

        
        <p className='font-italic font-nunito'>
        {review.comment}
        </p>
        <span className='text-xs font-nunito'>{moment(review.createdAt).subtract(1, "calender").fromNow()}</span>
    </div>
)

const Products = ({products}) => {
    return ( 
        <div className='bg-white h-full'>
            <div className='bg-pry text-white  px-4 py-3 flex justify-between items-center'>
                <div className='flex gap-3'>
                    <FontAwesomeIcon icon={faGrip} className="text-xl text-white"/>
                    <FontAwesomeIcon icon={faList} className="text-xl text-white"/>
                </div>
                <div className='flex font-lato gap-3 text-sm'>
                    <p>Sort by:</p>
                    <select className='bg-transparent'>
                        <option className='text-black py-2'>Recommended</option>
                        <option className='text-black py-2'>Newest Product</option>
                        <option className='text-black py-2'>Oldest Product</option>
                        <option className='text-black py-2'>Lowest Prices</option>
                    </select>
                </div>
            </div>
    
            <div className='grid grid-cols-2 md:grid-cols-4 gap-5 py-5 px-5'>
                {
                    products.map(({name, price, images, id, slug}, index) => (
                        <ProductItem
                        name={name}
                        key={index}
                        price={price}
                        slug={slug}
                        image={images[0].image}
                        id={id}/>                    
                    ))
                }
            </div>
        </div>
    )
    
}
const Tab = ({products, brandUid, businessReview, addReview }) => (
    <div>
        <VendorTab
        products={
        <Products 
            products={products}
        />}

        reviews={
        <Reviews 
            businessReview={businessReview}
            brandUid={brandUid}
            addReview={addReview}/>
        }
        />
    </div>
)

const Badge = ({content, color}) => (
    <span class={`text-xs inline-block flex gap-3 items-center py-1 px-2 md:px-4 font-nunito leading-none text-center whitespace-nowrap align-baseline  ${color} rounded-full`}>{content}</span>
)

export default Overview