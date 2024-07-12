import { v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filePath : string) => {
    try {
        
        if (!filePath) return null;
        let response = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto",
            
        });

        console.log("File uploaded successfully on cloudinary ", response);
        fs.unlinkSync(filePath);
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
        return null;
    }
};