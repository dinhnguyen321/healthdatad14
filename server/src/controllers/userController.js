
import bcrypt from "bcryptjs"
import {prisma} from "../models/prismaClient.js";
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
          avt:true,
          SHQN:true,
          name:true,
          email:true,
          department:true,
          phone:true,
          position:true,
          rank:true,
          role:true,
          birth_day:true,
          enlistment_date:true     
      }});
      // Đếm tổng user
      const total = await prisma.user.count();
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
  const defaultMedicalProfile = {
  health_insurance_code: "",
  height_cm: "",
  weight_kg: "",
  bmi: "",
  medical_history: "",
  current_disease: "",
  treatment_plan: "",
  blood_type: "",
  id: null,
  userId: null,
  created_at: null,
  updated_at: null,
};

 export const getUserById = async(req,res)=> {
    const userId = req.params.userId;
      
    try {
      const user = await prisma.user.findUnique({
        where:{idUser:userId},
        select:{
          idUser:true,
          avt:true,
          SHQN:true,
          name: true,
          email: true,
          phone: true,
          role: true,
          birth_day:true,
          address:true,
          rank:true,
          position:true,
          department:true,
          enlistment_date:true,
          medicalProfile:true
        }
      });
      
      if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
      }
      return res.json({
        ...user,
        medicalProfile: user.medicalProfile ?? defaultMedicalProfile
      }); 
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

    data.bmi = calculateBMI(data.height_cm, data.weight_kg);
    
    const profile = await prisma.medicalProfile.create({
      data: {
        userId:userId,
        ...data,
      },
    });

    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo hồ sơ y tế", error });
  }
};

// Cập nhật hồ sơ y tế
export const updateMedicalProfile = async (req, res) => {
  const { userId } = req.params;
  const dataUpdate = req.body;
  
  try {
    if (Object.keys(dataUpdate).length === 0) {
        return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
    }
    const oldProfile = await prisma.medicalProfile.findUnique({
      where: { userId:userId },
    });
    
    if (!oldProfile) {
      return res.status(404).json({
        message: "Chưa có hồ sơ y tế, hãy tạo trước",
      });
    }

    const height = dataUpdate.height_cm ?? oldProfile.height_cm;
    const weight = dataUpdate.weight_kg ?? oldProfile.weight_kg;

    dataUpdate.bmi = calculateBMI(height, weight);

    const updateMedicalProfile = await prisma.medicalProfile.update({
      where: { userId:userId },
      data: dataUpdate
    });

    res.json(updateMedicalProfile);
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
      console.log("dataUpdate.avt,",dataUpdate);
      
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
    const id = req.params.id;
    const body = req.body || {}; // check body có thể rỗng
    const ids = body.ids;
    try {
    
      if(Array.isArray(ids) && ids.length > 0){
        const result = await prisma.user.deleteMany({
          where: { idUser: { in: ids } }
        })
        return res.json({
          message: `Đã xóa ${result.count} người dùng thành công`,
          deletedCount: result.count
        })
      }
      // xóa 1 user
      
      if(id){
        await prisma.user.delete({
           where: { idUser:id } 
        });

        return res.json({ 
          message: "Đã xóa người dùng + hồ sơ y tế thành công"
         });
      }
      return res.status(400).json({
        message: "Thiếu id hoặc danh sách ids"
      })

    } catch (error) {
      res.status(500).json({ 
        message: "Lỗi khi xóa user", error 
      });
    }
  };

  // search user
  export const searchUser = async (req, res) =>{
    const { name, health_insurance_code } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10

    const skip = (page - 1) * limit

    // Điều kiện động
    const where = {
    AND: [
      name && {
        name: { contains: name, mode: "insensitive" },
      },

      health_insurance_code && {
        medicalProfile: {
          is: {
            health_insurance_code: {
              contains: health_insurance_code,
              mode: "insensitive",
            },
          },
        },
      },
    ].filter(Boolean),
  };
  try {
    const users = await prisma.user.findMany({
      where,
      skip:skip,
      take:limit,
      orderBy: { created_at: "desc" },
      select:{
      idUser:true,
          name:true,
          email:true,
          avt:true,
          SHQN:true,
          department:true,
          phone:true,
          position:true,
          rank:true,
          medicalProfile:true
      }
    });
     const total = await prisma.user.count({ where });

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
