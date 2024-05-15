'use client'
import Link from 'next/link';
import { useState,MouseEvent, useEffect } from "react";
import Image from 'next/image'
import Modal from './modal';
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import type { Metadata } from 'next'


interface productProps {
    id:number,
    product_name:string,
    product_description:string,
    product_price:number,
    product_qty:number,
    unique_id:string,
    product_image:string,
    video_thumbnail:string,
    image_url:string

  }

  interface indexData{
    index:number
  }

  
function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

export default function CatalogViewerClient(props:any){
    const [showModal,  setShowModal] = useState(false)
    const [twobytwo,setTwobytwo] = useState(false)
    const [indexnum,setIndex] = useState<any>()
    const [isLoading,setIsLoading] = useState(true);
    const [isOpen,setIsOpen] = useState(false)
    const [showContactModal,setShowContactModal] = useState(false)
    



    const products: productProps[] = props.props
    const data: any = props.props1.catalog
    const catalog_logo = props.props1.catalog_logo
    
    const catalogViewState = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault
        if(twobytwo){
            setTwobytwo(false)
        }else{
            setTwobytwo(true)
        }
    }

    const ModalDisplay =(props:any)=>{
        setIndex(props)
        setShowModal(true)
    }

    const ContactDialogBox=()=>{
        setIsOpen(false)
        return(
          <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
       
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        
          <div className=" fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
        
            <div className="md:w-2/4 w-full relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
          <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=>{
           setShowContactModal(false)
          }}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
          </button>
          <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">Contact Us</h3>
          <div className="p-4 md:p-5 text-center">
            <p>Phone</p>
            <p className='text-xl font-bold break-words'>{data.phone_number}</p>
        <div className='w-full justify-center'>  
        <p>Email</p>
            <p className='text-xl font-bold break-words'>{data.email}</p>
        </div>
           
          
          </div>
      </div>
            </div>
          </div>
        </div>
       
     
      )
      }


      


  
    return(
        <div className='flex flex-col min-h-screen bg-[#f5f5f5]'>
        <div className="flex flex-col justify-center w-full items-center">
        <div className="border-2 mt-2 relative w-28 aspect-square rounded-full overflow-hidden">
            {
                catalog_logo == null ? (<>
                 <Image 
          fill
          style={{objectFit:'cover'}}
         alt=''
         src='/placeHolder3.png'
          />
                </>):(<>
                    <Image 
          fill
          style={{objectFit:'cover'}}
         alt=''
         src={catalog_logo}
          />
                </>)
            }
        </div>
        <div className='w-full p-2 justify-center items-center flex'>
        <h1 className='font-bold md:text-2xl text-xl break-words'>{data.catalog_name}</h1>
        </div>
         
            <div className='flex flex-row space-x-3 p-1'>
            {
            twobytwo ? (
                <button className="m-1 px-3 py-2 text-sm font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4" onClick={catalogViewState} >3 x 3</button>
            ):(
                <button className="m-1 px-3 py-2 text-sm font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4" onClick={catalogViewState}>2 x 2</button>
            )
        }


        <button className="m-1 px-3 py-2 text-sm font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4" onClick={()=>setShowContactModal(true)}>
            Contact
        </button>

            </div>
          
        </div>
        <div className='mb-auto'>

{
twobytwo ? (
           <div className='w-full flex justify-center md:flex md:justify-center mt-8'>
        <div  className="grid grid-cols-2 md:w-3/5 w-screen">

            {
                products.map((product,index)=> <>
               
            <div>
            <div className="border aspect-square relative bg-white"  onClick={()=>{
                 setIndex(index)
                 setShowModal(true)
                 
            }}>

{
    product.product_image != null && product.product_image.split('.').pop() == 'mp4' ? (
        <>
        <video
          className="VideoInput_video"
          autoPlay={true}
          style={{
            height:'100%',
           width:'100%'
          }}
          loop={true}
          src={`http://localhost:5000/media/${product.product_image}`}
        />
        </>
    ):(
        <Image 
    fill
    style={{objectFit:'cover'}}
 alt=''
 src={product.image_url}
  />
    )
}
       
            </div>
            <div className="pb-2">
    <p className="truncate font-bold">{product.product_name}</p>
    <p className="truncate font-bold">{data.currency}{product.product_price}</p>
</div>
            </div>
                </>)
            }

            </div>
            
        </div>
):(<>

<div className='w-full md:flex md:justify-center mt-8'>
        <div  className=" grid grid-cols-3 md:w-4/5">

            {
                products.map((product,index)=><div key={index}>
                
            <div>
            {/* "aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8" */}
            <div className="border aspect-square relative bg-white" onClick={()=>{
                 setIndex(index)
                 setShowModal(true)
                 
            }}>


{
 product.product_image != null && product.product_image.split('.').pop() == 'mp4' ? (
<>
<video
          className="VideoInput_video"
          autoPlay={true}
          style={{
            height:'100%',
           width:'100%'
          }}
          loop={true}
          src={`http://localhost:5000/media/${product.product_image}`}
        />
</>

 ):(
    <>
        <Image 
      fill
      style={{objectFit:'cover'}}
     alt=''
     src={product.image_url}
     className={cn(
        'duration-700 ease-in-out group-hover:opacity-75',
        isLoading
          ? 'scale-110 blur-2xl grayscale'
          : 'scale-100 blur-0 grayscale-0'
      )}
      onLoadingComplete={()=>setIsLoading(false)}
      />

    </>
 )
}
            </div> 
<div className="pb-2">
    <p className="truncate font-bold">{product.product_name}</p>
    <p className="truncate font-bold">{data.currency}{product.product_price}</p>
</div>
            </div>            
                </div>)
            }

            </div>
        </div>
</>)

}
</div>
{indexnum != null ? (
     <Modal isVisible={showModal} onClose={()=>setShowModal(false)} product_image={products[indexnum].image_url} product_name={products[indexnum].product_name} product_price={products[indexnum].product_price} currency={data.currency} product_description={products[indexnum].product_description} product_quantity={products[indexnum].product_qty}/>
):(<></>)}

{
  showContactModal ? (<ContactDialogBox/>):(<></>)
 }
<div className='mt-5'>
  <p className='flex justify-center p-2'>Whinst</p>
</div>
    </div>
    )
}