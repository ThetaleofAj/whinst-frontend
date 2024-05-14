import Layout from "../components/layout";
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

type Props = {
    children: string | JSX.Element | JSX.Element[] 
  }

  const text = 'hello'

  async function getData(props:any){
    const res = await fetch(`http://165.227.114.6/user/${props}/`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
    
  }

const LayoutServer=async({children}:Props)=>{
    const session = await getServerSession(authOptions)
    const email = session?.user.email
    const id = session?.user.id
   // const paid = session?.user.paid
    const paid = await getData(id)
    return(
        <Layout email={email} id={id} paid={paid.paid}>
            {children}
        </Layout>
    )
}

export default LayoutServer;