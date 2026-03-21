import { CurrencyRate, TabId, ConversionRequest, ConversionResponse } from '../types/currency'

// Mock data (в будущем можно заменить на реальные API)
const currencyData: Record<TabId, CurrencyRate[]> = {
  iparitet: [
    { code: 'USD', name: '1 USD', icon: '$', buy: 2.97, sell: 3.045 },
    { code: 'EUR', name: '1 EUR', icon: '€', buy: 3.445, sell: 3.55 },
    { code: 'RUB', name: '100 RUB', icon: '₽', buy: 3.577, sell: 3.65, change: 'up' },
    { code: 'EUR/USD', name: 'EUR / USD', icon: '€', buy: 1.134, sell: 1.1878 },
    { code: 'EUR/RUB', name: 'EUR / RUB', icon: '€', buy: 94, sell: 98.6 },
    { code: 'USD/RUB', name: 'USD / RUB', icon: '$', buy: 80.5, sell: 85.1 },
  ],
  cash: [
    { code: 'USD', name: '1 USD', icon: '$', buy: 2.98, sell: 3.025, change: 'up' },
    { code: 'EUR', name: '1 EUR', icon: '€', buy: 3.46, sell: 3.51, change: 'up' },
    { code: 'RUB', name: '100 RUB', icon: '₽', buy: 3.597, sell: 3.63, change: 'down' },
    { code: 'PLN', name: '10 PLN', icon: 'zł', buy: 7.9, sell: 8.2 },
    { code: 'CNY', name: '10 CNY', icon: '¥', buy: 4.4, sell: 4.6 },
  ],
  cards: [
    { code: 'USD', name: '1 USD', icon: '$', buy: 2.945, sell: 3.1 },
    { code: 'EUR', name: '1 EUR', icon: '€', buy: 3.405, sell: 3.585 },
    { code: 'RUB', name: '100 RUB', icon: '₽', buy: 3.48, sell: 3.76 },
  ],
  nbrb: [
    { code: 'USD', name: '1 USD', icon: '$', rate: 3.0184, change: 'up' },
    { code: 'EUR', name: '1 EUR', icon: '€', rate: 3.4652, change: 'up' },
    { code: 'RUB', name: '100 RUB', icon: '₽', rate: 3.6056, change: 'down' },
  ],
}

// Курсы для конвертации (к BYN)
const exchangeRates: Record<string, number> = {
  BYN: 1,
  USD: 3.0,
  EUR: 3.45,
  RUB: 0.036,
  PLN: 0.8,
  CNY: 0.44,
}

export const getCurrencyRates = (tab: TabId): CurrencyRate[] => {
  return currencyData[tab] || []
}

export const convertCurrency = (request: ConversionRequest): ConversionResponse => {
  const { fromCurrency, toCurrency, amount } = request

  const fromRate = exchangeRates[fromCurrency] || 1
  const toRate = exchangeRates[toCurrency] || 1

  // Конвертация через BYN
  const amountInBYN = amount * fromRate
  const result = amountInBYN / toRate
  const rate = fromRate / toRate

  return {
    fromCurrency,
    toCurrency,
    amount,
    result: Number(result.toFixed(4)),
    rate: Number(rate.toFixed(6)),
    timestamp: new Date().toLocaleString('ru-RU'),
  }
}

export const getAllTabs = (): Record<TabId, CurrencyRate[]> => {
  return currencyData
}
