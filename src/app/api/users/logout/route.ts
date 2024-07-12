//code to handle user logout controller

import { verifyUser } from "@/utility/verifyUser";
import { error } from "console";
import { NextRequest ,NextResponse} from "next/server";

export const GET = async (req : NextRequest) => {
    try {
        let user = await verifyUser(req)
        if (user.error) {
            return NextResponse.json({
                error : 'User not found'
            })
            
        }

      let response =  NextResponse.json({
            message : "success logout",
            statusCode : 200,
            success : true
        })


        response.cookies.delete('token')

        return response
        
     
    } catch (error) {
        console.log(error);

        return NextResponse.json({
            error : "Something went wrong while logging out",
            statusCode : 500
        })
        
    }
}