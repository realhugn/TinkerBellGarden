import express from 'express'
import { createStaff, signIn, signInStaff, signUp, verifyEmail } from '../controller/auth.js'
import { isManager, verifyToken } from '../middlewares/auth.js'
const router = express.Router()

router.post('/signin', signIn)
router.post('/signup', signUp)

router.post('/signin-staff', signInStaff)
router.post('/create-staff', verifyToken, isManager, createStaff)

router.get('/verify/:id/:token', verifyEmail)

export default router