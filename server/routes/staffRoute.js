import express from 'express'
import { isAuth, isManager, verifyToken } from '../middlewares/auth.js'
import { deleteStaff, getAllStaffs, getStaff, updateStaff } from '../controller/staff.js'
const router = express.Router()

router.get('/', verifyToken, isManager, getAllStaffs) // only manager can get all staffs
router.get('/:id', verifyToken, isAuth, getStaff)
router.put('/:id', verifyToken, isAuth, updateStaff) 
router.put('/:id/change-password', verifyToken, isAuth, changePassword)
router.delete('/:id', verifyToken, isAuth, deleteStaff) 

export default router