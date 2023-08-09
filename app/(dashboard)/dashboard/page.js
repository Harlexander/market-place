import DashboardCard from '@/components/Cards/DashboardCard'
import FollowersTable from '@/components/Table/FollowersTable'
import TopProduct from '@/components/Table/TopProduct'
import Wishlist from '@/components/Table/WishlistTable'
import { prisma } from '@/lib/prismadb'
import { userId } from '@/lib/userId'
import { faChartBar, faCube, faEnvelope, faRankingStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Index = async () => {
  const id = await userId();

  const wishList = await prisma.wishlist.findMany({
    orderBy : {
      createdAt : "desc"
    },
    select : {
      id : true, 
      product : {
        select : {
          id : true,
          name : true,
          images : true,
          slug : true,
          price : true
        }
      }
    },
    take : 10
  });

  const followers = await prisma.follower.findMany({
    where : {
      followerId : id
    },
    select : {
      vendor : {
        select : {
          name : true,
          logo : true
          }
        }
      }
    });

    const following = (followers.map(({vendor}) => ({ user : { username : vendor.name, image : vendor.logo}})));

    console.log(following);

  return (
    <div className='p-5 md:p-10 space-y-8'>
      <div>
        <p className='font-montserrat font-semibold md:text-2xl'>Hello Dunkwu,</p>
        <p className='text-xs md:text-sm text-pry font-lato'>Welcome to Uniben Online Market</p>
      </div>

      <div className='grid sm:grid-cols-3 gap-2 md:gap-4'>
        <DashboardCard
        title={'Balance'}
        value="131"
        icon={<FontAwesomeIcon icon={faCube} className="text-2xl"/>}
        subtitle={"0% this week"}
        />
        <DashboardCard
        title={'Wishlist'}
        value="10"
        icon={<FontAwesomeIcon icon={faRankingStar} className="text-2xl"/>}
        subtitle={"0% Average rating 3 stars"}
        />
        <DashboardCard
        title={'Unread Messages'}
        value="131"
        icon={<FontAwesomeIcon icon={faEnvelope} className="text-2xl"/>}
        subtitle={"0% increase this week"}
        />
      </div>

      <div className='grid md:grid-cols-12 gap-4 md:gap-8'>
        <div className='space-y-3 bg-white shadow-lg p-5 rounded md:col-span-8'>
          <p className='text-pry font-montserrat font-semibold'>Saved Items</p>
          <hr/>
          <Wishlist data={wishList}/>
          <div className='text-pry text-center font-montserrat font-nunito underline'>
            View All
          </div>
        </div>

        <div className='md:col-span-4  space-y-5'>
        <div className='space-y-3 bg-white shadow-lg h-full p-5 rounded'>
          <div className='flex justify-between'>
            <p className='text-pry font-montserrat font-semibold'>Followers</p>
            <span className='text-pry font-montserrat font-semibold'>{following.length}</span>
          </div>
         
          <hr/>
          <FollowersTable data={following}/>
          
          <div className='text-pry text-center font-montserrat font-nunito underline'>
            View All
          </div>
        </div>
        {/* <div className='space-y-3 bg-white shadow-lg h-26 p-5 rounded-3xl col-span-8'>
          <p className='text-pry font-montserrat font-semibold'>Top Products</p>
          <hr/>
          <div className='text-pry text-center font-montserrat font-nunito underline'>
            View All
          </div>
        </div>           */}
        </div>

      </div>
    </div>
  )
}

export default Index