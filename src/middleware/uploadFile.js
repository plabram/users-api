const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'other',
    allowFormats: ["jpg", "png", "jpeg", "gif"],
    },
});
 
const uploadFile = multer({ storage });

const vanStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vans',
    allowFormats: ["jpg", "png", "jpeg", "gif"],
    },
});
 
const uploadVan = multer({ vanStorage });

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatars',
    allowFormats: ["jpg", "png", "jpeg", "gif"],
    },
});
 
const uploadAvatar = multer({ avatarStorage });
 
module.exports = uploadFile, uploadAvatar, uploadVan