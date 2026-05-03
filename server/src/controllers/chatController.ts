import { Request, Response } from 'express'
import { sendChatMessage, getChatHistory } from '../services/chatService'
import { v4 as uuidv4 } from 'uuid'

export const chat = async (req: Request, res: Response) => {
  try {
    const { message, sessionId } = req.body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'message is required' })
    }
    if (message.length > 1000) {
      return res.status(400).json({ error: 'message too long (max 1000 chars)' })
    }

    const session = sessionId || uuidv4()
    const reply = await sendChatMessage(session, message.trim())

    res.json({ success: true, sessionId: session, reply })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Chat service unavailable' })
  }
}

export const history = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params
    if (!sessionId) return res.status(400).json({ error: 'sessionId required' })

    const messages = await getChatHistory(sessionId)
    res.json({ success: true, data: messages })
  } catch (error) {
    console.error('History error:', error)
    res.status(500).json({ error: 'Failed to get history' })
  }
}
