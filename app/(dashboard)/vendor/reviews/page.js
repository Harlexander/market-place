import ReviewsTable from '@/components/Table/ReviewsTable'
import { prisma } from '@/lib/prismadb'
import { userId } from '@/lib/userId'
import { StarIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { CheckBadgeIcon, ClipboardDocumentIcon, ClockIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import moment from 'moment/moment'
import { Review } from '../../dashboard/reviews/page'

const Index = async () => {
  const id = await userId();
  
  const { store : { id : businessId }} = await prisma.user.findUnique({
    where : {
      id : id
    },
    select : {
      store : {
        select : {
          id : true
        }
      }
    }
  });

  const reviews = await prisma.review.findMany({
    where : {
      vendorId : businessId
    },
    select : {
      comment : true,
      rating : true,
      id : true,
      createdAt : true,
      user : {
        select : {
          image : true,
          username : true,
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
              <ReviewsTable reviews={reviews}/>
            </div>

            <div className='space-y-4 md:hidden'>
              {
                reviews.map(({ rating, comment, createdAt, id, user : { username, logo, id : vendorId } }, index )=> (
                  <Review 
                  id={id}
                  name={username}
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

export default Index
