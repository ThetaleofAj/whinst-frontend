import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import CatalogViewerClient from '@/app/components/catalog_viewer_client';
import type { Metadata } from 'next'


type Props = {
  params: {
    catalog_id:string
  }
}
export const generateMetadata = async ({params}:Props):Promise<Metadata> =>{
  const data = await getData(params.catalog_id)

  return{
    title: `${data.catalog.catalog_name} • Whinst digital catalog`,
    description: 'View my product catalog!',
    openGraph:{
      images: data.catalog_logo
    }
  }
}

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


async function getProducts(catalog_id:any){
    const res = await fetch(`https://whinst-backend.cyou/products/${catalog_id}`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
  }

  async function getData(catalog_id:any){
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


export default async function CatalogViewer({ params }: { params: { catalog_id: number } }){
    const session = await getServerSession(authOptions)
    const data = await getData(params.catalog_id)
    const user = await getUser(data.catalog.user_id)
 const products: productProps[] = await getProducts(params.catalog_id)

 //if(data.catalog.default_catalog == false && user.paid == null){
 if(user.paid == null){
    return (
      <div className="h-screen flex flex-col justify-center items-center">
      <p className='md:p-0 p-2'>This catalog is not available!😐</p>
  </div>
    )
}

    return(
      <>
          <CatalogViewerClient props={products} props1={data} props2={session}/>
      </>


    )

}