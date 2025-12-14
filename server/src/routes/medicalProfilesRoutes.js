import express from "express";
import {
createMedicalProfile,updateMedicalProfile
} from "../controllers/medicalProfilesController.js"

const router = express.Router()
router.post("/medical/:userId", createMedicalProfile);
router.put("/medical/:userId", updateMedicalProfile);

export default router
