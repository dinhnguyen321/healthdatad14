import express from "express";
import { signIn,register } from "../controllers/loginController.js";
const router = express.Router()

router.post("/signin",signIn)
router.post("/register",register)

export default router