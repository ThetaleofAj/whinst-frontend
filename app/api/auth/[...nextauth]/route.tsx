import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { redirect } from 'next/navigation'
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRECT = process.env.GOOGLE_CLIENT_SECRET!

export const authOptions: NextAuthOptions = {
    session:{
        strategy:'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRECT,
            

          }),
        CredentialsProvider({
            name:"credentials",
            credentials: {
                email:{label:"Email",type:"text",placeholder:"email"},
                password:{label:"Password",type:'password'}
            },
            async authorize(credentials) {
                const { email, password} = credentials as {
                    email: string;
                    password: string;
                };
               
                    const response = await fetch(`https://whinst-backend.cyou/sign-in/`,{
                        method:'POST',
                        body:JSON.stringify({
                            "email":email,
                            "password":password
                        }),
                        headers:{
                            'Content-Type': 'application/json',
                        },
                    })
                    const result = await response.json();
                    if(result == 'wrong'){
                        return null
                    }else{
                        // if(JSON.stringify(result.active) == 'false'){
                        //     console.log(`activate your account via the link sent to the email ${email}`)
                        //      // console.log(result)
                        //      // return result;
                            
                            
                        //  }else{
                             return result
                      //   }
                    }
            }

        })
    ],

    callbacks: {
     

        async signIn({account,profile,user}){

            if(profile){
                const first_name = profile?.name?.split(" ")[0]
                const last_name = profile?.name?.split(" ")[1]
            try{
                const response = await fetch('https://whinst-backend.cyou/google-sign-in/',{
                    method:'POST',
                    body:JSON.stringify({
                        "first_name":first_name,
                        "last_name":last_name,
                        "email":profile?.email,
                        "role":'user',
                        "active":true,
                        "g_login":true
                    }),
                    headers:{
                        'Content-Type': 'application/json',
                    },
                   })
                   const result = await response.json()
                   return true
            }catch(error){
              
            }
            }
       
            // return 
            return true

        },
        
        async jwt({ token, user, session,profile}) {
            if(user){ 
                const response = await fetch(`https://whinst-backend.cyou/get-user/${user.email}`)
                const result = await response.json();
                return {
                    ...token,
                    id: result.id,
                    role: result.role,
                    active:result.active,
                    paid:result.paid,
                    sub_date:result.sub_date,
                    email:result.email

                   // token.id = user.id
                }
               
            }
         return token;
        },

        async session({session, token, user }:any){
            // console.log("session callback",{token,user,session});
                return {
                    ...session,
                    user:{
                        ...session.user,
                         id: token.id,
                         role:token.role,
                         active:token.active,
                         email:token.email,
                         paid:token.paid,
                         sub_date:token.sub_date
    
    
                    }
                }
        }

        //   async session({ session,user }) {
        //     // Send properties to the client, like an access_token from a provider.
        //     return session
           
        //   }
        // async jwt({token,user}){
        //     if(user){
        //         token.id = user.id
        //     }
        //     return token;
        // }
    },
    pages:{
        signIn:"/auth/sign-in",
    }
    
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }