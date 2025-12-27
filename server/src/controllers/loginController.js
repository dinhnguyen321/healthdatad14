import bcrypt from "bcryptjs"
import {prisma} from "../models/prismaClient.js";

  // Tạo user mới
  export const register = async (req, res) => {
    const {SHQN, password, role, name} = req.body
    
    const exist = await checkUserExist(SHQN)

    try {
      if(exist){
        return  res.status(302).json({message:"Người dùng này đã tồn tại"})
      }
      
      // kiểm tra input
      if (!SHQN || !password || !role || !name) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
      }

      const hashPassword = await bcrypt.hash(password,10)
      
      const user = await prisma.user.create({
        data: {
          SHQN, 
          password:hashPassword, 
          role, 
          name,
          medicalProfile: {
          create: {}, 
          } 
        },
        select:{
          idUser:true,
          name:true,
          SHQN:true,
          role:true
        }
      });
      return res.status(200).json(user);
    }
     catch (error) {
      return res.status(500).json({ message: "Lỗi khi tạo người dùng"});
    }
};

export const signIn= async (req, res) => {
  try {
    const {SHQN, password} = req.body 
      
    if(!SHQN && !password){
      return res.status(400).json({ message: "Thiếu SHQN hoặc mật khẩu" });
    }
  
        const users = await prisma.user.findUnique({
          where:{ SHQN:SHQN}
        });

        if(!users){
          return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }

        const match = await bcrypt.compare(password,users.password)

        if(!match){
          return res.status(401).json({ message: "Sai mật khẩu" });
        }
        
        return res.json({
          name:users.name,
          idUser:users.idUser,
          role:users.role,
          avt: users.avt
         });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi lấy danh sách người dùng",
        error: error.meta || error.message || error,
      });
    }
  };

  const checkUserExist = async(SHQN) => {
       const checkUser = await prisma.user.findUnique({ where: { SHQN:SHQN } });
        return !!checkUser 
  }