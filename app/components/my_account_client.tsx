'use client'
import { Formik ,Field, Form, } from 'formik';
import * as Yup from 'yup';
import { useState,MouseEvent, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react';

interface UserForm {
    first_name:string,
    last_name:string,
}

const validationSchemaPassword = Yup.object({
    newPassword: Yup.string().required("Required").min(6,"Password must have atleast 6 characters"),
    confirmNewPassword: Yup.string().required('Required').oneOf([Yup.ref("newPassword")],"password does not match")
})

const validationSchema = Yup.object({
    first_name: Yup.string().required('Required'),  
    last_name: Yup.string().required('Required'),  
  })

const validationSchemaEmail = Yup.object({
    email: Yup.string().required('Required'),    
  })

export default function MyAccountClient(props:any){
    const [showModal,SetShowModal] = useState(false)
    const [showEmailModal,setShowEmailModal] = useState(false);
    const [showPasswordModal,setShowPasswordModal] = useState(false)
    const router = useRouter()
    const [email,setEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [currentPassword,setCurrentPassword] = useState('');


    const onSubmit=async(properties:any)=>{
        await fetch(`http://165.227.114.6/edit-user/${props.id}/`,{
            method:'PUT',
            body:JSON.stringify({
                first_name:properties.first_name,
                last_name:properties.last_name,
            }),
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((data=>data.json()))
        .then((res:any)=>{
     
           router.refresh()
           
        })
        .catch((error:any)=>{
    
        })
     }

     const onSubmitEmail=async(properties:any)=>{
        const uid = crypto.randomUUID()
        await fetch('http://165.227.114.6/change-email/',{
            method:'PUT',
            body:JSON.stringify({
                new_email:properties,
                unique_code:uid,
                id:props.id
            }),
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((data=>data.json()))
        .then((res:any)=>{
        
           signOut()
        })
        .catch((error:any)=>{
          
        })
     }

     const onSubmitPassword=async(properties:any)=>{
        await fetch('http://165.227.114.6/change-password/',{
            method:'PUT',
            body:JSON.stringify({
                old_password:properties.current_password,
                new_password:properties.newPassword,
                id:props.id
            }),
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((data=>data.json()))
        .then((res:any)=>{
      
           signOut()
        })
        .catch((error:any)=>{
        
        })
     }


     const deleteUser=async(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault
        await fetch(`http://165.227.114.6/delete-user/${props.id}/`,{
            method:'DELETE',
        }).then((data=>data.json()))
        .then((res:any)=>{
            router.push('/')
        })
        .catch((error:any)=>{
            
        })
     }

     const DeleteDialogBox=()=>{
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
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Delete account?</h3>
                <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2" onClick={deleteUser}>
                    Yes
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


         const ChangeEmailModal=(props:any)=>{
            return(
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center ">
              
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
                <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=>setShowEmailModal(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
                <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Change Email?</h3>
                    <p className='text-gray-500 pb-2'>A confirmation email will be sent to your new email</p>
                    <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2" onClick={()=>{onSubmitEmail(email)}}>
                        Yes
                    </button>
                    <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=>setShowEmailModal(false)}>No!</button>
                </div>
            </div>
                  </div>
                </div>
              </div>
                )
         }


         const ChangePasswordModal=()=>{
            return(
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
              
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center ">
              
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
                <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=>setShowPasswordModal(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
                <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Change Password?</h3>
                    <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2" onClick={onSubmitPassword}>
                        Yes
                    </button>
                    <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=>setShowPasswordModal(false)}>No!</button>
                </div>
            </div>
                  </div>
                </div>
              </div>
            )
         }

     const initialValues = {first_name:props.first_name,last_name:props.last_name}
     const initialValuesEmail = {email:props.email}
     const initialValuesPassword = {currrent_password:'',confirmNewPassword:'',newPassword:''}

    return(
        <div className='space-y-10'>
        <div>
        <Formik 
        initialValues={initialValues}
        onSubmit={(values)=>onSubmit(values)}
        validationSchema={validationSchema}
        enableReinitialize={true}
        >
      {({errors,touched})=>(
       
             <Form>
                <div className='flex items-center justify-center border-b'>
                <div className='flex flex-col md:w-2/4 w-5/6 p-2'>
                    <div className='flex justify-center'>
                    <p>Edit Names</p>
                    </div>
                  
        <label>First Name</label>
        <Field id='first_name' name='first_name' placeholder='Firstname' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
        {errors.first_name && touched.first_name ? (
                  <div>
                  <p className='text-sm text-red-600 text-center'>First name cannot be blank</p>
                </div>
             ): null}
        <label>Last Name</label>
        <Field id='last_name' name='last_name' placeholder='Lastname' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
        {errors.last_name && touched.last_name ? (
                <div>
                <p className='text-sm text-red-600 text-center'>Last name cannot be blank</p>
                           </div>
             ): null}
             <div className='pt-3 flex justify-end items-center'>
             <button type='submit' className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">Save</button>
             </div>
        </div>
                </div>
           
      </Form>
        
       
      )}
     </Formik>
        </div>
 

<div >
  
{
    props.g_login ? (<>
    <div className='flex items-center justify-center border-b'>
    <div  className='flex flex-col md:w-2/4 w-5/6 p-2'>
    <div className='flex flex-col items-center justify-center'>
                    <p>Email</p>
                    <p className='font-bold'>{props.email}</p>
                    </div>
    </div>
    </div>
    </>):(<>
    <Formik initialValues={initialValuesEmail}
     onSubmit={(values)=>{setEmail(values.email)}}
     validationSchema={validationSchemaEmail}
     enableReinitialize={true}
     >
     {({errors,touched})=>(
        <Form>

<div className='flex items-center justify-center border-b'>
    <div  className='flex flex-col md:w-2/4 w-5/6 p-2'>
    <div className='flex justify-center'>
                    <p>Change Email</p>
                    </div>
        <label>Email</label>
        <Field id='email' name='email' placeholder='email' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
        {errors.email && touched.email ? (
                  <div>
                  <p className='text-sm text-red-600 text-center'>Email cannot be blank</p>
                             </div>
             ): null}
             <div className='pt-3 flex justify-end items-center'>
        <button type='submit' className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4" onClick={()=>setShowEmailModal(true)}>Save</button>
             </div>
    </div>
    </div>
      </Form>
      )}

     </Formik>
    </>)
}
 

   
</div>
    
{
props.g_login ? (<></>):(<>
<div>
<Formik
   initialValues={initialValuesPassword}
   onSubmit={(values)=>onSubmitPassword(values)}
validationSchema={validationSchemaPassword}
enableReinitialize={true}
   >
       {({errors,touched})=>(
        <Form>
<div className='flex items-center justify-center border-b'>
    <div  className='flex flex-col md:w-2/4 w-5/6 p-2'>
    <div className='flex justify-center'>
                    <p className='pb-2'>Change Password</p>
                    </div>
        <label>Current Password</label>
        <Field id='current_password' type='password' name='current_password' placeholder='Current Password' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
        {/* {errors.currrent_password && touched.currrent_password ? (
                  <div>
                  <p className='text-sm text-red-600 text-center'>Cannot be blank</p>
                             </div>
             ): null} */}

<label>New Password</label>
        <Field id='newPassword' name='newPassword' type='password' placeholder='New Password' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
        {/* {errors.newPassword && touched.newPassword ? (
                <div>
                <p className='text-sm text-red-600 text-center'>Cannot be blank</p>
                           </div>
             ): null} */}


<label>Confirm New Password</label>
        <Field id='confirmNewPassword' name='confirmNewPassword' type='password' placeholder='Confirm New Password' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
        {/* {errors.confirmNewPassword && touched.confirmNewPassword ? (
            <div>
 <p className='text-sm text-red-600 text-center'>Cannot be blank</p>
            </div>
             ): null} */}

             <div className='pt-3 flex justify-end items-center'>
    <button type='submit' className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">Save</button>
             </div>

    </div>
    </div>

      </Form>
      )}
   </Formik>
</div>
</>)
}   

  
{/* Account deletion functionality. Commented out now incase needed later!!!!!!!!! */}
  {/* <div className='flex flex-col items-center justify-center border-b p-2'>
  <button onClick={()=>{
  SetShowModal(true)
 }} className='md:w-1/5 w-5/6 mb-2 px-3 py-2 text-sm font-medium text-center items-center text-white bg-red-600 rounded-lg hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300'>
   Delete Account
 </button>
  </div> */}
  


 {/* {
  showModal ? (<>
   <DeleteDialogBox/>
  </>):(<></>)
 } */}

{
    showEmailModal ? (<>
    <ChangeEmailModal/>
    </>):(<></>)
}

{
    showPasswordModal ? (<>
    <ChangePasswordModal/>
    </>):(<></>)
}
     </div>

    )
}