import BlogPost from "@/models/blog.model";
import { uploadOnCloudinary } from "@/utility/cloudinary";
import { upload } from "@/utility/multer";
import { verifyUser } from "@/utility/verifyUser";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    
    let decodedValue = await verifyUser(req);
    if(decodedValue.error){
        return NextResponse.json({
            error : 'User not authenticated',
            statusCode : 401,
        })
    }
    
    let reqForm = await req.formData();

    const file: File | null = reqForm.get("image") as File;

    if (!file) {
      return NextResponse.json({
        error: "Please provide an image",
        statusCode: 400,
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // C:\Users\Admin\Desktop\blog\public
    const path = join(
      "/",
      "Users/Admin/Desktop/blog/public/uploads",
      file.name
    );
    await writeFile(path, buffer);
    

    let title = reqForm.get("title");
    let content = reqForm.get("content");

    if (!(title as String, content as String, file)) {
      return NextResponse.json({
        error: "Please provide all required fields: title, content, and image",
        statusCode: 400,
      });
    }

    let cloudinaryUploadedFile  = await uploadOnCloudinary(path);
   if(!cloudinaryUploadedFile){
    return NextResponse.json({
        error: "Failed to upload the image to cloudinary",
        statusCode: 500,
      });
 
   }
   let blog = await BlogPost.create({
        title,
      content,
      image : cloudinaryUploadedFile.secure_url,
      userId : decodedValue.dataValues.id,
    })

    if(!blog){
        return NextResponse.json({
        error: "Failed to create the blog",
        statusCode: 500,
      });
    }

    return NextResponse.json({
        success: true,
        message: "Blog created successfully",
        blog
      });
    
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      error: "An error occurred while creating the blog",
      errorMessage: error.message,
      statusCode: 500,
    });
  }
};
