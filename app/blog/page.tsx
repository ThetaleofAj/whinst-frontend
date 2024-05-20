'use client';
import BlogClient from "../components/blog_client";
import { useRouter } from 'next/navigation'
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import { useEffect, useState } from 'react';




export default function Blog(){
    const [paddle, setPaddle] = useState<Paddle>();
    const AUTH_TOKEN =  process.env.WHINST_TEST_API_KEY!
    const router = useRouter()

    useEffect(()=>{
        initializePaddle({ environment:'production', token:AUTH_TOKEN,eventCallback(event) { //production
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
   
   },[])

    return(
    <BlogClient/>
    )
}