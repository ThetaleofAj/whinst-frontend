import ArticleClient  from "@/app/components/article_client"
import type { Metadata } from 'next'

type Props = {
    params: {
      id:string
    }
}

async function getData(id:any){
    const res = await fetch(`https://andyson.pythonanywhere.com/api/article/${id}`,{
      next: {
        revalidate: 0
      }
    })
    return res.json()
  }

export const generateMetadata = async ({params}:Props):Promise<Metadata> =>{
    const blog = await getData(params.id)
  
    return{
      title:blog.title,
      description:blog.description,
      
      openGraph:{
        title: blog.title,
        description: blog.description,
        images: blog.image

      },
      twitter:{
        title: blog.title,
        description: blog.description,
        images: blog.image
      }
   
    }
  }

export default function Article(){
    return(
        <ArticleClient/>
    )
}