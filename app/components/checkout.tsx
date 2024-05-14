'use client'
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import React, { useState,useEffect}  from 'react';

export const CheckOut=()=>{
    const [paddle, setPaddle] = useState<Paddle>();
    const AUTH_TOKEN =  process.env.WHINST_TEST_API_KEY!

    useEffect(() => {
        initializePaddle({ environment:'sandbox', token: AUTH_TOKEN }).then(
          (paddleInstance: Paddle | undefined) => {
            if (paddleInstance) {
              setPaddle(paddleInstance);
            }
          },
        );
      }, []);


      const openCheckout = () => {
        paddle?.Checkout.open({
          items: [{ priceId: 'pri_01hvrry5y3pmmk7x3cyj9j8p1k', quantity: 1 }],
        });
      };


      return(
        <>
       {
        paddle?.Checkout.open({
            items: [{ priceId: 'pri_01hvrry5y3pmmk7x3cyj9j8p1k', quantity: 1 }],
        })
       }
        </>
      )
}