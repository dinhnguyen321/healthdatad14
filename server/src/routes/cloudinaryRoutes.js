import express from "express"
import multer, { memoryStorage } from 'multer';
import {uploadSingleImage} from "../controllers/cloudinaryController.js"

// Sử dụng bộ nhớ tạm (memory storage) để tránh lưu file rác vào server
// Kiểm tra định dạng file (chỉ cho phép ảnh)
const router = express.Router()
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file hình ảnh!'), false);
    }
}
const storage = memoryStorage();
const upload = multer({ storage, fileFilter:fileFilter });

router.post("/", upload.single('image'),uploadSingleImage )

export default router