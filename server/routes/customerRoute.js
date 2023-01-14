import express from 'express'
import { isAuth, isManager, verifyToken } from '../middlewares/auth.js'
import { allCustomer, changePassword, deleteCustomer, getCustomer, updateCustomer } from '../controller/customer.js'
const router = express.Router()

router.get('/', verifyToken, isManager, allCustomer) // only manager can get all customer
router.get('/:id', verifyToken, isAuth, getCustomer) 
router.put('/:id', verifyToken, isAuth, updateCustomer) 
router.put('/:id/change-password', verifyToken, isAuth, changePassword)
router.delete('/:id',verifyToken, isAuth, deleteCustomer) 

export default router