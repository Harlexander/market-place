import { UserCircleIcon } from '@heroicons/react/20/solid'
import { CheckBadgeIcon, ClipboardDocumentIcon, ClockIcon } from '@heroicons/react/24/outline'
import moment from 'moment/moment'
import { EditProfileModal } from '@/components/Modals/EditProfile'
import EditButton from '@/components/Profile/EditButton'
import { userId } from '@/lib/userId'
import { prisma } from '@/lib/prismadb'

const Index = async () => {
  const id = await userId();

  const user = await prisma.user.findUnique({
    where : {
      id : id
    },
    include : {
      store : true
    }
  })

  return (
    <div>
        <div className='md:p-10 p-2 space-y-8'>
        <p className='bg-pry flex items-center justify-center gap-4 rounded-t-lg text-center py-2 text-white font-montserrat text-xl'>
         <UserCircleIcon className='h-6 w-6'/>  My  Profile
        </p> 

        <EditProfileModal user={user}/>

        <ProfileContainer user={user}/>

        <div className="flex justify-center">
            <ul className="bg-white w-full font-montserrat rounded-lg border border-gray-200 text-gray-900">
              <li className="px-6 py-4 border-b flex items-center gap-4 border-gray-200 w-full rounded-t-lg bg-pry-600 text-white">
                <UserCircleIcon className='h-6 w-6'/> Personal Information
              </li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Name:</span><input disabled className='text-right py-2' defaultValue={user?.firstName + " " + user?.lastName}/></li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Email:</span><input disabled className='text-right py-2' defaultValue={user?.email}/></li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Mobile:</span><input disabled className='text-right py-2' defaultValue={user?.mobile}/></li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>ID:</span><input disabled className='text-right py-2' defaultValue={user?.id}/></li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Location:</span><input disabled className='text-right py-2' defaultValue={user?.residential_address}/></li>
              <EditButton type={"personal"}/>
            </ul>
          </div>

        <div className="flex justify-center">
            <ul className="bg-white w-full font-montserrat rounded-lg border border-gray-200 text-gray-900">
              <li className="px-6 py-4 border-b flex items-center gap-4 border-gray-200 w-full rounded-t-lg bg-pry-600 text-white">
              <ClipboardDocumentIcon className='h-6 w-6'/> Business Information
              </li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Brand Name:</span><input disabled className='text-right py-2' defaultValue={user?.store?.name}/></li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Slug:</span><input disabled className='text-right py-2' defaultValue={user?.store?.slug}/></li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Business Type:</span><input disabled className='text-right py-2' defaultValue={user?.store?.type}/></li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Location:</span><input disabled className='text-right py-2' defaultValue={user?.store?.location}/></li>
              <li className="px-6 py-4 flex justify-between items-center border-b border-gray-200 w-full"><span>Description:</span><textarea disabled rows={3} className='text-right h-full' defaultValue={user?.store?.description}/></li>
              <EditButton type={"business"}/>
            </ul>
          </div> 
    </div> 
    </div>

  )
}

const ProfileContainer = ({user}) => {
  return(
    <div className='bg-white rounded-xl p-8 grid md:grid-cols-12'>
      <div className='md:p-8 p-2 col-span-3'>
        <img src={user?.image ? user.image : "/user.png"} className='sm:h-full w-full'/>
      </div>

      <div className='col-span-9 font-montserrat space-y-5'>
        <p className='text-2xl md:text-4xl font-semibold'>{user?.store?.name}</p>
      
        <div className='flex justify-start gap-5'>
          <p className='flex items-center text-sm md:text-md gap-3'><ClockIcon className='h-6 w-6 text-pry'/> <span>Joined {moment(user?.createdAt).format("Do, MMMM YYYY")}</span></p>
          <p className='flex items-center text-sm md:text-md gap-3'><CheckBadgeIcon className='h-6 w-6 text-pry'/> {user?.email_verified ? "Email Verified" : "Email Unverified"}</p>
        </div>
        
        <div className='space-y-3'>
          <p className='font-semibold'>Description</p>

          <p>{user?.store?.description}</p>
        </div>
      </div>
    </div>
  )
}



export default Index
