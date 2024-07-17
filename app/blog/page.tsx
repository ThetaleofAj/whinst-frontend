import BlogClient from "../components/blog_client";
import type { Metadata } from 'next'

export const generateMetadata = async ():Promise<Metadata> =>{
  const link = "https://www.whinst.com/card_icon.png"
    return{
      openGraph:{
        title: 'The Whinst blog | Articles that inspire, inform and educate!' ,
        description: 'Articles that inspire, inform and educate!',
        images:link
      },
      twitter:{
        title: 'The Whinst blog | Articles that inspire, inform and educate!',
        description: 'Articles that inspire, inform and educate!',
        images:link
      }
   
    }
  }

export default function Blog(){
    return(
    <BlogClient/>
    )
}