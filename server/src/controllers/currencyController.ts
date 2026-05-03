import { Request, Response } from 'express'
import { getCurrencyRates, convertCurrency, getAllTabs } from '../services/currencyService'
import { TabId } from '../types/currency'

const VALID_TABS: TabId[] = ['iparitet', 'cash', 'cards', 'nbrb']

export const getRates = async (req: Request, res: Response) => {
  try {
    const tabId = req.query.tab as TabId
    if (!tabId || !VALID_TABS.includes(tabId)) {
      return res.status(400).json({
        error: 'Invalid tab. Must be one of: iparitet, cash, cards, nbrb',
      })
    }

    const rates = await getCurrencyRates(tabId)
    const timestamp = new Date().toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

    res.json({ success: true, timestamp, tab: tabId, data: rates })
  } catch (error) {
    console.error('Error getting rates:', error)
    res.status(500).json({ error: 'Failed to get currency rates' })
  }
}

export const convert = async (req: Request, res: Response) => {
  try {
    const { fromCurrency, toCurrency, amount } = req.body
    if (!fromCurrency || !toCurrency || !amount) {
      return res.status(400).json({
        error: 'Missing required fields: fromCurrency, toCurrency, amount',
      })
    }

    const result = await convertCurrency({
      fromCurrency,
      toCurrency,
      amount: Number(amount),
    })
    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Error converting:', error)
    res.status(500).json({ error: 'Failed to convert currency' })
  }
}

export const getAllRates = async (req: Request, res: Response) => {
  try {
    const allRates = await getAllTabs()
    const timestamp = new Date().toLocaleString('ru-RU')
    res.json({ success: true, timestamp, data: allRates })
  } catch (error) {
    console.error('Error getting all rates:', error)
    res.status(500).json({ error: 'Failed to get all currency rates' })
  }
}
