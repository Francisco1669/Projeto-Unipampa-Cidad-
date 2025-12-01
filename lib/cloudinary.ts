import { v2 as cloudinary } from 'cloudinary'

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_FOLDER,
} = process.env

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  throw new Error('Cloudinary env vars are missing')
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
})

export async function uploadImage(filePath: string) {
  const folder = CLOUDINARY_UPLOAD_FOLDER || 'amigo-4-patas'
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    transformation: [
      {
        width: 1200,
        crop: 'limit',
      },
    ],
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
  }
}
