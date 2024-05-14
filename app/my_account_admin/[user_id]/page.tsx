import { Formik ,Field, Form, } from 'formik';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import * as Yup from 'yup';
import MyAccountClient from '@/app/components/my_account_client';


async function getUser(props:any){
    await new Promise(resolve=>setTimeout(resolve,2000))
    const res = await fetch(`http://165.227.114.6/user/${props}`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
}

export default async function MyAccount({ params }: { params: { user_id: number } }){
    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/api/auth/signin')
      }

      if(session.user.role != 'admin'){
        return(
            <div className="h-screen flex flex-col justify-center items-center">
            <p>You&apos;re not an admin</p>
            </div>
        )
    }

    const user = await getUser(params.user_id)


    return(
        <>
   <MyAccountClient first_name={user.first_name} last_name={user.last_name} email={user.email} id={session.user.id}/>
        </>
    )
}