import express from "express";
import {
createUser,getAllUsers,updateUser,deleteUser,
getUserById,searchUser,createMedicalProfile,updateMedicalProfile
} from "../controllers/userController.js"

const router = express.Router()

router.get('/',getAllUsers)
router.get('/search',searchUser)
router.get('/:userId',getUserById)
router.post('/',createUser)
router.post('/:userId/medical-profile',createMedicalProfile ) 
router.put('/:userId/medical-profile',updateMedicalProfile ) 
router.put('/:id',updateUser)
router.post('/bulk-delete',deleteUser)
router.delete('/:id',deleteUser)

export default router