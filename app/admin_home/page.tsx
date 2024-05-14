import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';


interface ModelProps{
    table_name:string
}

async function getData(){
    await new Promise(resolve=>setTimeout(resolve,3000))
    const res = await fetch(`http://165.227.114.6/models/`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
    
  }

export default async function AdminHome(){
    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/api/auth/signin')
      }
    if(session.user.role != 'admin'){
        return(
            <div className="h-screen flex flex-col justify-center items-center">
            <p>You're not an admin</p>
            </div>
        )
    }
    
    const models: ModelProps[] = await getData()

    return(
        <>
        <div className="w-screen border-b-2 p-2">
<h1>
 Whinst Admin
  </h1>
</div>
<div className='flex-col justify-center'>
    {
        models.map(model=>(
            <>
            <Link href={`/model_list/${model.table_name}/`}>
            <p>
                {model.table_name}
            </p>
            </Link>
            </>
            
        ))
    }

</div>
        </>
        
    )
}