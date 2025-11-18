import bcrypt from "bcryptjs"
import {PrismaClient} from "@prisma/client";
 const prisma = new PrismaClient();

  // Tạo user mới
  export const signUp = async (req, res) => {
    const {name, email, phone, password, role} = req.body
    try {
      if(!checkUserExist(email)){
      const hashPassword = await bcrypt.hash(password,10)
      
      // kiểm tra input
      if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
      }
      const user = await prisma.users.create({
        data: { name, email, password:hashPassword, phone,role},
      });
      res.status(201).json(user);
    }else{
      res.status(302).json({message:"Người dùng này đã tồn tại"})
    }
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo người dùng", error });
    }
};

export const signIn= async (req, res) => {
  const {email, password} = req.body 
  try {
    if(email, password){
        const users = await prisma.users.findUnique({
          where:{
            email:email,
            password:password
          }
        });
        console.log("users: ",users);
        
         res.json({
          name:users.name,
          idUser:users.idUser,
          role:users.role
         });
    }
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi lấy danh sách người dùng",
        error: error.meta || error.message || error,
      });
    }
  };

  const checkUserExist = async(email) => {
      try {
       const checkUser = await prisma.users.findUnique({ where: { email:email } });
        res.json({ message: "Chưa có người dùng" });
        console.log("checkUser: ",checkUser);
        
      } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa người dùng", error });
      }
  }