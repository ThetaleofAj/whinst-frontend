import Link from 'next/link';

interface UserProps{
   id:number,
   first_name:string,
   last_name:string,
   email:string,
   role:string
  }



async function getUsers(){
    await new Promise(resolve=>setTimeout(resolve,3000))
    const res = await fetch(`http://165.227.114.6/users/`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
    
  }

export default async function Users(){

const users: UserProps[] = await getUsers()

    
    return(
        <>
        {
            users.map(user=>
                <>
                <Link href={`/my_account_admin/${user.id}/`}>
                <p>
                    {user.first_name}
                    {user.last_name}
                    {user.email}
                    {user.role}
                </p>
                </Link>
              
                </>
                )
        }
        </>
    )
}