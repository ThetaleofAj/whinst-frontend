'use client';
import Link from 'next/link';
import { UserCircleIcon,UsersIcon,XMarkIcon} from '@heroicons/react/24/outline'
import React, { useState,useEffect}  from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image'
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useRouter } from 'next/navigation'
import { LuCrown } from "react-icons/lu";







type Props = {
    children: string | JSX.Element | JSX.Element[] 
  }

  type Props2 = {
   props:string
  }

const Layout =({children,email,id,paid}:any)=>{
  const [paddle, setPaddle] = useState<Paddle>();
  const router = useRouter()
  const AUTH_TOKEN =  process.env.WHINST_TEST_API_KEY!
  const SELLER_ID:any = process.env.PADDLE_VENDOR_ID!
    const [isOpen,setIsOpen] = useState(false)
    const [isOpenContact,setIsOpenContact] = useState(false)
    const [showContactModal,setShowContactModal] = useState(false)
    const [showModal,SetShowModal] = useState(false)
    const [cancelLink,setCancelLink] = useState();
    const [cancelShowbox,setCancelShowbox] = useState(false);
    const [paidStatus,setPaidStatus] = useState();
    const date = new Date();
    let year = date.getFullYear()
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

    const onContactClose=()=>{
      setIsOpenContact(false)
    }

    const handleClose = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        if((e.target as HTMLDivElement).id === 'wrapper' ) onClose()
    }

    const handleContactClose=(e: React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
      if((e.target as HTMLDivElement).id === 'wrapper' ) onContactClose()
    }

    const CancelSubscription=()=>{
      fetch(`https://whinst-backend.cyou/cancel-sub/${id}/`,{
        method: 'GET',
        headers: {
           'content-type': 'application/json'
        },
     }).then((response)=>response.json())
     .then((json)=>{
         setCancelLink(json.data.management_urls.cancel)
         setCancelShowbox(true)
     }).catch((error)=>{
     
     })
 
    }

const CancelSubBox=()=>{
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
         
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
  
    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center ">
  
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
    <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=>{
      setCancelShowbox(false)
    }}>
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
    <div className="p-4 md:p-5 text-center">
        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Cancel subscription?</h3>
        <a href={cancelLink} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
            Continue
        </a>
        <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=>{
      setCancelShowbox(false)
    }}>No, take me back!</button>
    </div>
</div>
      </div>
    </div>
  </div>
  )
}



    const ContactDialogBox=()=>{
      setIsOpen(false)
      return(
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
      
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=>{
         setShowContactModal(false)
        }}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Contact Us</h3>
        <div className="p-4 md:p-5 text-center">
          <p className='text-xl font-bold'>whinst.zm@gmail.com</p>
        </div>
    </div>
          </div>
        </div>
      </div>
    )
    }
    
    const DeleteDialogBox=()=>{
        setIsOpen(false)
        return(
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
         
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
          
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center ">
          
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=>{
              SetShowModal(false)
            }}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Leaving so soon?</h3>
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2" onClick={()=>signOut()}>
                    Yes, I&apos;m sure
                </button>
                <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=>{
              SetShowModal(false)
            }}>No, take me back!</button>
            </div>
        </div>
              </div>
            </div>
          </div>
         
       
        )
         }


         useEffect(() => {
          initializePaddle({ environment:'production', token:AUTH_TOKEN,eventCallback(event) { //production
            if(event.name == "checkout.completed")  {
              router.refresh()
            }
          }, }).then(
            (paddleInstance: Paddle | undefined) => {
              if (paddleInstance) {
                setPaddle(paddleInstance);
              }
            },
          );

        }, []);

     


        const openCheckout = () => {
          paddle?.Checkout.open({
            items: [{ priceId: 'pro_01hxxj4jkygx03g74e0sccgm7d'}], //pro_01hxxj4jkygx03g74e0sccgm7d
            customer:{
              email:email
             
            },
            customData:{
              whinst_id: id
            }
            
          });

        };

    return(
        <>
        <div className='bg-[#f5f5f5] min-h-screen w-full flex flex-col justify-between'>
        <div className="w-full border-b-2 md:px-4 px-2 py-4 flex justify-between items-center bg-white "   id="wrapper">

<Link href="/home">
    <img alt='logo' src='/logo4.png' className='w-36 h-10' />
  </Link>

  <div className='flex space-x-4'>
  {/* {
  props.props == 'admin' ? (<>
  <Link  href="/users">
    <UsersIcon className="h-8 w-8" stroke='#E75480'/>
  </Link>
  </>):(<>

  </>)
 } */}


{/* FOR LARGE SCREENS */}

{
  paid == null ? (<div className='relative md:block'>
  <button onClick={openCheckout} className='hidden md:inline-block md:ml-auto bg-black text-white py-2 hover:bg-[#686868] focus:ring-4 rounded-lg font-bold hover:outline-white px-3 py-1'>
  Try Whinst Business
  <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-[#ffb31f] animate-ping"></div>
    <div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-[#ffb31f]"></div>
</button>

</div>):(
  <div className=' hidden md:block'>
        <div className='flex flex-row ml-2 mr-2 mt-1 items-center justify-center gap-1'>
    <LuCrown size={23} color='#ffb31f'/>
      <p className='font-bold'> Whinst Business</p>
   </div> 
    </div>
  

)
}








{
                    isOpen ? (<>
                                           <button onClick={dropDown}>
<XMarkIcon className="h-8 w-8" stroke='black'/>

</button>
                    </>):(<>
                    {
                      paid == null ? (<>
                          <div className='relative'>
                        <button onClick={dropDown}>
<UserCircleIcon className="h-8 w-8" stroke='black'/>
<div className='md:hidden'>
<div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-[#ffb31f] animate-ping"></div>
<div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-[#ffb31f]"></div>
</div>

</button>
                    </div>
                      </>):(<>
                        <div className='relative'>
                        <button onClick={dropDown}>
<UserCircleIcon className="h-8 w-8" stroke='black'/>
<div className='md:hidden'>
<div className="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4">
<LuCrown size={20} color='#ffb31f'/>
</div>
</div>

</button>
                    </div>
                      </>)
                    }
                
                    </>)
                   }

 
  </div>

 
</div>
        

 

   
  



        <div className={`${isOpen ? 'block' : 'hidden'} absolute right-0 z-20 mt-20 w-56 mr-3 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button`}>
    <div className="py-1" role="none">
<div className='md:hidden'>
{
        paid == null ? (<>
           <div className='flex flex-row border-b-2'>
      <a className='text-gray-700 block px-4 py-2 text-l  hover:bg-[#f5f5f5] font-bold' onClick={openCheckout}>Try Whinst Business
      </a>
      <div className='pt-2'>
      <div className="absolute w-4 h-4 rounded-full bg-[#ffb31f] animate-ping"></div>
<div className="absolute w-4 h-4 rounded-full bg-[#ffb31f]"></div>
      </div>
      </div>
        </>):(<>
          <div className='flex flex-row items-center justify-center gap-1 border-b-2'>
    <LuCrown size={23} color='#ffb31f'/>
      <p className='font-bold text-gray-700 block px-4 py-2 text-l'> Whinst Business</p>
   </div> 
        </>)
      }
</div>

   

      <Link href="/my_account" className="text-gray-700 block px-4 py-2 text-sm  hover:bg-[#f5f5f5] " role="menuitem"  id="menu-item-0">Account settings</Link>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm  hover:bg-[#f5f5f5]" role="menuitem"  id="menu-item-1" onClick={()=>setShowContactModal(true)}>Contact</a>
      {
        paid == null ? (<></>):( <button className="text-gray-700 block w-full px-4 py-2 text-left text-sm  hover:bg-[#f5f5f5]" onClick={CancelSubscription}>
        Cancel Subscription
      </button>)
      }
      <Link href="/terms_and_conditions" className="text-gray-700 block w-full px-4 py-2 text-left text-sm  hover:bg-[#f5f5f5]" role="menuitem" >Terms and Conditions</Link>
      <Link href="/privacy_policy" className="text-gray-700 block w-full px-4 py-2 text-left text-sm  hover:bg-[#f5f5f5]" role="menuitem" >Privacy policy</Link>
    <button className="text-gray-700 block w-full px-4 py-2 text-left text-sm  hover:bg-[#f5f5f5]" onClick={()=>SetShowModal(true)}>Sign out</button>
    </div>
  </div>



  {
  showModal ? (<>

  <DeleteDialogBox/>

  </>):(<></>)
 }


 {
  showContactModal ? (<ContactDialogBox/>):(<></>)
 }

 {
  cancelShowbox ? (<CancelSubBox/>):(<></>)
 }



{/* <div className={`${isOpen ? 'block' : 'hidden'} h-5/6 w-full min-w-fit absolute opacity-0 z-10`} id='wrapper' onClick={handleClose}>
   

    
</div> */}

<div className='mb-auto'>
    {children}
</div>
<div className='bg-white border-t-2 mt-5'>
  <p className='flex justify-center p-2'>© {year} Whinst {AUTH_TOKEN}</p>
</div>
</div>
        </>
    )
}

export default Layout