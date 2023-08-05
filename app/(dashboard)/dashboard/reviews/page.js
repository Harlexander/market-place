import ReviewsTable, { MenuButton, UserReviewsTable } from '@/components/Table/ReviewsTable'
import { prisma } from '@/lib/prismadb'
import { userId } from '@/lib/userId'
import { StarIcon } from '@heroicons/react/20/solid'
import moment from 'moment'


const Index = async () => {
  const id = await userId();

  const reviews = await prisma.review.findMany({
    where : {
      userId : id
    },
    select : {
      comment : true,
      rating : true,
      id : true,
      createdAt : true,
      vendor : {
        select : {
          logo : true,
          name : true,
          id : true
        }
      }
    },
    orderBy : {
      createdAt : "desc"
    }
  })


  return (
    <div>
        <div className='md:p-10 p-2 space-y-8'>
            <p className='bg-pry flex items-center justify-center gap-4 rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
            <StarIcon className='h-6 w-6'/> Your Reviews
            </p> 
            <div className="overflow-x-auto hidden md:block">
              <UserReviewsTable reviews={reviews}/>
            </div>

            <div className='space-y-4 md:hidden'>
              {
                reviews.map(({ rating, comment, createdAt, id, vendor : { name, logo, id : vendorId } }, index )=> (
                  <Review 
                  id={id}
                  name={name}
                  comment={comment}
                  rating={rating}
                  createdAt={createdAt}
                  key={index}/> 
                ))
              }
            </div>
           
        </div>
    </div>
  )
}

export const Review = ({name, createdAt, rating, comment}) => (
  <div className='bg-white rounded-lg shadow font-nunito p-4 space-y-3'>
    <div className='flex justify-between gap-5'>
      <div className='flex gap-5'>
        <img src='/user.png' className='rounded-full h-10'/>

        <div className='flex flex-col'>
          <span className='font-semibold capitalize'>{name}</span>
          <span className='text-xs'>{moment(createdAt).format("h:mm A do MM, YYYY")}</span>
        </div>
      </div>

      <MenuButton/>
    </div>

    <div className='space-y-2'>
      <div className='flex gap-2'>
          {
              Array(rating).fill("").map((item, index) => (
                  <StarIcon key={index} className='text-yellow-600 h-4'/>
              ))
          }
          {
              Array(5-rating).fill("").map((item, index) => (
                  <StarIcon key={index} className='text-gray-600 h-4'/>
              ))
          }    
      </div>

      <div className='font-nunito'>
        {comment}
      </div>
    </div>
  </div>
)

export default Index
