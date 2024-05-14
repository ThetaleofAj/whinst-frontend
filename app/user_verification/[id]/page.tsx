'use client'
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation'

export default function userVerification(){
    const router = useRouter()
    const params = useParams()
    const code = params.id
    const verifyUser = async()=>{
        await fetch(`http://165.227.114.6/verify-user/${code}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((data=>data.json()))
        .then((res)=>{
        
           router.push('/api/auth/signin')
       
        }).catch((error)=>{
          
        })
    }
    return(
        <>
              <div className='bg-[#f5f5f5] h-screen flex items-center justify-center'>
        <div className="flex flex-col justify-center items-center ">
            <p>Click to verify your email address</p>
        <button onClick={()=>verifyUser()} className='mt-2 w-fp-2ull text-white bg-black hover:bg-[#686868] focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-5 py-2.5 font-bold'>Verify</button>
        </div>
           
      </div>
    
   
        </>
    )
}