import Breadcrumb from "@/components/Breadcrumb Menu/Breadcrumb"
import PagesNavbar from "@/components/Navbar/PagesNavbar"

const Index = ({children}) => {
  return (
    <div className='bg-gray-100 min-h-screen w-full space-y-3 md:space-y-4'>
        <PagesNavbar/>

        <Breadcrumb
        items={[
            {
                title : "Home",
                href : "/"
            }
        ]}/>

        { children }
    </div>
  )
}

export default Index