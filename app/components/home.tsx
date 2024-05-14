import { BeakerIcon,PlusIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link';
import VideoPlayer from "./video_player";
import { Suspense } from 'react';
import Search from './home_search_bar';
import { UserCircleIcon,UsersIcon} from '@heroicons/react/24/outline'
import NavBar from './navbar';
import Layout from './layout';
import Loading from './loading';
import LayoutServer from '../layout_server/page';

interface ComponentProps {
    id: number;
  }


interface CatalogProps{
  id:number,
  catalog_name: string,
  unique_id: string
}

async function getData(props:ComponentProps){
  await new Promise(resolve=>setTimeout(resolve,3000))
  const res = await fetch(`http://165.227.114.6/catalogs/${props.id}/`,{
    next: {
      revalidate: 0
    }
  })
  return res.json()
  
}

async function getDataAdmin(){
  await new Promise(resolve=>setTimeout(resolve,3000))
  const res = await fetch(`http://165.227.114.6/catalogs/`,{
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



export default async function HomeComponent(props:any){
  

  const paid = await getPaidData(props.id)
  var catalogs: CatalogProps[] = []
  if(props.role == 'admin'){
  catalogs = await getDataAdmin()
  }else{
    catalogs = await getData(props)
  }

  



    const data = [
        {
          name:'Insansa Shoes',
          products:[
            {
              name:'gvv',
              description:'buh',
              image:'',
            },
            {
              name:'yhvgu7gb',
              description:'jbvubg',
              image:'',
            },
            {
              name:'tvybuy',
              description:'yfgyubu',
              image:'',
            },
            {
              name:'rdtfgyg',
              description:'gvyhvbyvb',
              image:'',
            }
          ]
        },
        {
          name:'Jumbo Drinks',
          products:[
            {
              name:'gvv',
              description:'buh',
              image:'',
            },
            {
              name:'yhvgu7gb',
              description:'jbvubg',
              image:'',
            },
            {
              name:'tvybuy',
              description:'yfgyubu',
              image:'',
            },
            {
              name:'rdtfgyg',
              description:'gvyhvbyvb',
              image:'',
            },
            {
              name:'rdtfgyg',
              description:'gvyhvbyvb',
              image:'',
            }
          ]
        }
      ]






    return(
        <>
  
<LayoutServer>
 <Suspense fallback={<Loading/>}>
 <Search props={catalogs} paid={paid.paid}/>
 </Suspense>
</LayoutServer>
 
    

  </>
    )
}
