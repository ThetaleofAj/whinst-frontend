import Image from 'next/image'
import { IoClose } from "react-icons/io5";

interface ItemProps{
    text:string
}

 const Modal=({isVisible,onClose,product_image,product_name,product_price,currency,product_quantity,product_description}: {isVisible:boolean,onClose:any,product_image:any,product_price:any,
    product_name:any,currency:any,product_quantity:any,product_description:any})=>{
    if ( !isVisible ) return null;

   // const data: any = props.props1

    // const handleClose = (e) =>{
    //     if(e.target.id === 'wapper' ) onClose();
    // }

    const handleClose = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        if((e.target as HTMLDivElement).id === 'wrapper' ) onClose();
    }



    return(
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleClose} id="wrapper">
            <div className='flex flex-col justify-center items-center m-2'>
            <button className="text-white text-xl" onClick={()=>onClose()}>
            <IoClose size={30} color='black'/>
            </button>
            <div className='w-screen flex justify-center items-center mt-1'  onClick={handleClose} id="wrapper">
        <div className="border-1 w-full md:w-1/3 aspect-square relative bg-gray-200 overflow-hidden rounded-t-lg">
            {
                product_image.split('.').pop() == 'mp4' ? (<>

<video
          className="VideoInput_video"
          autoPlay={true}
          style={{
            height:'100%',
           width:'100%'
          }}
          loop={true}
          src={product_image}
        />

                </>):(<>
                    <Image 
           fill
           style={{objectFit:'cover'}}
         alt=''
         src={product_image}
          />
                </>)
            }
        </div>
        </div>
        <div className='bg-white overflow-y-auto p-2 rounded-b-lg flex-grow-0 w-full h-36 md:h-24 md:w-1/3 border'>
            <h1>Name: <span className='font-bold'>{product_name}</span></h1>
            <h2>Price: <span className='font-bold'>{currency}{product_price}</span></h2>
            <h2>Quantity: <span className='font-bold'>{product_quantity}</span></h2>
            <h1>Description:<span className='font-bold'>{product_description}</span></h1>
         
        </div>
            </div>
        </div>
    )

}

export default Modal;