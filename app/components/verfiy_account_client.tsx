'use client'
import { signOut } from 'next-auth/react';


export default function VerifyAccountClient(props:any){
  
    return(
        <div className="h-screen flex flex-col justify-center items-center">
        <p className='md:p-0 p-2'>Verify your account using the link sent to</p>
        <p className=' font-bold'>{props.props}</p>
        <button onClick={()=>signOut()} className='p-4'>
            <p className='underline'>Sign out</p>
        </button>
    </div>
    )
}