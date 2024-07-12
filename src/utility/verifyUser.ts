import User from "@/models/user.models";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const verifyUser = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || '';

        if (!token) {
            return {error: "Invalid token"}
            
        }
       let decodedValue = jwt.verify(token,process.env.TOKEN_SECRET!)


     let user =  await User.findByPk(decodedValue.id, {
        attributes :{
            exclude: ['password','accessToken']
        }
     })

     if (!user) {
        return 
            {
                error : 'Invalid token'
            }
        
     }

     return user || "";
    } catch (error : any) {
        return new Error('You do not have a valid token! ')
    }
}