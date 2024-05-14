'use client'
import { Formik ,Field, Form, } from 'formik';
import { useParams } from 'next/navigation'
import { useState,MouseEvent, useEffect,useRef } from "react";
import * as Yup from 'yup';
import { useRouter } from 'next/navigation'
import dynamic from "next/dynamic";
import ReactPlayer from 'react-player'
const VideoPlayer = dynamic(() => import("react-player/lazy"), {ssr: false});
import Link from 'next/link';
import Image from 'next/image'


interface ProductForm {
    product_name:string,
    product_description:string,
    product_price:number,
    product_qty:number,

}

const validationSchema = Yup.object({
    product_name: Yup.string().required('Required'),  
  })

interface ProductProperties{
product_name:string
product_description:string
product_price:number
product_qty:number
product_image:string
  }


export default function EditProductClient(props:any){
    const params = useParams()
    const router = useRouter()
   // const [media,setMedia] = useState();
    const [videoState,setVideoState] = useState(true);
    const [images, setImages] = useState([] as any);
    const [status, setStatus] = useState("IDLE");
    const [file,setFile] = useState('' as any);
    const [showModal,SetShowModal] = useState(false)
    const [isloading,setIsLoading] = useState(false);
    const [isLoadingSave,setIsLoadingSave] = useState(false)
    const [isLoadingEdit,setIsLoadingEdit] = useState(false)
    const fileInput = useRef<any>()
  //  const [data,setData] = useState<{product_name:string,product_description:string,product_price:number,product_qty:number,}>
 //   ({product_name:'',product_description:'',product_price:0,product_qty:0,});


 const handleClick =(e: MouseEvent<HTMLButtonElement>)=>{
  if(fileInput.current){
    fileInput.current.click()
    
  }
}

    const onInput = async (event:any) => {
        setImages([]);
        setStatus("LOADING");
    
        const [file] = event.target.files;
        const fileUrl = URL.createObjectURL(file);
    
        setStatus("IDLE");
        setImages(frames);
      };

      // const getTime=()=>{
      //   let now = new Date();
      //   return now
      // }
      const data: any = props.props.main

     const onSubmit=async(props:ProductForm)=>{
        setIsLoadingEdit(true)
        await fetch(`http://165.227.114.6/edit-product/${params.product_id}/`,{
            method:'PUT',
            body:JSON.stringify({
                product_name:props.product_name,
                product_description:props.product_description,
                product_price:props.product_price,
                product_qty:props.product_qty
            }),
            headers:{
                'Content-Type': 'application/json',
            }
        }).then((data=>data.json()))
        .then((res:any)=>{
          //Successful notification
          router.refresh()
           
        })
        .catch((error:any)=>{
           
        })
     }

     const deleteProduct=async(e: MouseEvent<HTMLButtonElement>)=>{

        e.preventDefault
        await fetch(`http://165.227.114.6/delete-product/${params.product_id}/`,{
            method:'DELETE',
            body:JSON.stringify({
              filename:data.product_image
            }),
            headers:{
              'Content-Type': 'application/json',
          }
        }).then((data=>data.json()))
        .then((res:any)=>{
            router.push(`/catalog_creator/${params.catalog_id}/`)
            router.refresh()
        })
        .catch((error:any)=>{
           
        })
     }


  const deleteProductMedia=async(e: MouseEvent<HTMLButtonElement>)=>{
    setIsLoading(true)
      //Loading indicator set to true here
    e.preventDefault
    fetch(`http://165.227.114.6/delete-product-media/${params.product_id}/${data.product_image}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
    }).then((data=>data.json()))
    .then((res:any)=>{
    
       router.refresh()
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
formData.append('product_image',file)
await fetch(`http://165.227.114.6/change-product-media/${params.product_id}`,{
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
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Delete product?</h3>
          <button data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2" onClick={deleteProduct}>
              Yes
          </button>
          <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={()=>{
         SetShowModal(false)
      }}>No, go back!</button>
      </div>
  </div>
        </div>
      </div>
    </div>
      )

     }

     const PlayOrPause=async(e: MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault
        if(videoState){
           setVideoState(false)
        }else{
            setVideoState(true)
        }
     }

     const time: any = props.props.side
     //const data: any = props.props.main
     var media = null
     if(data != null){
      var media = props.props.url
     }
    

     if(isloading){
    //  console.log('loading')
      if(data.product_image == null){
          setIsLoading(false)
       //   console.log('not loading')
      }
    }

    if(isLoadingSave){
    
      if(data.product_image != null){
          setIsLoadingSave(false)
          setFile('')
          
      }
  }





  

  


    useEffect(()=>{
     
        
      //  console.log(data)
        setIsLoadingEdit(false)
    },[data.product_name,data.product_description,data.product_price,data.product_qty,time])


    const word = 'euefhe8ufhe8'
    const test = {
        
      id:1,
      first_name:'Andyson',
      last_name:'Mupeta'
  }
    const initialValues = {product_name:data.product_name,product_description:data.product_description, product_price:data.product_price,product_qty:data.product_qty}

    const handleFile=async(e:any)=>{
  
      setFile(e.target.files[0])
    }

    const clearFile =()=>{
      setFile('')
    }


    return(

        <div>
{
  media == null ? (<>
  {
    file == '' ? (<>
    <div className='flex items-center justify-center'>
    <button onClick={handleClick} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 mt-8">
    Upload Image
    </button>
    </div>

  <input type='file' name='store_logo' onChange={handleFile} accept='image/*' onClick={(e:any)=>{
                    e.target.value = null
                   }} ref={fileInput} style={{display: 'none'}}/>
    </>):(<>
      <div className='flex flex-col justify-center items-center mt-8'>
        <div className='w-screen flex justify-center items-center mt-1'>

        
 <div className='border aspect-square w-11/12 md:w-1/3 relative'>
     <Image
         layout='fill'
           objectFit='cover'
         src={
           URL.createObjectURL(file)
         } alt="" />
 </div>

   </div>
   
   <div className='flex flex-row justify-center space-x-2 pt-2 '>
     
     {
       isLoadingSave ? (
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
       ):(
        <>
           <button onClick={AddImage} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                          Save image
                      </button>
  
                      <button onClick={clearFile} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4" >
                   Remove
             </button>
        </>
       )
     }
     
     </div>
</div>
    

    </>)
  }
 
  </>):(
    <>

    
{
                    isloading ? (
                      <div className='flex justify-center mt-8'>
 <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                       </svg>
                      </div>
                      ):(   
                        <div className='flex justify-center mt-8'>
                        <button onClick={deleteProductMedia} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">Delete Image</button>
                        </div>
                        )
                }
    
   
      {
        media != null && media.split('.').pop() == 'mp4' ? (
          <div className='flex flex-col justify-center items-center'>
            <div className='w-screen flex justify-center items-center mt-1'>
<div className='border aspect-square w-11/12 md:w-1/3 relative pl-2 pr-1 '> 
<video
       className="VideoInput_video"
       autoPlay={true}
       style={{
         height:'100%',
        width:'100%'
       }}
       loop={true}
       src={media}
       
     />
</div>
     </div>
     {/* <div>
     <button className="m-1" onClick={PlayOrPause}>
      {
          videoState ? (<> Pause
          </>) : (<>
          Play
          </>)
      }
      </button>

     </div> */}
          </div>
        ):(
          <div className='flex flex-col justify-center items-center'>
          <div className='w-screen flex justify-center items-center mt-1'>
          <div className='border aspect-square w-11/12 md:w-1/3 relative'>
          <Image 
           layout='fill'
           objectFit='cover'
         alt=''
         src={media}
          />
          </div>
          </div>
          </div>
        )
      }
   
    </>
  )
}

   {/* <label>
  {status === "IDLE" ? (
    "Choose file"
  ) : (
    <p>Loading....</p>
  )}
  <input
    type="file"
    className="visually-hidden"
    accept="video/*"
    onChange={onInput}
  />

{images?.length > 0 && (
  <div className="output">
    {images.map((imageUrl:any, index:any) => (
      <a
        key={imageUrl}
        href={imageUrl}
        download={`${now}-${index + 1}.png`}
      >
        <span >
          Download image number {index + 1}
        </span>
        <img src={imageUrl} alt="" />
      </a>
    ))}
  </div>
)}

</label> */}
{/* <GetData props={initialValues}/> */}
 <Formik
 initialValues={initialValues}
 onSubmit={(values)=>onSubmit(values)}
 validationSchema={validationSchema}
 enableReinitialize ={true}
 >
  {({errors,touched})=>(
     <Form>
     <div className="flex flex-col justify-center items-center">
      <div className='w-11/12 md:w-4/12'>

        <div className='m-2'>
<label>Product Name</label>
      <Field id='product_name' name='product_name' placeholder='Product name'  className='border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none'/>
      {errors.product_name && touched.product_name ? (
     <div><p className='text-sm text-red-600 text-center'>
     </p>
     </div>
    ): null}
        </div>
      
      <div className='m-2'>
      <label>Product Description</label>
      <Field id='product_description' name='product_description' placeholder='Product description' className='border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none'/>
      </div>
     
     <div  className='m-2'>
     <label>Product Price</label>
      <Field id='product_price' type='number' name='product_price' placeholder='Product price'  className='border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none'/>
     </div>
      
      <div className='m-2'>
      <label>Product Quantity</label>
      <Field id='product_qty' type='number' name='product_qty' placeholder='Product quantity'  className='border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none'/>
      </div>
     


      {
                    isLoadingEdit ? (
                      <div className='flex justify-center m-2'>
 <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                       </svg>
                      </div>
                      ):(   
                        <div className='m-2'>
                        <button type='submit'  className=' w-full mb-2 px-3 py-2 font-bold text-center items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4'>Edit</button>
                        </div>
                        )
    }
     

   


      </div>
     </div>
  </Form>
  )}
 </Formik>

 <div className="flex flex-col justify-center items-center">
      <div className='w-11/12 md:w-4/12'>
      <div className='m-2'>
     <button onClick={()=>{
  SetShowModal(true)
 }} className=' w-full mb-2 px-3 py-2 text-sm font-medium text-center items-center text-white bg-red-600 rounded-lg hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300'>
   Delete
 </button>
     </div>

      </div>
      </div>
 

 {
  showModal ? (<>
   <DeleteDialogBox/>
  </>):(<></>)
 }

   </div>

    )
}