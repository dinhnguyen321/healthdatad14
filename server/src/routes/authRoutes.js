import express from "express";
import authController from "../controllers/authController"

const router = express.Router()

router.get("/register-challenge",authController.registerChallenge)
router.get("/login-challenge",authController.registerResponse)
router.post("/register-response",authController.loginChallenge)
router.post("/login-response",authController.loginResponse)

module.exports = router