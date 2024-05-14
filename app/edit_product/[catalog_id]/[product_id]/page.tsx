import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Layout from '@/app/components/layout';
import LayoutServer from '@/app/layout_server/page';
import EditProductClient from '@/app/components/edit_product_client';

async function getCatalogData(props:any){
  const res = await fetch(`http://165.227.114.6/catalogs/${props}/`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
}


async function getPaidData(props:any){
  const res = await fetch(`http://165.227.114.6/user/${props}/`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
  
}


async function getData(product_id:number){
  await new Promise(resolve=>setTimeout(resolve,2000))
  const res = await fetch(`http://165.227.114.6/product/${product_id}`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
}


async function getCatalog(catalog_id:any){
  //setIsLoading(true)
  const res = await fetch(`http://165.227.114.6/catalog/${catalog_id}`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
}

export default async function EditProduct({ params }: { params: { product_id: number,time:string } }){
    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/api/auth/signin')
      }
      if(!session.user.active){
        redirect('/verify_account')
      }


    const catalogs = await getCatalogData(session.user.id)
const user = await getPaidData(session.user.id)
const data = await getData(params.product_id)
 const catalog = await getCatalog(data.main.catalog_id)


if(session.user.id != catalog.catalog.user_id && session.user.role != 'admin'){
  redirect(`/catalog_viewer/${catalog.catalog.catalog_name}/${catalog.catalog.id}`)
}


if(catalogs.length > 1 && user.paid == null){
  return(
    <div className="h-screen flex flex-col justify-center items-center">
    <p className='md:p-0 p-2'>This catalog is locked! Renew your subscription to unlock it!😅</p>
  </div>
  )
}


    
    return(
      <LayoutServer>
     <EditProductClient props={data} />
      </LayoutServer>
    )
}
