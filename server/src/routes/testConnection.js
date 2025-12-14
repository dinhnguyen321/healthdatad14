import { PrismaClient } from "@prisma/client";

export const testConnection = async() => {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log("✅ Kết nối Neon thành công!");
  } catch (error) {
    console.error("❌ Không thể kết nối database:", error.message);
  } 
  finally {
    await prisma.$disconnect();
  }
}

testConnection();
