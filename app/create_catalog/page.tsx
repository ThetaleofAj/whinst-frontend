import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Create_Catalog from '../components/create_catalog';
import Layout from '../components/layout';
import LayoutServer from '../layout_server/page';




export default async function CreateCatalog(){
    const session = await getServerSession(authOptions)
  
    if(!session){
        redirect('/api/auth/signin')
      }
      if(!session.user.active){
        redirect('/verify_account')
      }
    return(
        <LayoutServer>
<Create_Catalog id={session.user.id} sub_date={session.user.sub_date} email={session.user.email}/>
        </LayoutServer>

    )
}