import multer from "multer";
import path from "path";

// Avatar storage
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/avatars"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// Cover storage
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "src/uploads/covers"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new Error("Only images are allowed"), false);
};

// Limits
const limits = { fileSize: 2 * 1024 * 1024 }; 

export const uploadAvatar = multer({ storage: avatarStorage, fileFilter, limits });
export const uploadCover = multer({ storage: coverStorage, fileFilter, limits });