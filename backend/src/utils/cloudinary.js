import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (loadFilePath) => {
    try {
        if (!loadFilePath) return null
        const response = await cloudinary.uploader.upload(loadFilePath, {
            resource_type: "auto"
        })
        //console.log("File is uploaded on cloudinary", response.url);
        fs.unlinkSync(loadFilePath)
        return response;
    } catch (error){
        fs.unlinkSync(loadFilePath)
        return null;
    }
}

export {uploadOnCloudinary}