'use client';
import Link from 'next/link';
import { UserCircleIcon,UsersIcon,XMarkIcon} from '@heroicons/react/24/outline'
import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function NavBar(props:any){
    const [isOpen,setIsOpen] = useState(false)
    const [showModal,SetShowModal] = useState(false)
    const dropDown =()=>{
        if(isOpen){
            setIsOpen(false)
        }else{
            setIsOpen(true)
        }
    }

    const onClose=()=>{
        setIsOpen(false)
    }

    const handleClose = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        if((e.target as HTMLDivElement).id === 'wrapper' ) onClose()
    }

    const doThis=()=>{
       
   
        
    }

    const DeleteDialogBox=()=>{
       
        return(
            // absolute right-0 z-10 mt-2 w-56 mr-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button
            <div className="border-2 absolute overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
               <div className='relative p-4 w-full max-w-md max-h-full'>
                   <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
                   <button className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center' onClick={()=>{
              SetShowModal(false)
            }}>
              No
            </button>
            <div className='p-4 md:p-5 text-center'>
            <button className="" onClick={()=>signOut()}>
              Yes
            </button>
            <button className='absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center' onClick={()=>{
              SetShowModal(false)
            }}>
              No
            </button>
            </div>
                   </div>
               </div>
            </div>
          )
    
         }

    return(
        <>
      
           <div className="w-screen border-b-2 px-4 py-4 flex justify-between items-center bg-white"   id="wrapper">
<h1>
  <Link href="/home">
    Whinst
  </Link>
  </h1>

  <div className='flex space-x-4'>
  {
  props.props == 'admin' ? (<>
  <Link  href="/users">
    <UsersIcon className="h-8 w-8" stroke='#E75480'/>
  </Link>
  </>):(<>

  </>)
 }


{
                    isOpen ? (<>
                                           <button onClick={dropDown}>
<XMarkIcon className="h-8 w-8" stroke='#E75480'/>
</button>
                    </>):(<>
                        <button onClick={dropDown}>
<UserCircleIcon className="h-8 w-8" stroke='#E75480'/>
</button>
                    </>)
                   }

 
  </div>

 
</div>


<div className={`${isOpen ? 'block' : 'hidden'} absolute right-0 z-10 mt-2 w-56 mr-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button`}>
    <div className="py-1" role="none">
      <Link href="/my_account" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-0">Account settings</Link>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem"  id="menu-item-1">Support</a>
      <Link href="/terms_and_conditions" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" >Terms and Conditions</Link>
    <button className="text-gray-700 block w-full px-4 py-2 text-left text-sm" onClick={doThis}>Sign out</button>
    </div>
  </div>



  {
  !showModal ? (<>
   <DeleteDialogBox/>
  </>):(<></>)
 }











<div className={`${isOpen ? 'block' : 'hidden'} h-5/6 w-full min-w-fit absolute opacity-0 z-10`} id='wrapper' onClick={handleClose}>
    
</div>


        </>
    )
}