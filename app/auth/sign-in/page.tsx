'use client';
import {Field, Form, Formik} from 'formik';
import {signIn} from "next-auth/react"
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useState } from 'react';
import { UserCircleIcon,UsersIcon,XMarkIcon} from '@heroicons/react/24/outline'

interface MySignInFormValues{
  email:string,
  password:string
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required("Required"),

})

export default function SignIn(){
  const router = useRouter()
  const [displayError,setDisplayError] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const initialValues: MySignInFormValues = {email:'',password:''};
  const onSubmit = async (props:any)=>{
    setIsLoading(true)
    const res = await signIn("credentials",{
      email:props.email,
      password:props.password,
      redirect: false,
      callbackUrl: '/home'
    })
    if(res){
      setIsLoading(false)
    }

    if(res?.error){
      setDisplayError(true)
    }else{
      if(res?.url){
          router.push(res?.url)
        }
    }
  }

  const googleSubmit=async()=>{
    const res = await signIn('google',{
      redirect: false,
      callbackUrl: '/home'
    })
  }

    return(
      <div className='bg-[#f5f5f5] h-screen flex items-center justify-center'>
      
          <div  className='flex flex-col items-center justify-center w-full'>
          <Link href="/" className='flex items-center mb-2 text-2xl font-semibold text-gray-900'>
          <img alt='logo' src='/logo4.png' className='w-36 h-10'/>
          </Link>
         
        
               
          
          {/* <button onClick={()=>googleSubmit()}>
            Sign in with Google
          </button> */}
          {
            displayError ? (
              <div className="md:w-3/12 w-5/6 bg-[#ffd7b5] rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-red-300 border m-3 h-10 flex flex-row justify-center items-center space-x-14">
              <p>Incorrect email or password</p>
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
                            Sign in to your account
                        </h1>

       <button onClick={()=>googleSubmit()} className='md:w-full w-full bg-white rounded-lg border-2 focus:ring-4 focus:outline-none flex justify-center items-center p-2 space-x-2 md:mt-0 sm:max-w-md'>
     
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-7 h-7">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        className="fill-google-logo-blue"
      ></path>
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        className="fill-google-logo-green"
      ></path>
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        className="fill-google-logo-yellow"
      ></path>
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        className="fill-google-logo-red"
      ></path>
    </svg>
      <div>
Continue with Google
      </div>
               
     
        </button>                     

        <div className="relative flex items-center">
    <div className="flex-grow border-t border-gray-400"></div>
    <span className="flex-shrink mx-4 text-gray-400">or</span>
    <div className="flex-grow border-t border-gray-400"></div>
</div>

                        <Formik initialValues={initialValues}
        onSubmit={(values)=>onSubmit(values)}
        validationSchema={validationSchema}
        >
          {({errors,touched})=>(
              <Form className='space-y-2 md:space-y-2'>
             
                        <label htmlFor='firstName' className='block mb-2 text-sm font-medium text-gray-900' >Email</label>
                        <Field id='email' name='email' placeholder='email' type='email' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'/>
                        {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                           ): null}
                        <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                        <Field id='password' name='password' placeholder='password' type='password' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '/>
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                           ): null}
                           <div  className="flex items-center justify-between">
                           <Link href="/reset_password" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
                           </div>
                           {
                            isLoading ? (
                              <div className='flex justify-center mt-8'>
                              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                    </svg>
                                                   </div>
                            ):(
                              <button type='submit' className='w-full text-white bg-black hover:bg-[#686868] focus:ring-4 focus:outline-none font-bold rounded-lg px-5 py-2.5'>
                                {/* bg-black text-white hover:bg-[#686868] focus:ring-4 focus:outline-none */}
                                Sign In</button>
                            )
                           }
                        <p className="text-sm font-light text-gray-500 ">
                        Don’t have an account yet? <Link href="/auth/sign-up" className="font-medium text-primary-600 hover:underline">Sign Up</Link>
                  </p>
              </Form>
          )}
        </Formik>
            </div>
          </div>
          </div>
       
      </div>
    )
  }