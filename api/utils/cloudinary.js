import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
// export const cloudinaryConfig = () => {
//   cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    // api_key: process.env.CLOUDINARY_API_KEY,
    // api_secret: process.env.CLOUDINARY_API_SECRET,

//   });
// };

cloudinary.config({ 
    cloud_name: 'docex5twt', 
    api_key: '342326486139442', 
    api_secret: '63EOj_F-AOKbSJrfyGYvPJ5LAG4' // Click 'View API Keys' above to copy your API secret
});

const uploadImageOnCloudinary = async(filePath, folderName,next) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder : folderName,
        });

        // delete image from server
        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            console.log("Failed to delete image from server", error)
        }

        return {
            secure_url : result.secure_url,
            public_id : result.public_id
        };
    } catch (error) {
        next(error);
    }
}

export {uploadImageOnCloudinary};