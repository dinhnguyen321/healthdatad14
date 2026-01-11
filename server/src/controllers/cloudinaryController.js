// import multer, { memoryStorage } from 'multer';

// // Sử dụng bộ nhớ tạm (memory storage) để tránh lưu file rác vào server
// const storage = memoryStorage();
// const upload = multer({ storage });

// export const uploadSingle = () = >{

// }
import cloudinary from "../config/cloudinaryConfig.js"; 
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url'

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

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const registerFaceAPI = (req,res) => {
    const newUser = req.body
    const filePath = path.join(__dirname, "../user.json")
    console.log("Dữ liệu nhận được", newUser);
    console.log("filePath", filePath);

    // 1 đọc file
    fs.readFile(filePath, 'utf8', (err, data)=> {
      let users = []

      if(!err && data){
        try {
          users = JSON.parse(data); // nếu file đã có dữ liệu thì parse ra mảng
        } catch (error) {
          users = []          
        }
      }

      // 2 push user vào mảnh
      users.push(newUser)

      // 3 ghi file lưu vào usb
      fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
        if(writeErr){
          console.error("lỗi ghi file:", writeErr);
          return res.status(500).json({ message: "Không thể lưu dữ liệu vào USB" });
        }
        // 4. Trả lời cho Client
        res.status(200).json({ message: "Đăng ký khuôn mặt thành công!" });
      })
    })
}

export const getAllUsersFace = async (req, res) => {
    const filePath = path.join(__dirname, "../user.json");

    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err){
      return res.status(500).json({ message: "Không đọc được file trên usb" });
     }
     // Trả về mảng users để Client xử lý đối soát
        res.status(200).json(JSON.parse(data || "[]"));
  })
}