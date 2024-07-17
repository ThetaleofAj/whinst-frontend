import BlogClient from "../components/blog_client";
import type { Metadata } from 'next'

export const generateMetadata = async ():Promise<Metadata> =>{
  
    return{
      openGraph:{
        title: 'The Whinst blog | Articles that inspire, inform and educate!' ,
        description: 'Articles that inspire, inform and educate!',
        images:'/card_icon.png'

      },
      twitter:{
        title: 'The Whinst blog | Articles that inspire, inform and educate!',
        description: 'Articles that inspire, inform and educate!',
        images:'/card_icon.png'
      }
   
    }
  }

export default function Blog(){
    return(
    <BlogClient/>
    )
}