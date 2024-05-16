import Image from 'next/image'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faPlus } from '@fortawesome/free-solid-svg-icons'
import { BeakerIcon,PlusIcon } from '@heroicons/react/24/solid'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import HomeComponent from '../components/home';
import Loading1 from '../components/loading';
import { Suspense } from "react";
import { checkPayment } from '../components/check_payment';

interface ComponentProps {
  id: number;
}


interface CatalogProps{
id:number,
catalog_name: string,
unique_id: string
}

//checkPayment()

async function getData(props:any){
  await new Promise(resolve=>setTimeout(resolve,3000))
  const res = await fetch(`https://whinst-backend.cyou/catalogs/${props}/`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
  
}



export default async function Home() {
  const session = await getServerSession(authOptions)


  interface UserInfo {
    name: string;
    email: string;

  }


  
  if(!session){
    redirect('/api/auth/signin')
  }

  if(!session.user.active){
    redirect('/verify_account')
  }



  const catalogs: CatalogProps[] = await getData(session.user.id)

  return (
 
<Suspense fallback={<Loading1/>}>
<HomeComponent id={session.user.id} role={session.user.role}/>
 </Suspense>
  )
}

