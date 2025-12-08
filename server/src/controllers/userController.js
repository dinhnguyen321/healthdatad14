
import bcrypt from "bcryptjs"
import {PrismaClient} from "@prisma/client";
 const prisma = new PrismaClient();

// Lấy danh sách user
export const getAllUsers = async (req, res) => {
  try {
      const users = await prisma.users.findMany();
      res.json(users);
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi lấy danh sách người dùng",
        error: error.meta || error.message || error,
      });
    }
  };
  
 export const getUserById = async(req,res)=> {
    const id = req.params.id;
    try {
      const user = await prisma.users.findUnique({where:{idUser:id}});
      res.json(user);
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi thông tin 1 người dùng",
        error: error.meta || error.message || error,
      });
    }
  }
const checkUserExist = async(email) => {
    try {
       const checkUser = await prisma.users.findUnique({ where: { email:email } });
        return !!checkUser 
    } catch (error) {
      res.status(500).json({ message: "Người dùng đã tồn tại", error });
    }
}

  // Tạo user mới
  export const createUser = async (req, res) => {
    const dataCreate = req.body
    const exist = await checkUserExist(dataCreate.email)
    try {
        if(exist){
        return  res.status(302).json({message:"Người dùng này đã tồn tại"})
        }
      // kiểm tra input
      if (!dataCreate.email || !dataCreate.password) {
        return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
      }
      Object.keys(dataCreate).forEach((key) => {
        if (dataCreate[key] === "") {
          dataCreate[key] = null;
        }
      });

      dataCreate.password = await bcrypt.hash(dataCreate.password,10)

      const user = await prisma.users.create({
        data: dataCreate
      });
      console.log("user",user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo người dùng", error });
    }
};
  
  // Cập nhật user
  export const updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const dataUpdate = req.body;
      
      if (Object.keys(dataUpdate).length === 0) {
        return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
      }
      const updateUser = await prisma.users.update({
        where: { idUser:id },
        data: dataUpdate
      });
      res.json(updateUser);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật người dùng ne:", error });
    }
  };
  
  // Xóa user
  export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      await prisma.users.delete({ where: { idUser:id } });
      res.json({ message: "Đã xóa người dùng" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa người dùng", error });
    }
  };

  export const searchUser = async (req, res) =>{
    const { name, phone } = req.query;
    console.log("name, phone",name, phone);
    
  try {
    if ((!name || name.trim() === "") && (!phone || phone.trim() === "")) {
      return res.status(400).json({ message: "Thiếu keyword tìm kiếm" });
    }

    const users = await prisma.users.findMany({
      where: {
        AND: [
          name ? { name: { contains: name, mode: "insensitive" }} : {},
         phone ? { phone: { contains: phone, mode: "insensitive" }}: {},
        ],
      },
      take: 50, // limit lại để tránh quá tải
      select:{
        address:true,       
        birth_day:true,  
        birth_place:true,
        blood_type:true,
        create_at:true,
        department:true,
        education_level:true,
        email:true,
        ethnicity:true,
        hometown:true,
        idUser:true,
        name:true,
        national_id:true,
        national_place:true,
        phone:true,
        position:true,
        rank:true,
        religion:true,
        role:true,     
        ward:true, 
      }
    });
    console.log("users search",users);
    
    return res.status(200).json(users);
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Lỗi tìm kiếm", error });
  }
  }