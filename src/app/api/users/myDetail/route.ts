import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { verifyUser } from "@/utility/verifyUser";
export const GET = async (req: NextRequest) => {
    try {
        let user = await verifyUser(req)

        return NextResponse.json({
            user,
            success: true,
            statusCode: 200,
        })
    } catch (error : any) {
        console.log(error);
        return NextResponse.json({
            error: "An error occurred while fetching the detail of the user",
            statusCode: 500,
            errorMessage : error.message
        });
        
    }
}