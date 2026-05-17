import dotenv from 'dotenv'
dotenv.config()

import express, { Application } from 'express'
import cors from 'cors'
import currencyRoutes from './routes/currencyRoutes'
import chatRoutes from './routes/chatRoutes'

const app: Application = express()
const PORT = process.env.PORT || 3000

const allowedOrigins = [
  'http://localhost',
  'http://localhost:80',
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[]

app.use(
  cors({
    origin: (origin, callback) => {
      // Разрешаем запросы без origin (curl, Postman) и из списка
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS blocked: ${origin}`))
      }
    },
    credentials: true,
  }),
)

app.use(express.json())

app.use('/api/currency', currencyRoutes)
app.use('/api/chat', chatRoutes)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API: http://localhost:${PORT}/api`)
  console.log(`Chat: POST http://localhost:${PORT}/api/chat`)
  console.log(`Allowed origins: ${allowedOrigins.join(', ')}`)
})
