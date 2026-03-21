import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import currencyRoutes from './routes/currencyRoutes'

dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Vue frontend
    credentials: true,
  }),
)
app.use(express.json())

// Routes
app.use('/api/currency', currencyRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 API available at http://localhost:${PORT}/api`)
})
