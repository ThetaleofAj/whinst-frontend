import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

interface UserProps{
 active:boolean;
}



async function getData(model_name:any){
    //setIsLoading(true)
    await new Promise(resolve=>setTimeout(resolve,1000))
    const res = await fetch(`http://165.227.114.6/model_list/${model_name}`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
  }
  

export default async function ModelList({ params }: { params: { model_name: string } }){
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
    const test = {
        
        id:1,
        name:'hello'
    }
const info = [
    {
        id:1,
        name:'hello'
    },
    {
        id:2,
        name:'bye'
    }
]



    const data: UserProps[] = await getData(params.model_name)
    var activeCount = 0
    for(let info of data ){
        if(info.active == true){
            activeCount = activeCount + 1;
        }
    }
 
  
    return(
        <>
                <div className="w-screen border-b-2 p-2">
<h1>
 Whinst Admin
  </h1>
</div>
<div className='flex flex-row space-x-4 justify-center  p-2'>
<p>Users: {data.length}</p>
<p>Active users: {activeCount}</p>
</div>
           {
        data.map(model=>(
            
            <div  className='flex flex-row space-between border-b space-x-4 w-max p-2'>
            {
                    Object.entries(model).map(([key,val])=>(
                        <div className='flex flex-row'>
                             <p className='font-bold'>{key}:</p> <p>{val}</p>
                        </div>
                    
                       
                        
                     ))
            }
         
            </div>
        ))
    }

        </>
    )
}