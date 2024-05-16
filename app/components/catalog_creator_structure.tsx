'use client'
import Link from 'next/link';
import { useState,MouseEvent, useEffect,useRef } from "react";
import { BeakerIcon,PlusIcon,EyeIcon,PaperAirplaneIcon,TrashIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { redirect, useParams,useRouter } from 'next/navigation'
import HomeComponent from './home';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import dynamic from "next/dynamic";
import ShareModal from './share_modal';
import { Currencies } from './currencies';
import  QRCode from "qrcode";
import slugify from "react-slugify"



interface CatalogProperties {
    catalog_name:string,
    user_id:number,
    store_logo:string
  }

interface productProps {
    id:number,
    product_name:string,
    product_description:string,
    product_price:number,
    product_qty:number,
    unique_id:string,
    product_image:string,
    video_thumbnail:string
    image_url:string
  }
  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }


export default function CatalogCreatorStructure(props:any){
    const params = useParams()
    const router = useRouter()
   // const [data,setData] = useState<{catalog_name:string,user_id:number,store_logo:string}>({catalog_name:'',user_id:0,store_logo:''});
  //  const [products,setProducts] = useState<productProps[]>([]);
  const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [twobytwo,setTwobytwo] = useState(false)
    var loadingState = false
    const [isImageLoading,setIsImageLoading] = useState(false);
    const [isloading,setIsLoading] = useState(false);
    const [isLoadingSave,setIsLoadingSave] = useState(false)
    const [isLoadingName,setIsLoadingName] = useState(false)
    const [isLoadingCurrency,setIsLoadingCurrency] = useState(false);
    const [showModal,  setShowModal] = useState(false)
    const [catalogDetailModal,setShowCatalogDetailModal] = useState(false)
    const [isOwner,setIsOwner] = useState(false);
    const [file,setFile] = useState('' as any);
    const fileInput = useRef<any>()
    const [refresh,setRefresh] = useState(false);
    //const [currency,setCurrency] = useState('' as any)
    const [qr_code,setQr_code] = useState("")
    //const [isloading,setIsLoading] = useState(true);
    const catalogViewState = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault
        if(twobytwo){
            setTwobytwo(false)
        }else{
            setTwobytwo(true)
        }
    }


    const handleClick =(e: MouseEvent<HTMLButtonElement>)=>{
        if(fileInput.current){
          fileInput.current.click()
          
        }
      }

// const doThat=()=>{
//     setIsLoading(false)
// }
const products: productProps[] = props.props
const data: any = props.props1.catalog
const catalog_logo = props.props1.catalog_logo
// if(!props.prop1){
//     doThat()
// }

const catalog_name:any = slugify(data.catalog_name)

//setIsLoading(props.props2)
const catalog_id: any = `https://www.whinst.com/catalog_viewer/${catalog_name}/${params.catalog_id}`

// const generateQRCODE =()=>{
//      QRCode.toDataURL(
//         catalog_id,
//             (err,url)=>{
//                 setQr_code(url)
//                 // setQr_code(url)
//                 // if(err) return err
//             }
//         )

// }




    const deleteProduct=async(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault
        await fetch(`https://whinst-backend.cyou/delete-catalog/${params.catalog_id}/`,{
            method:'DELETE',
        }).then((data=>data.json()))
        .then((res:any)=>{
            router.push(`/home/`)
            router.refresh()
        })
        .catch((error:any)=>{
        })
     }

    const deleteStoreLogo=async(e: MouseEvent<HTMLButtonElement>)=>{
          //Loading indicator set to true here
         setIsLoading(true)
        e.preventDefault
        fetch(`https://whinst-backend.cyou/delete-store-logo/${params.catalog_id}/${data.store_logo}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
        }).then((data=>data.json()))
        .then((res:any)=>{
           router.refresh()
           setFile('')
        })
        .catch((error:any)=>{
        })
    }

    const AddImage = async (e: MouseEvent<HTMLButtonElement>)=>{
          //Loading indicator set to true here
        if(file != ''){
        setIsLoadingSave(true)
        e.preventDefault
        const formData = new FormData()
        formData.append('store_logo',file)
        await fetch(`https://whinst-backend.cyou/change-store-logo/${params.catalog_id}`,{
            method:'PUT',
            body:formData,
        }).then((data=>data.json()))
        .then((res)=>{
          
            router.refresh()
       //REFRESH PAGE HERE
        })
        .catch((error:any)=>{
           
        })
    }
      
      }


      const editCatalogName=async(props:any)=>{
              //Loading indicator set to true here
            setIsLoadingName(true)
            await fetch(`https://whinst-backend.cyou/edit-catalog-details/${params.catalog_id}/`,{
                method:'PUT',
                body:JSON.stringify({
                    catalog_name:props.catalog_name,
                    phone_number:props.phone_number,
                    email:props.email
                }),
                headers:{
                    'Content-Type': 'application/json',
                }
            }).then((data=>data.json()))
            .then((res:any)=>{
                router.refresh()
            
              setIsLoadingName(false)
          }) .catch((error:any)=>{
         
        })
 
     
}

if(isloading){
   
    if(data.store_logo == null){
        setIsLoading(false)
     
    }
}

if(isLoadingSave){
   
    if(data.store_logo != null){
        setIsLoadingSave(false)
      
    }
}

// if(isLoadingName){
//     if(data.catalog_name){
//         setIsLoadingName(false)
//     }
// }

//const products: productProps[] = props.props
//const data: any = props.props1

    useEffect(()=>{
        QRCode.toDataURL(
            catalog_id,{
                width:800,
                margin:2,
            }).then(setQr_code)

    },[])

    

const validationSchema = Yup.object({
    catalog_name: Yup.string().required('Required'), 
    email: Yup.string().email('Invalid email address'),
  })



const handleFile=async(e:any)=>{
    setFile(e.target.files[0])
  }

  const doThis =()=>{

  }
 
  const initialValues = {catalog_name:data.catalog_name,phone_number:props.props1.catalog.phone_number,email:props.props1.catalog.email}


  const CatalogDetails=()=>{
    const [currency,setCurrency] = useState('' as any)
      
  const handleSelect=(e:any)=>{
    setCurrency(e.target.value)
  }

  const editStoreCurrency=async()=>{
    if(currency != data.currency){
        //Loading indicator set to true here
        setIsLoadingCurrency(true)
  await fetch(`https://whinst-backend.cyou/edit-catalog-currency/${params.catalog_id}/`,{
      method:'PUT',
      body:JSON.stringify({
          currency:currency,
      }),
      headers:{
          'Content-Type': 'application/json',
      }
  }).then((data=>data.json()))
  .then((res:any)=>{
      router.refresh()
     setIsLoadingCurrency(false)
}) .catch((error:any)=>{
})
  }
  }
    return(
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 bg-opacity-75 bg-gray-500 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
           
            <div className="pb-10 relative bg-white rounded-lg shadow  text-wrap max-w-full">
              
                <div className="flex items-center justify-between rounded-t  ">
                    <button onClick={()=>setShowCatalogDetailModal(false)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="default-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center w-full break-words">
                  Edit catalog information
                </h3>


                <div className="flex flex-col justify-center items-center">
             

             {
                 catalog_logo == null ? (<>
                 <div className='flex flex-col justify-center items-center'>
                 <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Store Logo</p>
                 {
         file != '' ? (<>
         <div className='w-screen flex flex-col justify-center items-center md:flex md:justify-center'>
<div className='border aspect-square w-48 relative pl-2 pr-1'>
  <Image
      fill
      style={{objectFit:'cover'}}
      src={
        URL.createObjectURL(file)
      } alt="" />
</div>
{
 isLoadingSave ? (<div className='p-2'>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                         </svg>
 </div>):(<>
     <div className='flex flex-row justify-center space-x-2 p-2 '>
      <button onClick={clearFile} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
              Remove
        </button>
        <button onClick={AddImage} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                             Save logo
                         </button>
</div>
 </>)
}

</div>
         </>):(<>
           <div>
  
     <button onClick={handleClick} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                 Upload image
                </button>
<input type='file' name='store_logo' onChange={handleFile} accept='image/*' onClick={(e:any)=>{
                 e.target.value = null
                }} ref={fileInput} style={{display: 'none'}}/>
        

</div>
         </>)
       }

                 </div>
                 </>):(
                     <>
                     <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Store Logo</p>
             <div className="border w-28 h-24 mt-2 m-2 md:m-2 md:h-40 md:w-44 relative bg-white">
             <Image 
       fill
       style={{objectFit:'cover'}}
      alt=''
      src={catalog_logo}
       />
      
             </div>

             {
                 isloading ? (
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>):(    <button onClick={deleteStoreLogo} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                 Delete logo
                 </button>)
             }
                     </>
                 )
             }
             </div>



                <Formik initialValues={initialValues}   
 onSubmit={(values:any)=>editCatalogName(values)}
validationSchema={validationSchema}
enableReinitialize ={true}
>

    {({errors,touched})=>(
        <Form>
              <div className="flex flex-col justify-center items-center">
      <div className='w-11/12 md:w-4/6'>
             <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Store Name</p>
            <Field id='catalog_name' name='catalog_name' placeholder='Catalog name' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
            {errors.catalog_name && touched.catalog_name ? (
               <p>Enter a catalog name</p>
                           ): null}
  <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</p>
<Field id='phone_number' name='phone_number' placeholder='Store phone number' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>


<p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Email</p>
<Field id='email' name='email' placeholder='Store email' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
{errors.email && touched.email ? (
               <p>Invalid email</p>
                           ): null}
          




                           {/* <div className='pt-2'>
                           <button type="submit" className="mb-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 focus:outline-none focus:ring-blue-300">Edit name</button>
                           </div> */}
   
        
            </div>
            </div>

            <div>

            </div>

            <div className='flex justify-center items-center mt-2'>
            {
                            isLoadingName ? (
                                <div className='pt-2'>
                                       <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                                </div>
                             
                            ):(
                                 
                                <div>
                                <button type="submit" className="ml-2 px-3 py-2 h-10 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">Edit details</button>
                                </div>
                            )
                        }

            </div>

       
        </Form>        
    )}

</Formik>



                <div className='flex flex-col justify-center items-center m-2'>
<div >
<label  className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Catalog currency</label> 
<div className='flex flex-row'>
<div id="states-button" className="flex-shrink-0 border-2 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
    {
        
        props.props1.catalog.currency == '' ? (<>
        -
        </>):(<>
            {props.props1.catalog.currency}
        </>)
    }
 
      </div>
    
<div>

<select id="countries"  onChange={handleSelect} className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 dark:border-s-gray-700 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
  <option defaultValue={''} value={''}>Choose a currency</option>
    {
      Currencies.map(currency =>(<>
        <option value={currency.value}>{currency.label}</option>
      </>
      ))
    }
  </select>
</div>
</div>


  
</div>
<div className='pt-2'>
                           <button type="submit" onClick={editStoreCurrency} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">Edit currency</button>
                           </div>
</div>




            </div>
        </div>
    </div>
    )
  }

  const DeleteDialogBox=()=>{
    return(
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
      
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-6">
        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal" onClick={()=>{
           setShowDeleteModal(false)
        }}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
        <div className="p-4 md:p-5 text-center">
            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Delete Catalog?</h3>
            <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2" onClick={deleteProduct}>
                Yes
            </button>
            <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=>{
           setShowDeleteModal(false)
        }}>No, go back!</button>
        </div>
    </div>
          </div>
        </div>
      </div>
     
    )
     }

     const clearFile =()=>{
        setFile('')
      }

    
    

    return(
      

        <>
               
      <div className="flex flex-row justify-between items-center m-2 ">

        {/* FOR LARGE SCREENS */}
        <div className="flex flex-row justify-evenly items-center space-x-2  hidden md:block">
               {/* bg-black text-white hover:bg-[#686868] focus:ring-4 focus:outline-none */}
<Link href={`/catalog_viewer/${catalog_name}/${params.catalog_id}/`} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 ">
<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
<EyeIcon className='h-5 w-5 mr-1'/>
<span>
View
</span>
</Link>
        {
                twobytwo ? (
                    <button onClick={catalogViewState} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>

 2 x 2
</button>
                ):(
                    <button onClick={catalogViewState} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    
                     3 x 3
                    </button>
                )
            }
        </div>
       
        <div className="flex flex-row justify-evenly items-center space-x-2  hidden md:block">
            
<button onClick={()=>setShowModal(true)} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
<PaperAirplaneIcon className='h-5 w-5 mr-1'/>
 Share
</button>

<button onClick={()=> setShowDeleteModal(true)} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 ">
<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
<TrashIcon className='h-5 w-5 mr-1'/>
 Delete
</button>
            </div>



            {/* FOR SMALL SCREENS */}

<div className="flex flex-row justify-evenly items-center space-x-2  block md:hidden">
<Link href={`/catalog_viewer/${catalog_name}/${params.catalog_id}/`} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
<EyeIcon className='h-5 w-5'/>
</Link>
        {
                twobytwo ? (
                    <button onClick={catalogViewState} className="px-3 py-2 text-sm font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
<path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
<path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>

 2 x 2
</button>
                ):(
                    <button onClick={catalogViewState} className="px-3 py-2 text-sm font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    
                     3 x 3
                    </button>
                )
            }
        </div>


        <div className="flex flex-row justify-evenly items-center space-x-2 block md:hidden">
            
            <button onClick={()=>setShowModal(true)} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            <PaperAirplaneIcon className='h-5 w-5'/>
            </button>
            
            <button onClick={()=> setShowDeleteModal(true)} className="px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
            <TrashIcon className='h-5 w-5'/>
       
            </button>
                        </div>
      </div>

     
            <div className="flex flex-col justify-center items-center">
            <h3 className="text-xl font-bold text-gray-900 text-center w-full break-words">
                 {data.catalog_name}
                </h3>

                {
                    catalog_logo == null ? (<>
                    <div className='flex flex-col justify-center items-center'>
                    {
            file != '' ? (<>
            <div className='w-full flex flex-col justify-center items-center md:flex md:justify-center'>
 <div className='border aspect-square w-48 relative pl-2 pr-1'>
     <Image
         fill
         style={{objectFit:'cover'}}
         src={
           URL.createObjectURL(file)
         } alt="" />
 </div>
</div>
            </>):(<>
            <div className='w-full flex flex-col justify-center items-center md:flex md:justify-center'>
            <div className='border w-28 h-24 mt-2 m-2 md:m-2 md:h-40 md:w-44 relative bg-white'>
            <Image 
              fill
              style={{objectFit:'cover'}}
               alt=''
               src='/placeHolder3.png'
                />
            </div>
            </div>
            </>)
          }
                    {/* <input type='file' name='store_logo' onChange={handleFile}/>
                    {
                        file != '' ? (<>
                        {
                            isLoadingSave ? (
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            ):(
                                <button onClick={AddImage} className="mb-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 focus:outline-none focus:ring-blue-300">
                                Save logo
                            </button>
                            )
                        }
                        
                        </>):(<></>)
                    } */}

                    </div>
                    </>):(
                        <>
                <div className="border w-28 h-24 mt-2 m-2 md:m-2 md:h-40 md:w-44 relative bg-white">
                <Image 
        fill
        style={{objectFit:'cover'}}
         alt=''
         src={catalog_logo}
          />
         
                </div>

                        {/* <button onClick={deleteStoreLogo} className="mb-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 focus:outline-none focus:ring-blue-300">
                         Delete logo
                         </button> */}
{/* 
                         <button className="mb-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 focus:outline-none focus:ring-blue-300">
                            <div role="status">
                               <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                   <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                               </svg>
                            </div>
                         </button> */}
                        </>
                    )
                }
                </div>
                <div className='flex flex-col justify-center items-center space-between gap-1 w-full'>
                    <div className='flex flex-row text-lg w-full justify-center pl-2 pr-2'>
                    <p>store currency:</p>
                    <p className='font-bold'> {props.props1.catalog.currency}</p>
                    </div>

                    <div className='flex flex-row text-lg w-full justify-center pl-2 pr-2'>
                    <p>phone number:</p>
                    <p className='font-bold'>{props.props1.catalog.phone_number}</p>
                    </div>

                    <div className='flex md:flex-row text-lg w-full justify-center pl-2 pr-2'>
                    <p>email: </p>
                    <p className='font-bold truncate'>{props.props1.catalog.email}</p>
                    </div>
                
                </div>
<div className='flex justify-center items-center mt-2'>
<button onClick={()=>setShowCatalogDetailModal(true)} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                            Edit catalog details
                            </button>
</div>
           
                
              {/* Currency */}
              {/* Store Name */}
                

{
    twobytwo ? ( <>
      {/* <div className='w-screen md:flex md:justify-center'>
    <div  className=" grid grid-cols-3 md:w-4/5 divide-x">
    <div className="border aspect-square relative"> */}

        <div className='w-full flex justify-center md:flex md:justify-center mt-8'>
            <div  className="grid grid-cols-2 md:w-3/5 w-full">

                {
                    products.map(product=> <>

                <Link href={`/edit_product/${params.catalog_id}/${product.id}`}>
               <div>
                <div className="border aspect-square relative bg-white">
                  {
                    product.product_image != null && product.product_image.split('.').pop() == 'mp4' ? (
                        <>
                        <video
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
                        {
                            product.image_url != null ? (       <Image 
                                fill
                                style={{objectFit:'cover'}}
                               alt=''
                               src={product.image_url}
                                /> ):(
                                    <Image 
                                    fill
                                    style={{objectFit:'cover'}}
                                   alt=''
                                   src='/placeHolder3.png'
                                    /> 
                                )
                        }
                       
                       </>)
                  }
                  </div>
                <div className="m-2">
                    <p className="truncate font-bold">{product.product_name}</p>
                    <p className="truncate font-bold">{props.props1.catalog.currency}{product.product_price}</p>
                </div>
                </div>
                
                </Link> 
                        </>)
                  }  







                <Link href={`/add_product/${params.catalog_id}`}>
                <div>
                <div className="flex justify-center items-center border aspect-square bg-white">
                <PlusIcon className="h-28 w-28 " />
                </div>
                {/* <div className="border-2 w-44 h-20 mt-2 md:m-2 md:w-72"></div> */}
                </div>
                <p className='font-bold m-2'>Create new</p>
                </Link>


                

                </div>
            </div>
   </> ):(<>
{/* 
    <div className='w-screen md:flex md:justify-center border-2'>
         <div className='flex grid grid-cols-3 divide-x'>
            <div className='bg-black relative aspect-square'></div> */}
    <div className='w-full md:flex md:justify-center mt-8'>
    <div  className=" grid grid-cols-3 md:w-4/5">

{
    products.map(product=><div key={product.id}>

<Link href={`/edit_product/${params.catalog_id}/${product.id}`} key={product.id}>    
<div className="border aspect-square relative bg-white">
    {

      
product.product_image != null && product.product_image.split('.').pop() == 'mp4' ? (
            <>
<video
autoPlay={true}
style={{
height:'100%',
width:'100%'
}}
loop={true}
muted={true}
src={`http://localhost:5000/media/${product.product_image}`}
/>
           
            </>
        ):(<>

{
                            product.image_url != null ? (                   <Image 
                                fill
                                style={{objectFit:'cover'}}
                                loading='lazy'
                                alt=''
                                src={product.image_url}
                                className={cn(
                                    'duration-700 ease-in-out group-hover:opacity-75',
                                    isImageLoading
                                      ? 'scale-110 blur-2xl grayscale'
                                      : 'scale-100 blur-0 grayscale-0'
                                  )}
                                  onLoadingComplete={()=>setIsImageLoading(false)}
                                />   ):(
                                    <Image 
                                fill
                                style={{objectFit:'cover'}}
                                   alt=''
                                   src='/placeHolder3.png'
                                    /> 
                                )
                        }

        </>)
    }

</div>
<div className="p-2">
    <p className="truncate font-bold">{product.product_name}</p>
    <p className="truncate font-bold">{props.props1.catalog.currency}{product.product_price}</p>
</div>
</Link>
    </div>)
}

<Link href={`/add_product/${params.catalog_id}`}>
<div>
<div className=" flex justify-center items-center border aspect-square relative bg-white">
<PlusIcon className="h-28 w-28 " />
</div>
{/* <div className="border-2 xxxs:h-20 xxxs:w-30 xs:w-34 xs:h-20 mt-2 md:m-2 md:w-72"></div> */}
</div>
<p className='font-bold m-2'>Create new</p>
</Link>


</div>
</div>


{/* <div className='w-screen md:flex md:justify-center border-2'>
         <div className='flex grid grid-cols-3 divide-x'>
            <div className='bg-black relative aspect-square'>
             
            <Image 
           layout='fill'
           objectFit='cover'
         alt=''
         src={`http://localhost:5000/media/170860710891220231127_205419.jpg`}
          />
            </div>
            <div className='bg-black relative aspect-h-2'>
            <Image 
           layout='fill'
           objectFit='cover'
         alt=''
         src={`http://localhost:5000/media/170860710891220231127_205419.jpg`}
          />
          
            </div>
            <div className='bg-black relative aspect-h-2'>
            <Image 
           layout='fill'
           objectFit='cover'
         alt=''
         src={`http://localhost:5000/media/170860710891220231127_205419.jpg`}
          />
          
            </div>
         </div>
 </div> */}

    </>)
}
           

    <ShareModal isVisible={showModal} onClose={()=>setShowModal(false)} link={params.catalog_id} qr_code={qr_code} catalog_name={data.catalog_name}/>
    {
  showDeleteModal ? (<>

  <DeleteDialogBox/>

  </>):(<></>)
 }
{
    catalogDetailModal ? (<>
    <CatalogDetails/>
    </>):(<></>)
}
    </> 
    )
}