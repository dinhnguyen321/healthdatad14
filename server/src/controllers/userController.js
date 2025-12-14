
import bcrypt from "bcryptjs"
import {PrismaClient} from "@prisma/client";
 const prisma = new PrismaClient();

// Lấy danh sách user
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit
      const users = await prisma.user.findMany(
        {
          skip:skip,
          take:limit,
          orderBy: { created_at: "desc" },
          select:{
          idUser:true,
          name:true,
          email:true,
          department:true,
          phone:true,
          position:true,
          rank:true,
          role:true,     
      }});
      // Đếm tổng user
      console.log("users",users);
      
      const total = await prisma.user.count();
      console.log("total",total);
      res.json({
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      });
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi lấy danh sách người dùng",
        error: error.meta || error.message || error,
      });
    }
  };
  
 export const getUserById = async(req,res)=> {
    const userId = req.params.userId;
      
    try {
      const user = await prisma.user.findUnique({
        where:{idUser:userId},
        select:{
          idUser:true,
          name: true,
          email: true,
          phone: true,
          role: true,
          birth_day:true,
          medicalProfile:true
        },
        // include:{
        //   medicalProfile:true
        // }
      });
      console.log("user",user);
      
      if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
      }
      return res.json(user); 
    } catch (error) {
      return res.status(500).json({
        message: "Lỗi khi lấy chi tiết người dùng",
        error: error.meta || error.message || error,
      });
    }
  }
const checkUserExist = async(email) => {
       const checkUser = await prisma.user.findUnique({ where: { email:email } });
      return !!checkUser 
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

      const user = await prisma.user.create({
        data: dataCreate
      });
      console.log("user",user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo người dùng", error });
    }
};

// tạo hồ sơ y tế
export const createMedicalProfile = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  
  try {
    // Check đã tồn tại chưa
    const exist = await prisma.medicalProfile.findUnique({
      where: { userId: userId },
    });
    
     if (exist !== null) {
      return res.status(409).json({
        message: "Hồ sơ y tế đã tồn tại, hãy dùng PUT để cập nhật",
      });
    }
    console.log("diqua");

    const bmi = calculateBMI(data.height_cm, data.weight_kg);
    console.log("bmi",bmi);
    
    const profile = await prisma.medicalProfile.create({
      data: {
        userId:userId,
        ...data,
        bmi,
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo hồ sơ y tế", error });
  }
};

// Cập nhật hồ sơ y tế
export const updateMedicalProfile = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;
  console.log("dataa",data);
  
  try {
    const oldProfile = await prisma.medicalProfile.findUnique({
      where: { userId:userId },
    });
    console.log("oldProfile",oldProfile);
    
    if (!oldProfile) {
      return res.status(404).json({
        message: "Chưa có hồ sơ y tế, hãy tạo trước",
      });
    }

    const height = data.height_cm ?? oldProfile.height_cm;
    const weight = data.weight_kg ?? oldProfile.weight_kg;

    const bmi = calculateBMI(height, weight);

    const updated = await prisma.medicalProfile.update({
      where: { userId:userId },
      data: {
        ...data,
        bmi,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi cập nhật hồ sơ y tế",
      error,
    });
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
      const updateUser = await prisma.user.update({
        where: { idUser:id },
        data: dataUpdate
      });
      res.json(updateUser);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật người dùng ne:", error });
    }
  };
  
  // Xóa user + thông tin hồ sơ "vì prisma có onDelete: Cascade"
  export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      await prisma.user.delete({ where: { idUser:id } });
      res.json({ message: "Đã xóa người dùng + hồ sơ y tế thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa user", error });
    }
  };

  // search user
  export const searchUser = async (req, res) =>{
    const { name, phone } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit
    // Điều kiện động
    const conditions = [];  
    if (name) {
      conditions.push({ name: { contains: name, mode: "insensitive" } });
    }

    if (phone) {
      conditions.push({ phone: { contains: phone, mode: "insensitive" } });
    }
    const where = conditions.length > 0 ? { AND: conditions } : {};
  try {
    const users = await prisma.user.findMany({
      where,
      skip:skip,
      take:limit,
      orderBy: { create_at: "desc" },
      select:{
      idUser:true,
          name:true,
          email:true,
          department:true,
          phone:true,
          position:true,
          rank:true,
      }
    });
     const total = await prisma.users.count({ where });

    res.json({
      users,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        page,
        limit,
      },
    });

  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Lỗi tìm kiếm: ", error });
  }
  }

  // logic tính chỉ sổ BMI
  const calculateBMI = (heightCm, weightKg) => {
  if (!heightCm || !weightKg) return null;
  const heightM = heightCm / 100;
  return +(weightKg / (heightM * heightM)).toFixed(2);
};
