'use client';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { UserCircleIcon,UsersIcon,XMarkIcon} from '@heroicons/react/24/outline'

interface MyResetFormValues{
    email:string,
  }
  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),

  })  
export default function ResetPasswordClient(){
    const initialValues: MyResetFormValues = {email:''};
    const [displayError,setDisplayError] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    const onSubmit=async(properties:any)=>{
        setIsLoading(true)
        const uid = crypto.randomUUID()
        await fetch('http://165.227.114.6/reset-password/',{
            method:'PUT',
            body:JSON.stringify({
                email:properties.email,
                unique_code:uid,
            }),
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((data=>data.json()))
        .then((res:any)=>{
           
            setIsLoading(false)
         setDisplayError(true)
         })
         .catch((error:any)=>{
          
        })
    }

    return(
        <div className='bg-[#f5f5f5] h-screen flex items-center justify-center'>
      
        <div  className='flex flex-col items-center justify-center w-full'>
        <a href='#' className='flex items-center mb-2 text-2xl font-semibold text-gray-900'>
                  <h1>Whinst</h1>
        </a>
        {
          displayError ? (
            <div className="md:w-3/12 w-5/6 bg-[#D5F0C0] rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-green-300 border m-3 h-10 flex flex-row justify-center items-center space-x-10">
            <p className='text-sm md:text-base'>A link has been sent to your email</p>
            <button onClick={()=>{
              setDisplayError(false)
            }}>
            <XMarkIcon className="h-5 w-5" stroke='red'/>
            </button>
          </div>
          ):(<></>)
        }
        <div className="md:w-full w-5/6 bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                      <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
                          Reset your password
                      </h1>

                      <Formik initialValues={initialValues}
      onSubmit={(values)=>onSubmit(values)}
      validationSchema={validationSchema}
      >
        {({errors,touched})=>(
            <Form className='space-y-2 md:space-y-2'>
           
                      <label htmlFor='firstName' className='block mb-2 text-sm font-medium text-gray-900' >Email</label>
                      <Field id='email' name='email' placeholder='Email' type='email' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'/>
                      {errors.email && touched.email ? (
                          <div>{errors.email}</div>
                         ): null}
                         {
                          isLoading ? (
                            <div className='flex justify-center mt-8'>
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                  </svg>
                                                 </div>
                          ):(
                            <button type='submit' className='w-full text-white bg-black hover:bg-[#686868] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5'>Send password reset link</button>
                          )
                         }
            </Form>
        )}
      </Formik>
          </div>
        </div>
        </div>
     
    </div>
    )
}