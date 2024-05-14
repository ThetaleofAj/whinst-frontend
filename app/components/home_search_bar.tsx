'use client'
import { useState } from "react";
import Link from 'next/link';
import { BeakerIcon,PlusIcon } from '@heroicons/react/24/solid'
import { UserCircleIcon} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { FaLock } from "react-icons/fa";


interface CatalogProps{
    id:number,
    catalog_name: string,
    unique_id: string
  }

  interface PaidProps{
    paid:string
  }


export default function Search(props:any){
    const [input,setInput] = useState("")
  

const data: CatalogProps[] = props;
if(props.props.length > 1 && props.paid == null){
    return(
        <>
        <div className="flex justify-center mt-5">
        <div className="pt-2 flex justify-center text-gray-600 w-screen ">
            
        <input
            type="text"
            placeholder="Search..."
            className="border-2 border-gray-300 bg-white h-10 px-5 w-11/12 md:w-4/12 rounded-lg text-sm focus:outline-none"
        
            
            onChange={(e)=>{
                setInput(e.target.value);
            }}
            />
        </div>
        </div>
        
        <div className='flex justify-center'>
            
        
        <div className="grid grid-cols-2 pt-4 md:grid-cols-3 md:gap-10 md:pt-8">
             <Link href="/create_catalog"> 
              <div className='flex flex-col items-baseline'>
              <div className="border-2 w-36 h-36 m-2 md:h-48 md:w-48 flex justify-center items-center bg-white">
              <PlusIcon className="h-28 w-28 " />
              </div>
              Create New
              </div>
              </Link>
          
              {
                props.props.filter((value:any)=>{
                    if(input == ""){
                        return value
                    }else if(value.catalog_name.toLowerCase().includes(input.toLowerCase())){
                        return value
                    }
                }).map((value:any,key:any)=>{
                    return (<div key={value.id}>
                        {value.default_catalog == false ? (
                              <div>
                              <div className="border-2 w-36 h-36 m-2 md:h-48 md:w-48 flex justify-center items-center bg-white">
              <FaLock size={60}/>
              </div>
                              <div className="w-36 m-2 md:w-48">
                              <p className="truncate">Locked catalog</p>
                              </div>
                              
                              </div>
                        ):(  <Link href={`/catalog_creator/${value.id}/`} >
                        <div key={value.id}>
                        <div className="border-2 w-36 h-36 m-2 md:h-48 md:w-48 relative bg-white">
                            {
                                value.store_logo == null ? (<>
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
                       src={value.image_url}
                        />
                                </>)
                            }
                        </div>
                        <div className="w-36 m-2 md:w-48">
                        <p className="truncate">{value.catalog_name}</p>
                        </div>
                        
                        </div>
                        </Link>)}
                   
                        </div>
                    )
                })
            } 
            </div>
           
        </div>
            </>
    )
}


return(
    <>
<div className="flex justify-center mt-5">
<div className="pt-2 flex justify-center text-gray-600 w-screen ">
    
<input
    type="text"
    placeholder="Search..."
    className="border-2 border-gray-300 bg-white h-10 px-5 w-11/12 md:w-4/12 rounded-lg text-sm focus:outline-none"

    
    onChange={(e)=>{
        setInput(e.target.value);
    }}
    />
</div>
</div>

<div className='flex justify-center'>
    

<div className="grid grid-cols-2 pt-4 md:grid-cols-3 md:gap-10 md:pt-8">
     <Link href="/create_catalog"> 
      <div className='flex flex-col items-baseline'>
      <div className="border-2 w-36 h-36 m-2 md:h-48 md:w-48 flex justify-center items-center bg-white">
      <PlusIcon className="h-28 w-28 " />
      </div>
      Create New
      </div>
      </Link>
  
      {
        props.props.filter((value:any)=>{
            if(input == ""){
                return value
            }else if(value.catalog_name.toLowerCase().includes(input.toLowerCase())){
                return value
            }
        }).map((value:any,key:any)=>{
            return (
                <Link href={`/catalog_creator/${value.id}/`} key={value.id}>
                <div>
                <div className="border-2 w-36 h-36 m-2 md:h-48 md:w-48 relative bg-white">
                    {
                        value.store_logo == null ? (<>
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
               src={value.image_url}
                />
                        </>)
                    }
                </div>
                <div className="w-36 m-2 md:w-48">
                <p className="truncate">{value.catalog_name}</p>
                </div>
                
                </div>
                </Link>
            )
        })
    } 

       
   

    </div>
   
</div>


   
    

   
    </>
)
}