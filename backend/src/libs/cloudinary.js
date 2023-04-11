import {v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: "dipcznkms",
    api_key: "765824697492641",
    api_secret: "zjm-wCIqMszTmIVjPDTLQP4LkaE"
  });

export const uploadImage = async filePath =>{
    return await cloudinary.uploader.upload(filePath, {
        folder: 'posts'
    })
}

export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}
