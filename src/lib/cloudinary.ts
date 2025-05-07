'use server'
import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

interface UploadOptions {
  folder?: string // Specify a folder in Cloudinary
  public_id?: string // Optional public ID
}

export async function uploadImageToCloudinary(
  filePath: string,
  options?: UploadOptions
): Promise<string> {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      ...options,
      resource_type: 'image',
    })

    return result.secure_url
  } catch (error) {
    console.error('Cloudinary upload failed:', error)
    throw new Error(
      `Failed to upload image to Cloudinary: ${
        error instanceof Error ? error.message : String(error)
      }`
    )
  }
}

export async function deleteImageFromCloudinary(
  publicId: string
): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.error('Cloudinary deletion failed:', error)
  }
}
