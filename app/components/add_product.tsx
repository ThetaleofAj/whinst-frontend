'use client';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import { useRouter,useParams } from 'next/navigation'
import { useState,MouseEvent, useRef } from 'react';
import dynamic from "next/dynamic";
import Link from 'next/link';
import Image from 'next/image'
import {XMarkIcon} from '@heroicons/react/24/outline'
const VideoPlayer = dynamic(() => import("react-player/lazy"), {ssr: false});


interface ProductForm {
    product_file:any,
    product_name:string,
    product_description:string,
    product_price:any,
    product_qty:any

}

interface ResProps{
    id: number,
    catalog_id: number
}


const validationSchema = Yup.object({
    product_name: Yup.string().required('Required'),  
  })

 
  
export default function AddProductComponent(){
    const router = useRouter()
    const params = useParams()
    const initialValues: ProductForm = {product_file:null,product_name:'',product_description:'', product_price:0,product_qty:0};
    const [file,setFile] = useState('' as any);
    const [images, setImages] = useState([] as any);
    const [status, setStatus] = useState("IDLE");
    const [thumbnail,setThumbnail] = useState('');
    const [thumnailName,setThumbnailName] = useState('');
    const [videoState,setVideoState] = useState(true);
    const [videoPreview,setVideoPreview] = useState('' as any);
    const fileInput = useRef<any>()
    const [isloading,setIsLoading] = useState(false)
    const [fileNotification,setFileNotification] = useState(false);


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

      const now = new Date().toDateString();

    // const handleImage=(e:MouseEvent<HTMLButtonElement>)=>{
    //     console.log()

    // }

    const PlayOrPause=async(e: MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault
      if(videoState){
         setVideoState(false)
      }else{
          setVideoState(true)
      }
   }

const clearFile =()=>{
  setFile('')
}

    const onSubmit= async (props:ProductForm)=>{
    //  setIsLoading(true)
        if(file !== ""){
    //      if(file.type == 'video/mp4' && thumbnail == ''){
              //errror message here
            
     //     }else{
            const unique_id = crypto.randomUUID()
            let yes: any = params.catalog_id 
            const formData = new FormData()
            formData.append('product_file',file)
            formData.append('catalog_id',yes)
            formData.append('product_name',props.product_name)
            formData.append('product_description',props.product_description)
            formData.append('product_price',props.product_price)
            formData.append('product_qty',props.product_qty)
            formData.append('thumbnail_name',thumnailName)
            formData.append('thumbnail',thumbnail)
            await fetch('https://whinst-backend.cyou/create_product/',{
                method:'POST',
                body:formData,
                // headers:{
                //     'Content-Type': 'multipart/form-data',
                // }
            }).then((data=>data.json()))
            .then((res:ResProps)=>{
                if(res.id){
                    router.push(`/catalog_creator/${res.catalog_id}/`)
                }
                setIsLoading(false)
                  router.refresh()
            })
            .catch((error:any)=>{
           
            })
       //   }
          }else{
            setFileNotification(true)
          }
      }

      const handleFile=async(e:any)=>{
        setVideoPreview(e.target.files[0])
        setFile(e.target.files[0])
          if(e.target.files[0].type == 'video/mp4'){
            setImages([]);
            setStatus("LOADING");
            const [file] = e.target.files;
            const fileUrl = URL.createObjectURL(file);

              setStatus("IDLE");
              setImages(frames);
        }
        e.target.files = null;
      }




    const filename = 'afilename.mp4'

    const slideLeft = () => {
      var slide = document.getElementById('slider');
      if(slide != undefined){
        slide.scrollLeft -= 500;
      }
    };
  
    const slideRight = () => {
      var slide = document.getElementById('slider');
      if(slide != undefined){
        slide.scrollLeft += 500;
      }
    };


    return(
      
        <div>
          <div className='flex justify-center m-2'>
          {
            fileNotification ? (
              <div className="md:w-3/12 w-5/6 bg-[#ffd7b5] rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-red-300 border m-3 h-10 flex flex-row justify-center items-center md:gap-10 gap-3">
              <p>Image is required</p>
              <button onClick={()=>{
                setFileNotification(false)
              }}>
              <XMarkIcon className="h-5 w-5" stroke='red'/>
              </button>
            </div>
            ):(<></>)
          }
          </div>

          {
  file != '' ? (<>
 {

file.type == 'video/mp4' ? (<div className='flex flex-col justify-center items-center'>
 <div className='w-screen flex justify-center items-center mt-8'>
 <div className='border aspect-square w-11/12 md:w-1/3 relative pl-2 pr-1 '>
   
   <video
       className="VideoInput_video"
       autoPlay={true}
       style={{
         height:'100%',
        width:'100%'
       }}
       loop={true}
       src={URL.createObjectURL(videoPreview)}
       
     />
  </div>
   </div>

   <div className='flex flex-row justify-center space-x-2 p-2 '>
         <button onClick={clearFile} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4">
                 Remove
           </button>

         {/* <button onClick={PlayOrPause} className="mb-2 px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 focus:outline-none focus:ring-blue-300">
         {
       videoState ? (<> Pause
       </>) : (<>
       Play
       </>)
   }
         </button> */}

   </div>
</div>

):(<div className='w-screen flex flex-col justify-center items-center md:flex md:justify-center mt-8'>
 <div className='border aspect-square w-11/12 md:w-1/3 relative pl-2 pr-1'>
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
)
}

 
  </>):(
    <>
    </>
  )
}

<div className="flex flex-col justify-center items-center">
{
                      file == '' ? (<>
 <button onClick={handleClick} className="mb-2 px-3 py-2 font-bold text-center inline-flex items-center text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4 mt-8">
                    Upload image
                   </button>
                      </>):(<></>)
                    }
                   <input type='file' name='product_file' accept='image/*' onChange={handleFile} onClick={(e:any)=>{
                    e.target.value = null
                   }} ref={fileInput} style={{display: 'none'}}/>
</div>

        <Formik initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
            {({errors,touched})=>(
                <Form>
                   <div className="flex flex-col justify-center items-center">
                       

                       <div className='w-11/12 md:w-4/12'>


                       
<div className='m-2'>
<label>Product Name</label>
<Field id='product_name' name='product_name' placeholder='Product name' className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
{errors.product_name && touched.product_name ? (
     <div><p className='text-sm text-red-600 text-center'>
 {errors.product_name}
     </p>
     </div>
    ): null}
</div>




   <div className='m-2'>
   <label>Product Description</label>
<Field id='product_description' name='product_description' placeholder='Product description'  className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
   </div>
<div className='m-2'>
<label>Product Price</label>
<Field id='product_price' type='number' name='product_price' placeholder='Product price'  className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
</div>

<div className='m-2'>
<label>Product Quantity</label>
<Field id='product_qty' type='number' name='product_qty'  placeholder='Product quantity'  className="border-2 border-gray-300 bg-white h-10 px-5 w-full rounded-lg text-sm focus:outline-none"/>
</div>

<div className='m-2'>
{
  isloading ? (  <div className='flex justify-center p-2'>
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-black" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
</svg>
  </div>):(
  <button type='submit'  className=' w-full mb-2 px-3 py-2 font-bold text-center items-center text-black text-white bg-black rounded-lg hover:bg-[#686868] focus:ring-4'>
  Create
  </button>
)
}

</div>


                       </div>
                    

             
                   </div>
                </Form>
            )}
        </Formik>
       {/* <div className="flex flex-col justify-center items-center">
            <p>Product Image</p>
            <div className="border-2 w-60 h-60 m-2"></div>
            <label> Product Name </label>
            <input className='border-2'/>
            <label> Product Description </label>
            <input className='border-2'/>
            <p>Product Price</p>
            <input className='border-2'/>
            <p>Qty</p>
      
       </div> */}

        </div>
    )
}