
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
  
  // Tạo user mới
  export const createUser = async (req, res) => {
    console.log("req",req);
    
    try {
      const { name, email, password } = req.body;

      // const hashPassword = bcrypt.hash(password,10)

      // kiểm tra input
      if (!name || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
      }
      const user = await prisma.users.create({
        data: { name, email, password },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo người dùng", error });
    }
  };
  
  // Cập nhật user
  export const updateUser = async (req, res) => {
    try {
      // const id = parseInt(req.params.id);
      const id = req.params.id;
      const { name, email, password} = req.body;
      
    // data động (chỉ chứa các field có giá trị thật)
    const data = {};
    if (name !== undefined) data.name = name;
    if (email !== undefined) data.email = email;
    if (password !== undefined) data.password = password;

      if (Object.keys(data).length === 0) {
        return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
      }
      const user = await prisma.users.update({
        where: { idUser:id },
        data
      });
      res.json(user);
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