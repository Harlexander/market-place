import { prisma } from "@/lib/prismadb"
import Overview from "./components/Overview"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"
import Breadcrumb from "@/components/Breadcrumb Menu/Breadcrumb"

const Index = async ({ params : { storeId }}) => {
    const session = await getServerSession(authOptions);

    const vendor = await prisma.business.findUnique({
        where : {
            slug : storeId.toLowerCase()
        },
        include : {
            vendor : {
                select : {
                    mobile : true
                }
            },
            products : {
                select : {
                    images : true,
                    name : true,
                    price : true,
                    id : true,
                    slug : true
                }
            },
            reviews : {
                include : {
                    user : {
                        select : {
                            username : true,
                            image : true
                        }
                    }                    
                }
            },
            follower : {
                where : {
                    followerId : session?.user.id,
                }
            },
            _count : {
                select : {
                    follower : true
                }
            }
            
        }
    })

    const path = [
        {
            title : "Home",
            href : "/"
        },
        {
            title : vendor.name,
            href : `/${vendor.slug}`
        }
    ]
    return (
        <>
            <Breadcrumb items={path}/>
            <div className='md:px-10 md:grid gap-5 md:grid-cols-12 '>
                <Overview vendor={vendor} user={session?.user}/>
            </div>        
        </>

    )
}

export default Index