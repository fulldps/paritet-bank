import { Router } from 'express'
import { getRates, convert, getAllRates } from '../controllers/currencyController'

const router = Router()

// GET /api/currency/rates?tab=iparitet
router.get('/rates', getRates)

// GET /api/currency/all
router.get('/all', getAllRates)

// POST /api/currency/convert
router.post('/convert', convert)

export default router
