// logic tính chỉ sổ BMI
const calculateBMI = (heightCm, weightKg) => {
  if (!heightCm || !weightKg) return null;
  const heightM = heightCm / 100;
  return +(weightKg / (heightM * heightM)).toFixed(2);
};

// Tạo mới 1 hồ sơ y tế và cập nhật 
export const createMedicalProfile = async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  try {
    const bmi = data.height_cm && data.weight_kg ? calculateBMI(data.height_cm, data.weight_kg) : ""

    const profile = await prisma.medical_profiles.create({
      data: {
        userId,
        ...data,
        bmi,
      },
    });

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: "Lỗi tạo hồ sơ y tế", error });
  }
};

// cập nhật 
// export const updateMedicalProfile = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const data = req.body;

//     if (data.height_cm || data.weight_kg) {
//       const oldProfile = await prisma.medical_profiles.findUnique({
//         where: { userId },
//       });

//       const height = data.height_cm ?? oldProfile.height_cm;
//       const weight = data.weight_kg ?? oldProfile.weight_kg;

//       data.bmi = calculateBMI(height, weight);
//     }

//     const updated = await prisma.medical_profiles.update({
//       where: { userId },
//       data,
//     });

//     res.json(updated);
//   } catch (error) {
//     res.status(500).json({ message: "Cập nhật hồ sơ y tế thất bại", error });
//   }
// };