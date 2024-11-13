'use client';
import {Field, Form, Formik} from 'formik';
import { BeakerIcon,PlusIcon } from '@heroicons/react/24/solid'
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image'
import { useState,useRef,MouseEvent, useEffect } from 'react';
import { Currencies } from './currencies';
import { initializePaddle, Paddle } from '@paddle/paddle-js';




interface ComponentProps {
    id: number,
    sub_date:string,
    email:string
  }

interface MyCreateCatalogForm {
    name:string,
    email:string,
    number:string
  }

  interface ResProps {
    id:string
  }



  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address'),
  })


  



export default function Create_Catalog(props:ComponentProps){
    const router = useRouter()
    const initialValues: MyCreateCatalogForm = {name:'',email:'',number:''};
    const [file,setFile] = useState('' as any);
    const fileInput = useRef<any>()
    const [isloading,setIsLoading] = useState(false);
    const [showPlanModal,setShowPlanModal] = useState(false)
    const [currency,setCurrency] = useState('' as any)
    const [paddle, setPaddle] = useState<Paddle>();
    const AUTH_TOKEN =  process.env.WHINST_TEST_API_KEY!

    const handleClick =(e: MouseEvent<HTMLButtonElement>)=>{
      if(fileInput.current){
        fileInput.current.click()
        
      }
    }

    async function getUser(){
      const res = await fetch(`https://whinst-backend.cyou/user/${props.id}/`)
      return res.json()
    }

    async function getUserCatalogs(){
      const res = await fetch(`https://whinst-backend.cyou/catalogs/${props.id}/`)
      return res.json()
    }    

    let todayDate = new Date().toJSON().slice(0, 10);

    const onSubmit = async (propsTwo:MyCreateCatalogForm)=>{
      const postive = true;
      const negative = false
      const userCatalogs = await getUserCatalogs()
      const user = await getUser()




   //   if(userCatalogs.length >= 1){
        if(user.paid == null){
          //Redirect
          setShowPlanModal(true)
        }else{
          if(userCatalogs.length = 1 && user.paid == 'starter'){
            openCheckout()
          }else{
            setIsLoading(true)
            let yes: any = props.id
            const formData = new FormData()
            formData.append('catalog_name',propsTwo.name)
            formData.append('user_id',yes)
            formData.append('store_logo',file)
            formData.append('default_catalog','false')
            formData.append('currency',currency)
            formData.append('phone_number',propsTwo.number)
            formData.append('email',propsTwo.email)
            await fetch('https://whinst-backend.cyou/create_catalog/',{
                method:'POST',
                body:formData,
            }).then((data=>data.json()))
            .then((res:ResProps)=>{
             
                if(res.id){
                    router.push(`/catalog_creator/${res.id}/`)
                }
                setIsLoading(false)
            })
            .catch((error:any)=>{
        
            })

          }
    
        }
  //    }else{
        // setIsLoading(true)
        // let yes: any = props.id
        // const formData = new FormData()
        // formData.append('catalog_name',propsTwo.name)
        // formData.append('user_id',yes)
        // formData.append('store_logo',file)
        // formData.append('default_catalog','true')
        // formData.append('currency',currency)
        // formData.append('phone_number',propsTwo.number)
        // formData.append('email',propsTwo.email)
        // await fetch('https://whinst-backend.cyou/create_catalog/',{
        //     method:'POST',
        //     body:formData,
        // }).then((data=>data.json()))
        // .then((res:ResProps)=>{
          
        //     if(res.id){
        //         router.push(`/catalog_creator/${res.id}/`)
        //     }
        //     setIsLoading(false)
        // })
        // .catch((error:any)=>{
        
        // })
   //   }




      
      
      }

 
      const handleFile=async(e:any)=>{
        setFile(e.target.files[0])
      }

      const handleSelect=(e:any)=>{
        setCurrency(e.target.value)
      }

      const clearFile =()=>{
        setFile('')
      }

      const email:any = props.email
  useEffect(() => {
    initializePaddle({ environment:'production', token:'live_3edebb0cc4e3e1563cdb445855a',pwCustomer:email,pwAuth:'de8947c0d1f32078fe5c4ea9cf7f61ba',eventCallback(event) {
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
      items: [{ priceId: 'pri_01hxxj5pqmdmdkdst1hg09pk9e', quantity: 1}],
      customer:{
        email:props.email
       
      },
      customData:{
        whinst_id: props.id
      }
      
    });
  };

  const starterCheckout=()=>{
    paddle?.Checkout.open({
      items: [{priceId: 'pri_01jcg83ccw1wpab31f6kj06v96', quantity: 1}],
      customer:{
        email:props.email
       
      },
      customData:{
        whinst_id: props.id
      }
      
    });
  }


  const SelectPlanModal=()=>{
    return(
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
   
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center ">
    
        <div className="relative bg-white rounded-lg shadow  p-6">
      <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=>{
       setShowPlanModal(false)
      }}>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
      </button>
      <h3 className="mb-5 text-lg font-normal text-black">Pick a plan</h3>

      <div className="container flex flex-col lg:flex-row items-center justify-center mt-5 md:gap-10 gap-5">

      <div className="shadow p-5 rounded-lg border-t-4 border-[#686868] bg-white md:w-1/3 w-full">
  <p className="uppercase text-sm font-medium">
    Starter
  </p>

  <p className="mt-4 text-3xl font-medium">
    $119
  </p>


  <div className="mt-8">
    <ul className="grid grid-cols-1 gap-4">
      <li className="inline-flex items-center">
        <svg className="w-4 h-4 mr-2 fill-current text-[#686868]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
        </svg>

        Create 1 digital catalog
      </li>

    </ul>
  </div>

  <div className="mt-8 flex justify-center items-center">
    {/* <button className="bg-[#000000] hover:bg-[#686868] px-3 py-2 rounded-lg w-full text-white"> */}
    <button onClick={starterCheckout} className='px-3 py-2 rounded-lg w-full focus:ring-4 text-white font-bold text-center hover:bg-[#686868] bg-black'>
                              
                              Buy Now
                              </button>
    {/* </button> */}
    
  </div>
</div>


<div className="shadow p-5 rounded-lg border-t-4 border-[#ffb31f] bg-white md:w-1/3 w-full">
  <p className="uppercase text-sm font-medium">
    Business
  </p>

  <p className="mt-4 text-3xl font-medium">
    $249
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
      <button onClick={openCheckout} className='px-3 py-2 rounded-lg w-full focus:ring-4 text-white font-bold text-center hover:bg-[#686868] bg-black'>
                              
      Buy Now
      </button>
    {/* </button> */}
    
  </div>
</div>



      </div>
  
  


     
  </div>
        </div>
      </div>
    </div>
    )

  }


    return(
        <div>
       
{/* <h2 className='text-center'>Create a new catalog</h2> */}
        <div className="flex flex-col justify-center items-center">
          {
            file != '' ? (<>
            <div className='w-screen flex flex-col justify-center items-center md:flex md:justify-center mt-8'>
 <div className='border aspect-square w-48 relative pl-2 pr-1'>
     <Image
         layout='fill'
           objectFit='cover'
         src={
           URL.createObjectURL(file)
         } alt="" />
 </div>
 <div className='flex flex-row justify-center space-x-2 p-2 '>
         <button onClick={clearFile} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                 Remove
           </button>
   </div>
</div>
            </>):(<>
              <div className='my-3'>
        <h1 className='text-center text-base leading-relaxed text-gray-500 dark:text-gray-400 italic'>Store Logo</h1>
        <button onClick={handleClick} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 ">
           {/* bg-black text-white hover:bg-[#686868] focus:ring-4 focus:outline-none */}
                    Upload image
                   </button>
<input type='file' name='store_logo' onChange={handleFile} accept='image/*' onClick={(e:any)=>{
                    e.target.value = null
                   }} ref={fileInput} style={{display: 'none'}}/>
           

</div>
            </>)
          }
     
<Formik initialValues={initialValues}   
 onSubmit={(values)=>onSubmit(values)}
validationSchema={validationSchema}>

    {({errors,touched})=>(
        <Form>
            <div className="flex flex-col justify-center items-center w-screen">
              <div className='w-11/12 md:w-1/3'>

              
              <div className='m-2 flex flex-col'>
              <label>Store Name</label>
            <Field id='name' name='name' placeholder='Store name' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
            {errors.name && touched.name ? (
                            <div>
                             <p className='text-sm text-red-600 text-center'>{errors.name}</p>
                              </div>
                           ): null}
            <label  className="block mt-2 text-sm font-medium text-gray-900">Currency</label>
  <select id="countries" defaultValue={''} onChange={handleSelect} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
  <option selected value={''}>Choose a currency</option>
    {
      Currencies.map(currency =>(<>
        <option value={currency.value} key={currency.value}>{currency.label}</option>
      </>
      ))
    }
  </select>

  <label>Email</label>
  <Field id='email' name='email' placeholder='Store email' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
  {errors.email && touched.email ? (
                            <div>{errors.email}</div>
                           ): null}

  <label>Phone Number</label>
<Field id='number' name='number' placeholder='Store phone number' type='number' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
          


                      {
                        isloading ? (   <div className='flex justify-center p-2'>
                              <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                          </div>
                       ):(
                      <button type='submit'  className='w-full mt-6 px-3 py-2 font-bold text-center items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4'>Create</button>
                        

                    
                    )
                      }
                  
              </div>
              
              </div>
            
       
            </div>
        </Form>        
    )}

</Formik>
            </div>


            {
  showPlanModal ? (<SelectPlanModal/>):(<></>)
}
        </div>
    )
}