import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
import VerifyAccountClient from '../components/verfiy_account_client';

export default async function VerifyAccount(){
    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/api/auth/signin')
      }

    return(
        <VerifyAccountClient props={session.user.email}/>
    )
}