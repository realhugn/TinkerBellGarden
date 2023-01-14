import express from 'express'
import { isAuth, isManager, verifyToken } from '../middlewares/auth.js'
import { getAllStaffs } from '../controller/staff.js'
const router = express.Router()

router.get('/', verifyToken, isManager, getAllStaffs) // only manager can get all staffs

export default router