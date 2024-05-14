import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: number,
            role: string,
            active:string,
            email:string,
            paid:string,
            sub_date:string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: string,
        active:string,
        paid:string,
        sub_date:string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
        active:string,
        paid:string,
        sub_date:string
    }
}