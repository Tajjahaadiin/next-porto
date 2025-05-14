// src/actions/cloudinary-upload.ts
'use server'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

type UploadOptions = {
  folder?: string
  public_id?: string
  transformation?: object
}

type UploadResult = {
  secure_url?: string
  public_id?: string
  error?: string
}

export async function uploadImageToCloudinary(
  file: File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  const { folder = 'user_avatars', public_id, transformation } = options

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error('Cloudinary environment variables are not set.')
    return { error: 'Cloudinary configuration missing.' }
  }

  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id,
          transformation,
        },
        (error, result) => {
          if (error || !result) {
            console.error('Cloudinary upload error:', error)
            return reject(error)
          }
          resolve(result)
        }
      )

      uploadStream.end(buffer)
    })

    return {
      secure_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
    }
  } catch (error: any) {
    console.error('Error processing or uploading image:', error)
    return { error: error.message || 'Image upload failed.' }
  }
}
export async function deleteImageFromCloudinary(
  publicId: string
): Promise<{ result?: string; error?: string }> {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error('Cloudinary environment variables are not set.')
    return { error: 'Cloudinary configuration missing.' }
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId)
    if (result.result === 'ok') {
      return { result: 'deleted' }
    } else {
      console.warn('Cloudinary deletion returned:', result.result)
      return { error: result.result || 'Failed to delete image.' }
    }
  } catch (error: any) {
    console.error('Error deleting image from Cloudinary:', error)
    return { error: error.message || 'Deletion failed.' }
  }
}
