import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

export const GET =async (req : NextRequest) => {
    try {
        const queryParams = req.nextUrl.searchParams;
        let id = queryParams.get('id');

        if(!id){
            return NextResponse.json(
                {
                    statusCode : 400,
                    message : 'Missing required parameter: id'
                }
            )
        }

        // Perform database query 

       let blog =await Blog.findOne({
            where : {
                id : id
            }
        })

        if (!blog) {
            return NextResponse.json(
                {
                    statusCode : 404,
                    message : 'Blog not found'
                }
            )
            
        }



        return NextResponse.json({
           blog : blog,
            success : true,
            statusCode: 200,
            message : "You got it! the blog"
        })
    } catch (error : any) {
        console.log(error);
        return NextResponse.json(
            {
                statusCode : 500,
                message : 'Something went wrong while fetching blog by id',
                errrorMessage : error.message
            }
        )
        
    }
}