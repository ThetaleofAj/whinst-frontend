'use client'
import {useParams} from 'next/navigation'
import { useState,useEffect } from 'react';
import Link from 'next/link';
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import moment from 'moment'
import Markdown from 'react-markdown'
import Image from 'next/image'

export default function ArticleClient(){
const params = useParams()
const [blog,setBlog] = useState('' as any);
const [contents,setContents] = useState([] as any);
const [isLoading,setIsLoading] = useState(false);
const [isOpen,setIsOpen] = useState(false)


const dropDown =()=>{
    if(isOpen){
        setIsOpen(false)
    }else{
        setIsOpen(true)
    }
}


useEffect(()=>{
    setIsLoading(true)
    async function getBlog(){
        fetch(`https://andyson.pythonanywhere.com/api/article/${params.id}`,{
           method: 'GET',
           headers: {
              'content-type': 'application/json'
           }
        }).then((response)=>response.json())
        .then((json)=>{
          setBlog(json)
          setContents(json.content)

          setIsLoading(false)
        }).catch((error)=>{
          setIsLoading(false)
        })
     }
     getBlog()
},[])


    return(
        <div className='bg-[#f5f5f5] min-h-screen flex flex-col justify-between'>
        <div>
        <nav className="relative px-4 py-4 flex justify-between items-center bg-white border-b">
                          <div className='px-3 py-2'>
                          <Link href="/">
          <img alt='logo' src='/logo4.png' className='w-36 h-10'/>
        </Link>
                          </div>
      
                          
                         
                         <ul className='hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 md:flex md:mx-auto md:flex md:items-center md:w-auto md:space-x-16'>
                          
                          <li>
                          <a className="hover:text-gray-500 text-lg text-medium" href="#features">Features</a>
                          </li>
      
                          <li>
                          <a className="hover:text-gray-500 text-lg text-medium" href="#pricing">Pricing</a>
                          </li>
      
                          <li>
                          <Link className="hover:text-gray-500 text-lg text-medium" href="/blog">Blog</Link>
                          </li>
                         </ul>
      
                        
                         <Link href="/api/auth/signin" className='hidden md:inline-block md:ml-auto md:mr-3 py-2 hover:text-gray-500 rounded-lg font-bold outline outline-gray-300 hover:outline-black px-3 py-1'>Sign In</Link>
                         <Link className='hidden md:inline-block py-3 px-6 text-white bg-[#000000] hover:bg-[#686868] focus:ring-4 focus:outline-none focus:bg-[#FFB6C1] font-medium rounded-lg text-sm px-4 py-2 text-center font-bold' href="/auth/sign-up">Sign Up</Link>
      
                         {
                          isOpen ? (<>
                          <div className='px-4 py-2'>
                              <button className=" navbar-burger md:hidden" onClick={dropDown}>
                                  <IoClose size={30}/>
                              </button>
                          </div>
                          </>):(<>
                              <div className='px-4 py-2'>
                              <button className=" navbar-burger md:hidden" onClick={dropDown}>
                                  <IoMenuSharp size={30}/>
                              </button>
                          </div>
                          </>)
                         }
      
                        
                          
                          </nav>
                        
                       
      
      
                          <div className={` ${isOpen ? 'block' : 'hidden'} md:hidden border-2 durations-500 bg-white w-full border-2 absolute left-0 w-full flex py-2 px-5` }>
                         <ul className='flex flex-col gap-8'>
                         <li>
                              <a className="hover:text-gray-500" href="#features">Features</a>
                          </li>
                          <li>
                              <a className="hover:text-gray-500" href="#pricing">Pricing</a>
                          </li>
                          <li>
                              <Link className="hover:text-gray-500" href="/blog">Blog</Link>
                          </li>
                         </ul>
                          </div>
                        
      </div> 
      
      
      {
          isLoading ? (<>
            <div className="flex items-center justify-center">
                    <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
      </div>
              </div>
          </>):(<>
            <div className="container flex flex-col items-center gap-12 mt-5 mb-5 " key={blog.id}>
      <img className='object-cover' src={blog.image} alt=""/>
      <div className='flex flex-col items-center'>
      <h1 className='font-bold text-4xl my-1 pt-5'>{blog.title}</h1>
      <p className="text-gray-400">{moment(blog.datePosted).format('LL')}</p>
      </div>
      {
        contents.map((content:any)=><>
        {
            content.contenttype == '1' ? (<div className='prose'>
        <Markdown>
            {content.text}
        </Markdown>
            </div>):(<>
            {
                content.contenttype == '2' ? (<div className="prose">
                  <img className='object-cover' src={content.image} alt=""/>
                </div>):(<>
                {
                    content.contenttype == '3' ? (<>

<div className="max-full p-6 bg-[#FFFFED] border rounded-lg shadow border-t-4 border-t-[#ffb31f]">
<div className="prose">
                        <Markdown>
                         {content.banner}
                        </Markdown>
                    </div>
    <a href="/" className="mt-3 inline-flex items-center px-3 py-2 text-sm font-medium text-center font-bold text-white bg-[#ffb31f] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
       <p className='font-bold text-base'>Learn more</p>
        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>

                    </>):(<></>)
                }
                </>)
            }
            </>)
        }
        </>
        )
      }
      {/* <div className="prose">

       <Markdown >
        {blog.content}
       </Markdown>
       
     
      </div> */}
      </div>
          </>)
      }
      
                          <section className="relative border-t bg-white">
          <div className=" container flex flex-col lg:flex-row items-center md:gap-30 mt-5 mb-5 justify-between">
              <div className="flex flex-col items-center">
                  <p className="font-bold text-center text-courseassist-orange text-lg">Contact</p>
                  <div className='flex flex-row items-center'>
                  <p className="text-center text-black">courseassist.zm@gmail.com</p>
                  </div>
                  
              </div>
      
              <div className="flex flex-col items-center">
                  <p className="font-bold text-center text-courseassist-orange text-lg">Social</p>
                  {/* <div className='flex flex-row items-center '>
                  <BsTwitter/>
                  <p class="text-center text-black pl-1"> CourseAssist</p>
                  </div>
                  <div className='flex flex-row items-center '>
                  <BsFacebook/>
                  <p class="text-center text-black pl-1"> CourseAssist</p>
                  </div> */}
                  {/* <div className='flex flex-row items-center '>
               
                 <a href='https://www.instagram.com/_courseassist/?igshid=ZDdkNTZiNTM%3D' target="_blank"  rel="noreferrer noopener"><p className="text-center text-black pl-1">_courseassist</p></a>
                  </div>
                  <div className='flex flex-row items-center '>
             
                 <a href='https://www.facebook.com/profile.php?id=100094626365981&mibextid=ZbWKwL' target="_blank"  rel="noreferrer noopener"><p className="text-center text-black pl-1">Course Assist</p></a>
                  </div> */}
              </div>
      
              <div className="flex flex-col items-center">
                  <p className="font-bold text-center text-courseassist-orange text-lg">Legal</p>
                  <Link href="/privacy_policy"><p className="text-center text-black">Privacy Policy</p></Link>
                  <Link href="/terms_and_conditions"><p className="text-center text-black">Terms of Service</p></Link>
              </div>
          </div>
        </section>
      </div>
    )
}