import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function testConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Kết nối Neon thành công!");
  } catch (error) {
    console.error("❌ Lỗi kết nối:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
