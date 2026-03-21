import { Request, Response } from 'express'
import { getCurrencyRates, convertCurrency, getAllTabs } from '../services/currencyService'
import { TabId } from '../types/currency'

export const getRates = (req: Request, res: Response) => {
  try {
    const { tab } = req.query
    const tabId = tab as TabId

    if (!tabId || !['iparitet', 'cash', 'cards', 'nbrb'].includes(tabId)) {
      return res.status(400).json({
        error: 'Invalid tab. Must be one of: iparitet, cash, cards, nbrb',
      })
    }

    const rates = getCurrencyRates(tabId)
    const timestamp = new Date().toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    res.json({
      success: true,
      timestamp,
      tab: tabId,
      data: rates,
    })
  } catch (error) {
    console.error('Error getting rates:', error)
    res.status(500).json({ error: 'Failed to get currency rates' })
  }
}

export const convert = (req: Request, res: Response) => {
  try {
    const { fromCurrency, toCurrency, amount } = req.body

    if (!fromCurrency || !toCurrency || !amount) {
      return res.status(400).json({
        error: 'Missing required fields: fromCurrency, toCurrency, amount',
      })
    }

    const result = convertCurrency({ fromCurrency, toCurrency, amount: Number(amount) })

    res.json({
      success: true,
      data: result,
    })
  } catch (error) {
    console.error('Error converting currency:', error)
    res.status(500).json({ error: 'Failed to convert currency' })
  }
}

export const getAllRates = (req: Request, res: Response) => {
  try {
    const allRates = getAllTabs()
    const timestamp = new Date().toLocaleString('ru-RU')

    res.json({
      success: true,
      timestamp,
      data: allRates,
    })
  } catch (error) {
    console.error('Error getting all rates:', error)
    res.status(500).json({ error: 'Failed to get all currency rates' })
  }
}
