// import multer, { memoryStorage } from 'multer';

// // Sử dụng bộ nhớ tạm (memory storage) để tránh lưu file rác vào server
// const storage = memoryStorage();
// const upload = multer({ storage });

// export const uploadSingle = () = >{

// }

// // export default upload;
import cloudinary from "../config/cloudinaryConfig.js"; 

export const uploadSingleImage = async (req, res) => {
  try {
   if (!req.file) return res.status(400).send('No file uploaded.');

    // Chuyển Buffer sang chuỗi Base64 Data URI (Không dùng thư viện ngoài)
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    
    // Upload lên Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "HSSK",
    });
    res.json({
      message: "Upload thành công!",
      url: result.secure_url 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi xử lý upload", error: error.message });
  }
}