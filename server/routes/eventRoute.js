import express from 'express'
import { isAuth, isManager, verifyToken } from '../middlewares/auth.js'
import { createEvent, deleteEvent, getAEvent, getEvents, updateEvent } from '../controller/event.js'
const router = express.Router()

router.get('/', getEvents)
router.get('/:id', getAEvent)
router.post('/', verifyToken, isManager, createEvent);
router.put('/:id', verifyToken, isManager, updateEvent)
router.delete('/:id', verifyToken,isManager, deleteEvent)

export default router