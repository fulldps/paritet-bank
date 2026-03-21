export interface CurrencyRate {
  code: string
  name: string
  icon: string
  buy?: number
  sell?: number
  rate?: number
  change?: 'up' | 'down' | 'neutral'
}

export interface ConversionRequest {
  fromCurrency: string
  toCurrency: string
  amount: number
}

export interface ConversionResponse {
  fromCurrency: string
  toCurrency: string
  amount: number
  result: number
  rate: number
  timestamp: string
}

export type TabId = 'iparitet' | 'cash' | 'cards' | 'nbrb'
