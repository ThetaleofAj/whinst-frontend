'use client'
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation'

export default function NewEmailVerification(){
    const router = useRouter()
    const params = useParams()
    const code = params.id
    const new_email = params.new_email
    const verifyEmail = async()=>{
        await fetch(`http://165.227.114.6/update-email/${code}/${new_email}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((data=>data.json()))
        .then((res)=>{
       
            if(res == 201){
                router.push('/home')
            }
        }).catch((error)=>{
        
        })
    }
    return(
        <>
        <div>
        <button onClick={()=>verifyEmail()}>verify</button>
        </div>
        </>
    )
}