import { Router } from 'express'
import { chat, history } from '../controllers/chatController'

const router = Router()

router.post('/', chat)
router.get('/:sessionId', history)

export default router
