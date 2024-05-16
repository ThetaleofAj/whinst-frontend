import { BsInstagram,BsFacebook,BsTwitter,BsTwitterX,BsWhatsapp } from 'react-icons/bs';
import { PiLinkSimple } from "react-icons/pi";
import { HiDownload } from "react-icons/hi";
import {FacebookShareButton,TwitterShareButton,WhatsappShareButton,FacebookMessengerShareButton } from "react-share"
import Image from 'next/image'
const ShareModal=({isVisible,onClose,link,qr_code,catalog_name}: {isVisible:boolean,onClose:any,link:any,qr_code:any,catalog_name:any})=>{
    if ( !isVisible ) return null;

   // const data: any = props.props1

    // const handleClose = (e) =>{
    //     if(e.target.id === 'wapper' ) onClose();
    // }

    const handleClose = (e: React.MouseEvent<HTMLDivElement,MouseEvent>) =>{
        if((e.target as HTMLDivElement).id === 'wrapper' ) onClose();
    }


    return(
     <>
     
     <div  className="overflow-y-auto overflow-x-hidden fixed top-0 bg-opacity-75 bg-gray-500 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-full">
    <div className="relative p-4 w-full max-w-2xl max-h-full ">
       
        <div className=" relative bg-white rounded-lg shadow  text-wrap max-w-full">
          
            <div className="flex items-center justify-between rounded-t  ">
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="default-modal" onClick={()=>onClose()}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center w-full break-words">
                 {catalog_name}
                </h3>
            <div className='flex items-center justify-center w-full'>
            <div className='border aspect-square relative w-2/4'>
                <Image 
          layout='fill'
          objectFit='cover'
         alt=''
         src={qr_code}
          />
                </div>
            </div>
     
            <div className="p-4 md:p-3 flex justify-center items-center break-words">
                <p className="text-gray-500 break-words w-full text-center">
                    {`https://www.whinst.com/catalog_viewer/${catalog_name}/${link}`}
                </p>
            </div>
         
            <div className="flex items-center justify-center space-x-10 p-4 md:p-4 border-t border-gray-200 rounded-b ">
                <div className='flex flex-col items-center'>
                <a href={qr_code} download='qr_code'>
                <HiDownload size={23}/>
                </a>
                <p>Download</p>
                </div>

                <div className='flex flex-col items-center'>
                <button onClick={()=>navigator.clipboard.writeText(`https://www.whinst.com/catalog_viewer/${catalog_name}/${link}`)}>
                  <PiLinkSimple size={23}/>
                </button>
                <p>Copy</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex items-center justify-center space-x-4 border-gray-200 rounded-b'>
                    <FacebookShareButton url={`https://www.whinst.com/catalog_viewer/${catalog_name}/${link}`}>
            <BsFacebook size={23}/>
           </FacebookShareButton>
           <TwitterShareButton url={`https://www.whinst.com/catalog_viewer/${catalog_name}/${link}`}>
            <BsTwitterX size={23}/>
           </TwitterShareButton>
           <WhatsappShareButton url={`https://www.whinst.com/catalog_viewer/${catalog_name}/${link}`}>
            <BsWhatsapp size={23}/>
          </WhatsappShareButton>
                    </div>
                    <p>Share</p>
                </div>
            </div>
        </div>
    </div>
</div>


        
{/* <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" onClick={handleClose} id="wrapper">
<div className='flex flex-col'>
            <button className="text-white text-xl place-self-end" onClick={()=>onClose()}>X</button>
      <h2>Share catalog</h2>
      <button onClick={()=>navigator.clipboard.writeText(`http://localhost:3000/catalog_creator/${link}`)}>
        Copy link: http://localhost:3000/catalog_creator/{link}
        </button>
    <p>Socials list</p>
    
    <FacebookShareButton url={`http://localhost:3000/catalog_creator/${link}`}>
        <button>
            Facebook
        </button>
    </FacebookShareButton>
    <TwitterShareButton url={`http://localhost:3000/catalog_creator/${link}`}>
        <button>
            Twitter
        </button>
    </TwitterShareButton>
    <WhatsappShareButton url={`http://localhost:3000/catalog_creator/${link}`}>
        <button>
            WhatsApp
        </button>
    </WhatsappShareButton>

            </div>
</div> */}

        {/* <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleClose} id="wrapper">
          
        </div> */}

        </>
    )

}

export default ShareModal;