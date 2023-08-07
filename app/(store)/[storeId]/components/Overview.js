"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrip, faList, faSpinner} from '@fortawesome/free-solid-svg-icons'
import {  ClockIcon, EnvelopeIcon, MinusCircleIcon, PlusCircleIcon, StarIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState, useTransition } from 'react'
import ProductItem from '@/components/Cards/ProductItem'
import { useMutation, useQuery } from 'react-query'
import moment from 'moment/moment'
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { revalidate } from '@/lib/revalidate'
import { ScaleLoader } from 'react-spinners'
import { followUser, newReview } from '@/lib/fetcher'
import { Tab } from '@headlessui/react'

const Overview = ({ vendor, user}) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const addReview = useMutation(async reviewData => await newReview(reviewData), { onSuccess : () => revalidate(startTransition, router)});
    
    const follow = useMutation(async followerData => await followUser(followerData), { onSuccess : () => revalidate(startTransition, router)});
    
    const action = (status = "follow") => {
            follow.mutate({vendorId : vendor.id, status : status, followId : vendor.follower[0]?.id})            
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
            action={action} 
            status={follow.isLoading}
            following={user && (vendor.follower[0] != null)} 
            followers={vendor._count.follower}
            user={user}
            />

        <div className='hidden md:block'>
            <Reviews 
                addReview={addReview} 
                id={vendor.id} 
                user={user?.id}
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
            <Tabs
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
                <p className='font-lato font-bold text-xl capitalize'>{brandName}</p>

                </div>
                <p className='font-nunito'>{description || `At ${brandName}, we are committed to excellence. Offering top-quality products and services tailored to your needs. Your satisfaction is our priority. Experience the best with us!`}</p>
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

const Followers = ({followers, action, following, user, status}) => {
    let type = following ? "unfollow" : "follow";

    return(
        <div className='bg-white p-5 space-y-3'>
           <div className='flex justify-between items-center'>
            <p className='font-bold font-lato'>Followers</p>
            <p className='font-montserrat font-bold text-pry'>{followers}</p>
           </div>
    
           <button onClick={() => { user ? action(type) : (alert("Sign In First"))}} className='bg-yellow-300 capitalize font-nunito py-2 w-full'>
            {
                status ? (<ScaleLoader height={16}/>) : (type)
            }
           </button>
        </div>
    )
}

const Reviews = ({addReview, user, businessReview, id}) => {    
    const [comment, setComment] = useState("");
    const [count, setCount] = useState(1);

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
        <div className='bg-white space-y-3 sm:p-5 p-2'>
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
            <div className='bg-pry text-white rounded-xl sm:rounded-0  px-4 py-3 flex justify-between items-center'>
                <div className='flex gap-3'>
                    <FontAwesomeIcon icon={faGrip} className="text-xl text-white"/>
                    <FontAwesomeIcon icon={faList} className="text-xl text-white"/>
                </div>
                <div className='flex font-nunito gap-3 text-sm'>
                    <p>Sort by:</p>
                    <select className='bg-transparent'>
                        <option className='text-black py-2'>Recommended</option>
                        <option className='text-black py-2'>Newest Product</option>
                        <option className='text-black py-2'>Oldest Product</option>
                        <option className='text-black py-2'>Lowest Prices</option>
                    </select>
                </div>
            </div>
    
            <div className='grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 py-5 sm:px-5'>
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Tabs = ({products, brandUid, businessReview, addReview }) => (
    <div className="w-full max-w-md px-2 py-4 sm:px-0 font-nunito">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-pry-200 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-pry-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-pry-400 focus:outline-none',
                  selected
                    ? 'bg-white shadow'
                    : 'text-pry-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Products
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-pry-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-pry-400 focus:outline-none',
                  selected
                    ? 'bg-white shadow'
                    : 'text-pry-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              Reviews
            </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-pry-400 focus:outline-none'
              )}
            >
            <Products 
                products={products}/>
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-pry-400 focus:outline-none'
              )}
            >
            <Reviews 
            businessReview={businessReview}
            brandUid={brandUid}
            addReview={addReview}/>
            </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
)

const Badge = ({content, color}) => (
    <span class={`text-xs inline-block flex gap-3 items-center py-1 px-4 md:px-4 font-nunito leading-none text-center whitespace-nowrap align-baseline  ${color} rounded-full`}>{content}</span>
)

export default Overview