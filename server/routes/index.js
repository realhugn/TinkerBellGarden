import express from 'express'

import authRoute from './authRoute.js'
import customerRoute from './customerRoute.js'
import staffRoute from './staffRoute.js'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/customer', customerRoute)
router.use('/staff', staffRoute)

export default router