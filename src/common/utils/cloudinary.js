const cloudinary = require('cloudinary').v2;
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadoncloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null
        const response=await cloudinary.uploader.upload(localfilepath,{ resource_type: "auto" })

        console.log("file is uploaded on cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null;
    }
}

module.exports=uploadoncloudinary