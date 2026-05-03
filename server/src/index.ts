import dotenv from 'dotenv'
// ВАЖНО: dotenv.config() вызывается ДО всех импортов, которые читают process.env
dotenv.config()

import express, { Application } from 'express'
import cors from 'cors'
import currencyRoutes from './routes/currencyRoutes'
import chatRoutes from './routes/chatRoutes'

const app: Application = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use('/api/currency', currencyRoutes)
app.use('/api/chat', chatRoutes)

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API: http://localhost:${PORT}/api`)
  console.log(`Chat: POST http://localhost:${PORT}/api/chat`)
})
