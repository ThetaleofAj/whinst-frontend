import { Formik ,Field, Form, } from 'formik';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import * as Yup from 'yup';
import MyAccountClient from '../components/my_account_client';
import Layout from '../components/layout';
import LayoutServer from '../layout_server/page';


async function getUser(props:any){
    await new Promise(resolve=>setTimeout(resolve,2000))
    const res = await fetch(`http://165.227.114.6/user/${props}`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
}

export default async function MyAccount(){
    const session = await getServerSession(authOptions)

    if(!session){
        redirect('/api/auth/signin')
      }

      if(!session.user.active){
        redirect('/verify_account')
      }

    const user = await getUser(session.user.id)


    return(
        <>
        <LayoutServer>
        <MyAccountClient first_name={user.first_name} last_name={user.last_name} email={user.email} id={session.user.id} g_login={user.g_login}/>
        </LayoutServer>
        </>
    )
}