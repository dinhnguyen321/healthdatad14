import bcrypt from "bcryptjs"
import {PrismaClient} from "@prisma/client";
 const prisma = new PrismaClient();

  // Tạo user mới
  export const register = async (req, res) => {
    const {email, password, role, name} = req.body
    console.log("data regis", email, password, role, name);
    
    const exist = await checkUserExist(email)
    try {
      if(exist){
        return  res.status(302).json({message:"Người dùng này đã tồn tại"})
      }
      
      // kiểm tra input
      if (!email || !password || !role || !name) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
      }

      const hashPassword = await bcrypt.hash(password,10)
      
      const user = await prisma.user.create({
        data: {email, password:hashPassword, role, name},
        select:{
           idUser:true,
          name:true,
          email:true,
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
    const {email, password} = req.body 
    
    if(!email && !password){
      return res.status(400).json({ message: "Thiếu email hoặc mật khẩu" });
    }
  
        const users = await prisma.user.findUnique({
          where:{ email:email}
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
          role:users.role
         });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi lấy danh sách người dùng",
        error: error.meta || error.message || error,
      });
    }
  };

  const checkUserExist = async(email) => {
       const checkUser = await prisma.user.findUnique({ where: { email:email } });
        return !!checkUser 
  }