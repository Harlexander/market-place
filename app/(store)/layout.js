import Breadcrumb from "@/components/Breadcrumb Menu/Breadcrumb"
import PagesNavbar from "@/components/Navbar/PagesNavbar"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth"

const Index = async ({children}) => {
  const session = await getServerSession(authOptions);
  return (
    <div className='bg-gray-100 min-h-screen'>
        <PagesNavbar user={session?.user}/>

        { children }
    </div>
  )
}

export default Index