import { getServerSession } from 'next-auth';
import { redirect, useParams,useRouter } from 'next/navigation'

async function getData(){
    //setIsLoading(true)
    await new Promise(resolve=>setTimeout(resolve,2000))
   const res = await fetch(`http://localhost:5000/catalog/${props.id}/${params.catalog_id}`,{
    next: {
        revalidate: 0
      }
    })
    res.json()
}

async function getProducts(){
   const res = await fetch(`http://localhost:5000/products/${params.catalog_id}`,{
        next: {
            revalidate: 0
          }
    })
    res.json()
}

export default async function CatalogCreator(){
    const params = useParams()
    const router = useRouter()


    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/api/auth/signin')
      }



    return(


    )
}