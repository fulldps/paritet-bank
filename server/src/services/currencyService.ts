import { query } from '../db/pool'
import { CurrencyRate, TabId, ConversionRequest, ConversionResponse } from '../types/currency'

// Fallback курсы — всегда за 1 единицу валюты к BYN
const fallbackRates: Record<string, number> = {
  BYN: 1,
  USD: 3.0,
  EUR: 3.45,
  RUB: 0.036, // за 1 RUB (не за 100!)
  PLN: 0.8,
  CNY: 0.44,
}

export const getCurrencyRates = async (tab: TabId): Promise<CurrencyRate[]> => {
  const result = await query<CurrencyRate>(
    `SELECT code, name, icon, buy, sell, rate, change
     FROM currency_rates
     WHERE tab = $1
     ORDER BY updated_at ASC`,
    [tab],
  )
  return result.rows
}

export const getAllTabs = async (): Promise<Record<TabId, CurrencyRate[]>> => {
  const tabs: TabId[] = ['iparitet', 'cash', 'cards', 'nbrb']
  const result = await query<CurrencyRate & { tab: TabId }>(
    `SELECT tab, code, name, icon, buy, sell, rate, change
     FROM currency_rates
     ORDER BY tab, updated_at ASC`,
  )

  const grouped = {} as Record<TabId, CurrencyRate[]>
  for (const tab of tabs) grouped[tab] = []
  for (const row of result.rows) {
    const { tab, ...rest } = row
    grouped[tab].push(rest as CurrencyRate)
  }
  return grouped
}

export const convertCurrency = async (request: ConversionRequest): Promise<ConversionResponse> => {
  const { fromCurrency, toCurrency, amount } = request

  // Берём курсы из БД — rate_per_unit хранит курс за 1 единицу валюты
  // (для RUB: 0.036056, для USD: 3.0184, для EUR: 3.4652)
  const ratesResult = await query<{ code: string; rate_per_unit: string }>(
    `SELECT code, rate_per_unit
     FROM currency_rates
     WHERE tab = 'nbrb' AND code = ANY($1)`,
    [[fromCurrency, toCurrency]],
  )

  const ratesMap: Record<string, number> = { ...fallbackRates }
  for (const row of ratesResult.rows) {
    if (row.rate_per_unit) {
      ratesMap[row.code] = Number(row.rate_per_unit)
    }
  }

  // BYN всегда = 1 (база конвертации)
  if (fromCurrency === 'BYN') ratesMap['BYN'] = 1
  if (toCurrency === 'BYN') ratesMap['BYN'] = 1

  const fromRate = ratesMap[fromCurrency] ?? fallbackRates[fromCurrency] ?? 1
  const toRate = ratesMap[toCurrency] ?? fallbackRates[toCurrency] ?? 1

  // Конвертация через BYN как базовую валюту:
  // amount [fromCurrency] * fromRate [BYN per 1 fromCurrency] / toRate [BYN per 1 toCurrency]
  const amountInBYN = amount * fromRate
  const result = amountInBYN / toRate
  const rate = fromRate / toRate

  await query(
    `INSERT INTO exchange_log (from_currency, to_currency, amount, result, rate)
     VALUES ($1, $2, $3, $4, $5)`,
    [fromCurrency, toCurrency, amount, result, rate],
  ).catch(() => {})

  return {
    fromCurrency,
    toCurrency,
    amount,
    result: Number(result.toFixed(4)),
    rate: Number(rate.toFixed(6)),
    timestamp: new Date().toLocaleString('ru-RU'),
  }
}
