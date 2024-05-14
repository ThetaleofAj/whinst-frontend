'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CgAddR } from "react-icons/cg";
import { PiImagesThin,PiImagesSquareBold } from "react-icons/pi";
import { HiShare } from "react-icons/hi2";
import Image from 'next/image'
import { IoMenuSharp } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

export default function Dashboard(){
    const [isOpen,setIsOpen] = useState(false)
    const dropDown =()=>{
        if(isOpen){
            setIsOpen(false)
        }else{
            setIsOpen(true)
        }
    }


    return(
        <div className='bg-[#f5f5f5]'>


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
                   <Link className='hidden md:inline-block bg-black text-white hover:bg-[#686868] outline-white focus:ring-4 focus:outline-none rounded-lg px-5 py-2 text-center font-bold' href="/auth/sign-up">Sign Up</Link>
                   {/* hidden md:inline-block py-3 px-6 text-white bg-[#000000] hover:bg-[#686868] focus:ring-4 focus:outline-none focus:bg-[#FFB6C1] font-medium rounded-lg text-sm px-4 py-2 text-center font-bold' */}

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
                     
                 
                

        <section>
            {/* SECTION 1 */}
          {/* <div className='container h-80 flex flex-col lg:flex-row items-center gap-12 mt-14 lg:mt-28 border-2'>
            <div className='w-2/4 flex flex-col items-center lg:items-start mb-16 border-2'>
            <p className='text-7xl'>What's in stock?</p>
                    <p className='text-xl p-2 font-medium'>Create and share digital catalogs of your products and services with your customers</p>
            </div>

          </div> */}
            <div className="container flex flex-col lg:flex-row items-center md:gap-12 gap:1 md:mt-18 mt-5 lg:mt-16">
                <div className="md:w-2/4 flex-1 flex flex-col items-center lg:items-start">
                    <p className='md:text-7xl text-7xl text-[#686868]'><span className='text-black'>Wh</span>at's <span className='text-black'>in</span> <span className='text-black'>st</span>ock?</p>
                    <p className='text-xl p-2 font-medium'>Create and share digital catalogs of your products and services with your customers</p>
                    <div className='flex flex-col lg:flex-row items-center p-2 gap-3'>

                    <Link href="/api/auth/signin" className='px-8 py-3 rounded-lg font-bold outline outline-gray-300 hover:outline-black'>Sign In</Link>
                      <Link className='font-bold text-white hover:outline-white hover:bg-[#686868] focus:ring-4 bg-black focus:outline-none rounded-lg px-12 py-3 text-center' href="/auth/sign-up">Sign Up</Link>

                    </div>
                </div>
                <div className="md:w-2/4 w-full h-96 relative shadow-2xl border">
                <Image 
          fill
         style={{objectFit:'cover'}}
         alt=''
         src='/slideShow24.gif' 
         priority
          />
                </div>
            </div>
            {/* SECTION 2 */}
            <div className="container flex flex-col-reverse lg:flex-row items-center md:gap-12 gap-1  mt-14 lg:mt-28">

            <div className="md:w-2/4 w-full h-96 relative shadow-2xl border">
            <Image 
          fill
          style={{objectFit:'cover'}}
         alt=''
         src='/section22.png' 
          />
                </div>
                <div className="flex md:w-2/4 flex-col items-center lg:items-start md:mb-16">
                <p className='text-4xl p-2'>Easily create digital catalogs</p>
                <p className='text-lg font-medium p-2'>Do you sell clothers, own a restaurant or a hair salon? Whinst allows you to easily create digital catalogs for the products and services your business offers.</p>
                
                </div>
            </div>

            {/* SECTION 3 */}
            <div className="container flex flex-col lg:flex-row items-center md:gap-12 gap-1 mt-14 lg:mt-28">
            <div className="flex flex-1 flex-col items-center lg:items-start md:mb-16">
    <p className='text-4xl p-2'>Share your digital catalogs with your customers</p>
    <p className='text-lg font-medium p-2'>Share your digital catalogs with your customers via social media, link or QR code.</p>
    
    </div>
<div className="md:w-2/4 w-full h-96 relative shadow-2xl border">
<Image 
          fill
          style={{objectFit:'cover'}}
         alt=''
         src='/section33.png' 
          />
    </div>
   
</div>
<div className='md:mt-28 mt-20 mb-5 md:mb-10' id='features'>
<p className='text-center text-3xl font-semibold'>Features</p>
</div>
{/* SECTION 4 */}
    <div className="container flex flex-col lg:flex-row items-center md:gap-30 gap-5 mt-5 lg:mt-10 justify-between mb-5" >
        <div className="flex flex-col items-center">
            <CgAddR size={25}/>
            <p className="font-bold text-center text-lg">Create a digital catalog</p>
            <p className="text-center text-black">Easily create a digital catalog, add your store name and logo and you're good to go. </p>
        </div>

        <div className="flex flex-col items-center" >
            <PiImagesSquareBold size={25}/>
            <p className="font-bold text-center text-lg">Add your products</p>
            <p className="text-center text-black">Add as many products or services as you want. Give them an image, product description and price.</p>
        </div>

        <div className="flex flex-col items-center">
            <HiShare size={25}/>
            <p className="font-bold text-center text-lg">Share with your customers</p>
            <p className="text-center text-black">Share your digital catalog with your customers via link, social media or QR code</p>
        </div>
    </div>

<div className='md:mt-28 mt-20 mb-5 md:mb-10' id='pricing'>
<p className='text-center text-3xl font-semibold'>Pricing</p>
</div>

{/* SECTION 5 */}
    <div className="container flex flex-col lg:flex-row items-center justify-center mt-5 md:gap-10 gap-5">
    <div className="shadow p-5 rounded-lg border-t-4 border-[#000000] bg-white md:w-1/3 w-full">
    <p className="uppercase text-sm font-medium">
      Starter
    </p>

    <p className="mt-4 text-3xl font-medium">
      Free
    </p>

    <div className="mt-8">
      <ul className="grid grid-cols-1 gap-4">
        <li className="inline-flex items-center">
          <svg className="w-4 h-4 mr-2 fill-current text-[#000000]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
          </svg>

          Create 1 digital catalog
        </li>

      </ul>
    </div>

    <div className="mt-8 flex justify-center items-center">
        <Link href="/auth/sign-up" className='px-3 py-2 rounded-lg w-full text-white font-bold text-center hover:text-white bg-[#000000]'>
        Sign Up
        </Link>
    </div>
  </div>



  <div className="shadow p-5 rounded-lg border-t-4 border-[#ffb31f] bg-white md:w-1/3 w-full">
    <p className="uppercase text-sm font-medium">
      Business
    </p>

    <p className="mt-4 text-3xl font-medium">
      $15 <span className="text-base font-normal">/month</span>
    </p>


    <div className="mt-8">
      <ul className="grid grid-cols-1 gap-4">
        <li className="inline-flex items-center">
          <svg className="w-4 h-4 mr-2 fill-current text-[#ffb31f]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
          </svg>

          Create unlimited digital catalogs
        </li>

      </ul>
    </div>

    <div className="mt-8 flex justify-center items-center">
      {/* <button className="bg-[#000000] hover:bg-[#686868] px-3 py-2 rounded-lg w-full text-white"> */}
        <Link href="/auth/sign-up" className='px-3 py-2 rounded-lg w-full focus:ring-4 text-white font-bold text-center hover:bg-[#686868] bg-black'>
                                
        Sign Up
        </Link>
      {/* </button> */}
    </div>
  </div>

    </div>

{/* SECTION 6 */}
<div className='md:mt-28 mt-16 mb-5 md:mb-10'>
<p className='text-center text-3xl font-semibold'>Get started today!</p>
</div>
    <div className="container flex flex-col lg:flex-row items-center mt-5 lg:mt-10 justify-center md:space-x-5 mb-10 gap-2">
        
    <Link href="/api/auth/signin" className='px-8 py-3 rounded-lg font-bold outline outline-gray-300 hover:outline-black'>Sign In</Link>
                      <Link className='font-bold text-white bg-black hover:bg-[#686868] focus:outline-none focus:ring-4 rounded-lg px-12 py-3 text-center' href="/auth/sign-up">Sign Up</Link>
                      {/* bg-black text-white hover:bg-[#686868] focus:ring-4 focus:outline-none */}
    </div>

        </section>
        

        <section className="relative border-t bg-white">
    <div className=" container flex flex-col lg:flex-row items-center md:gap-30 mt-5 mb-5 justify-between">
        <div className="flex flex-col items-center">
            <p className="font-bold text-center text-courseassist-orange text-lg">Contact</p>
            <div className='flex flex-row items-center'>
            <p className="text-center text-black">whinst.zm@gmail.com</p>
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
            <div className='flex flex-row items-center '>
         
           <a href='https://www.instagram.com/_courseassist/?igshid=ZDdkNTZiNTM%3D' target="_blank"  rel="noreferrer noopener"><p className="text-center text-black pl-1">_courseassist</p></a>
            </div>
            <div className='flex flex-row items-center '>
       
           <a href='https://www.facebook.com/profile.php?id=100094626365981&mibextid=ZbWKwL' target="_blank"  rel="noreferrer noopener"><p className="text-center text-black pl-1">Course Assist</p></a>
            </div>
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