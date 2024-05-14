import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import CatalogViewerClient from '@/app/components/catalog_viewer_client';



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
    const res = await fetch(`http://165.227.114.6/products/${catalog_id}`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
  }

  async function getData(catalog_id:any){
    const res = await fetch(`http://165.227.114.6/catalog/${catalog_id}`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
  }

  async function getUser(user_id:any){
    const res = await fetch(`http://165.227.114.6/user/${user_id}/`)
    return res.json()
  }

export default async function CatalogViewer({ params }: { params: { catalog_id: number } }){
    const session = await getServerSession(authOptions)
    const data = await getData(params.catalog_id)
    const user = await getUser(data.catalog.user_id)
 const products: productProps[] = await getProducts(params.catalog_id)


 if(data.catalog.default_catalog == false && user.paid == null){
    return (
      <div className="h-screen flex flex-col justify-center items-center">
      <p className='md:p-0 p-2'>This catalog is not available!😐</p>
  </div>
    )
}

    return(
    <CatalogViewerClient props={products} props1={data}/>
    )

}