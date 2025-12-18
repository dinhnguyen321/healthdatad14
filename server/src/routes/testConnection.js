import {prisma} from "../models/prismaClient.js"

export const testConnection = async() => {
  try {
    await prisma.$connect();
    console.log("✅ Kết nối Neon thành công!");
  } catch (error) {
    console.error("❌ Không thể kết nối database:", error.message);
  } 
}

testConnection();
