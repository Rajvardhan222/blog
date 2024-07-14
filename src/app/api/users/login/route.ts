import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
export const POST = async (req: NextRequest) => {
    try {
        const reyBody = await req.json()
        const {email , password} = reyBody

        const existingUser = await User.findOne({
            where : {email : email}
        });

        if(!existingUser){
            return NextResponse.json(
                {
                    error: "User does not exist",
                    statusCode: 404,
                }
            )
        }


        const isPasswordMatch =  bcrypt.compareSync(password, existingUser.password);
console.log(password,existingUser.password);
console.log(isPasswordMatch);




        if(!isPasswordMatch){
            return NextResponse.json(
                {
                    error: "Invalid password",
                    statusCode: 401,
                }
            )
        }

       let token = jwt.sign({
            id : existingUser.id
        },process.env.TOKEN_SECRET!,{
            expiresIn : '1h'
        })

        existingUser.accessToken = token

        await existingUser.save()

        let user = await User.findByPk(existingUser.id,{
            attributes :{
                exclude: ['password']
            }
        })

      let response =  NextResponse.json({
            success : true,
            user : user,
            message : "Login successful",
        
        })

        response.cookies.set('token',token,{
            httpOnly : true
        })

        return response
        
    } catch (error : any) {
        console.log("Error in User routes", error);
        return NextResponse.json({
          error: "Something went wrong while loging the user ",
          errorMessage: error.message,
          statusCode: 500,
        });
    }
}