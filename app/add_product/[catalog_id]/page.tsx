import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AddProductComponent from '../../components/add_product';
import Layout from '@/app/components/layout';
import LayoutServer from '@/app/layout_server/page';


interface CatalogProps{
  id:number,
  catalog_name: string,
  unique_id: string
}

async function getCatalogData(props:any){
  const res = await fetch(`https://whinst-backend.cyou/catalogs/${props}/`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
}


async function getPaidData(props:any){
  const res = await fetch(`https://whinst-backend.cyou/user/${props}/`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
  
}


async function getCatalog(catalog_id:any){
  //setIsLoading(true)
  const res = await fetch(`https://whinst-backend.cyou/catalog/${catalog_id}`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
}


export default async function AddProduct({ params }: { params: { catalog_id: string } }){

    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/api/auth/signin')
      }
      if(!session.user.active){
        redirect('/verify_account')
      }
const catalogs = await getCatalogData(session.user.id)
const user = await getPaidData(session.user.id)
const data = await getCatalog(params.catalog_id)

if(session.user.id != data.catalog.user_id && session.user.role != 'admin'){
  redirect(`/catalog_viewer/${data.catalog.catalog_name}/${params.catalog_id}`)
}

//if(catalogs.length > 1 && user.paid == null){
if(user.paid == null){
  return(
    <div className="h-screen flex flex-col justify-center items-center">
    <p className='md:p-0 p-2'>This catalog is locked! Renew your subscription to unlock it!😅</p>
  </div>
  )
}


    return(
      <LayoutServer>
   <AddProductComponent />
      </LayoutServer>
    )
}


