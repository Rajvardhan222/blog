import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const verifyUser = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || '';
       let decodedValue = jwt.verify(token,process.env.TOKEN_SECRET!)

     let user =  await User.findByPk(decodedValue.id, {
        attributes :{
            exclude: ['password','accessToken']
        }
     })

     if (!user) {
        return NextResponse.json(
            {
                error : 'Invalid token'
            }
        )
     }

     return user;
    } catch (error : any) {
        return NextResponse.json({
            error : 'Cant verify user at this time',
            errorMessage : error.message
        })
    }
}