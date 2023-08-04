import ReviewsTable, { UserReviewsTable } from '@/components/Table/ReviewsTable'
import { prisma } from '@/lib/prismadb'
import { userId } from '@/lib/userId'
import { StarIcon } from '@heroicons/react/20/solid'


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
            <div className="overflow-x-auto">
              <UserReviewsTable reviews={reviews}/>
            </div>
        </div>
    </div>
  )
}

export default Index
