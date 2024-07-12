import Blog from "@/models/blog.model";
import { verifyUser } from "@/utility/verifyUser";
import { NextRequest, NextResponse } from "next/server";

export const GET =async (req : NextRequest) => {
    try {
        let user = await verifyUser(req)
        if(user.error){
            return NextResponse.json({
                error : 'User not authenticated',
                statusCode : 401,
            })
        }

       const allPost = await Blog.findAll()

       // reduce content length to 25 words 

       allPost.forEach((post) => {
        if(post.content.split(" ").length > 25) post.content = post.content.split(' ').slice(0, 25).join(' ') + '...'
       })

       if(!allPost){
        return NextResponse.json({
            error : 'No posts found',
            statusCode : 404,
        })
       }

       return NextResponse.json({
            posts : allPost,
            user : user,
            statusCode : 200,
       })

    } catch (error:any) {
        console.log(error);
        return NextResponse.json({
            error : 'An error occurred',
            statusCode : 500,
            errorMessage : error.message,
        })
        
    }
}