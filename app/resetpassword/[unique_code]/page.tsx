'use client';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Reset_Password_Client from '@/app/components/resetpasswordclient';

export default function Reset_Password({ params }: { params: { unique_code: string } }){
    return(
<Reset_Password_Client props={params.unique_code}/>
    )
}