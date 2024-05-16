import Link from 'next/link';
import { BeakerIcon,PlusIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
//import Catalog_creator from '@/app/components/catalog_creator';
import { Suspense } from "react";
import Loading1 from '@/app/components/loading';
import { redirect, useSearchParams,useRouter } from 'next/navigation'
import HomeComponent from '@/app/components/home';
import { checkPayment } from '@/app/components/check_payment';
import { number } from 'yup';
import CatalogCreatorStructure from '@/app/components/catalog_creator_structure';
import Layout from '@/app/components/layout';
import LayoutServer from '@/app/layout_server/page';


interface productProps {
  id:number,
  product_name:string,
  product_description:string,
  product_price:number,
  product_qty:number,
  unique_id:string,
  product_image:string,
  video_thumbnail:string
}

interface Data {
  id_number:string,
  default_catalog:string

}


//checkPayment()

// async function getData(id:number,catalog_id:any){
//   //setIsLoading(true)
//   const res = await fetch(`http://localhost:5000/catalog/${id}/${catalog_id}`,{
//     next: {
//       revalidate: 0
//     }
//   })
//    return res.json()
// }

async function getData(catalog_id:any){
  //setIsLoading(true)
  const res = await fetch(`https://whinst-backend.cyou/catalog/${catalog_id}`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
}


async function getUser(user_id:any){
  const res = await fetch(`https://whinst-backend.cyou/user/${user_id}/`)
  return res.json()
}

async function getProducts(catalog_id:any){
  //setIsLoading(true)
  const res = await fetch(`https://whinst-backend.cyou/products/${catalog_id}`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
}


export default async function CatalogCreator({ params }: { params: { catalog_id: string } }){

    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/api/auth/signin')
      }

      if(!session.user.active){
        redirect('/verify_account')
      }
  
    //   //if session id does not match catalog user id then redirect

       const data = await getData(params.catalog_id)
      const user = await getUser(session.user.id)
      
   

      if(session.user.id != data.catalog.user_id && session.user.role != 'admin'){
        redirect(`/catalog_viewer/${data.catalog.catalog_name}/${params.catalog_id}`)
      }

     

      if(data.catalog.default_catalog == false && user.paid == null){
        return (
          <div className="h-screen flex flex-col justify-center items-center">
          <p className='md:p-0 p-2'>This catalog is locked! Renew your subscription to unlock it!😅</p>
      </div>
        )
    }

     

    const products: productProps[] = await getProducts(params.catalog_id)



    return(
       <Suspense fallback={<Loading1/>}>
      <LayoutServer>
      <CatalogCreatorStructure props = {products} props1={data} currency={data.currency} phone_number={data.phone_number} email={data.email}/>
      </LayoutServer>
      </Suspense>
     
    )
}
