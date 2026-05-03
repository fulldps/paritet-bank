<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { CurrencyRate } from '../types/currency'

// ========== ИНТЕРФЕЙСЫ ==========
interface ConverterState {
  fromCurrency: string
  toCurrency: string
  amount: number
}

interface ApiResponse<T> {
  success: boolean
  data: T
  timestamp: string
}

// ========== ДАННЫЕ И СТЕЙТ ==========
const tabs = [
  { id: 'iparitet', label: 'iParitet' },
  { id: 'cash', label: 'Наличные' },
  { id: 'cards', label: 'Карточки' },
  { id: 'nbrb', label: 'НБРБ' },
] as const

type TabId = (typeof tabs)[number]['id']

const activeTab = ref<TabId>('iparitet')
const currencyRates = ref<CurrencyRate[]>([])
const timestamp = ref<string>('')
const loading = ref(false)
const error = ref<string | null>(null)

const availableCurrencies = [
  { code: 'BYN', name: 'BYN - Белорусский рубль' },
  { code: 'USD', name: 'USD - Доллар США' },
  { code: 'EUR', name: 'EUR - Евро' },
  { code: 'RUB', name: 'RUB - Российский рубль' },
  { code: 'PLN', name: 'PLN - Польский злотый' },
  { code: 'CNY', name: 'CNY - Китайский юань' },
]

// Стейт конвертера
const converter = ref<ConverterState>({
  fromCurrency: 'RUB',
  toCurrency: 'BYN',
  amount: 1000,
})

const conversionResult = ref<number | null>(null)
const conversionRate = ref<number | null>(null)

// ========== API МЕТОДЫ ==========
// Используем переменную окружения Vite, с фоллбеком для локальной разработки
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const fetchCurrencyRates = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(`${API_URL}/currency/rates?tab=${activeTab.value}`)
    const data: ApiResponse<CurrencyRate[]> = await response.json()

    if (data.success) {
      currencyRates.value = data.data
      timestamp.value = data.timestamp
    }
  } catch (err) {
    error.value = 'Не удалось загрузить курсы валют'
    console.error('Ошибка загрузки курсов:', err)
  } finally {
    loading.value = false
  }
}

const convertCurrency = async () => {
  if (!converter.value.amount) {
    conversionResult.value = null
    return
  }

  try {
    const response = await fetch(`${API_URL}/currency/convert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(converter.value),
    })

    const data = await response.json()

    if (data.success) {
      conversionResult.value = data.data.result
      conversionRate.value = data.data.rate
    }
  } catch (err) {
    console.error('Ошибка конвертации:', err)
  }
}

// ========== ХЕЛПЕРЫ ==========

// Защита от спама запросами (Debounce)
let debounceTimer: ReturnType<typeof setTimeout>
const handleAmountInput = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    convertCurrency()
  }, 500) // Запрос уйдет только если юзер не печатает 500мс
}

const swapCurrencies = () => {
  const temp = converter.value.fromCurrency
  converter.value.fromCurrency = converter.value.toCurrency
  converter.value.toCurrency = temp
  convertCurrency() // При смене валют конвертируем сразу
}

// Красивое форматирование чисел (например: 10 000.50)
const formatCurrency = (value: number | null) => {
  if (value === null) return ''
  return new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value)
}

const getChangeIcon = (change?: 'up' | 'down' | 'neutral') => {
  if (change === 'up') return '↑'
  if (change === 'down') return '↓'
  return ''
}

const getChangeColor = (change?: 'up' | 'down' | 'neutral') => {
  if (change === 'up') return 'text-green-600'
  if (change === 'down') return 'text-red-600'
  return 'text-gray-400'
}

// ========== ЖИЗНЕННЫЙ ЦИКЛ ==========
watch(activeTab, () => {
  fetchCurrencyRates()
})

onMounted(() => {
  fetchCurrencyRates()
  convertCurrency()
})
</script>

<template>
  <section class="py-8 md:py-12">
    <div class="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-20">
      <h2 class="text-3xl md:text-4xl font-light mb-6 md:mb-8 text-gray-900">Сервисы</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div class="lg:col-span-2 bg-gray-100 rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
          <h3 class="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-gray-900">
            Курсы обмена валют
          </h3>

          <div v-if="loading" class="text-center py-8">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"
            ></div>
          </div>

          <div v-else-if="error" class="text-red-600 text-center py-4 bg-red-50 rounded-xl">
            {{ error }}
          </div>

          <template v-else>
            <div class="flex flex-wrap gap-2 md:gap-3 mb-6">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id as TabId"
                class="px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300"
                :class="
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                "
              >
                {{ tab.label }}
              </button>
            </div>

            <div class="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
              Обновлено: {{ timestamp || 'Неизвестно' }}
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              <div class="space-y-2 md:space-y-3">
                <div
                  v-for="currency in currencyRates"
                  :key="currency.code"
                  class="flex items-center justify-between p-3 md:p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
                >
                  <div class="flex items-center gap-3 md:gap-4">
                    <div
                      class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-sm md:text-base shadow-sm"
                    >
                      {{ currency.icon }}
                    </div>
                    <span class="text-sm md:text-base font-medium text-gray-800">
                      {{ currency.name }}
                    </span>
                  </div>

                  <div class="flex items-center gap-4 md:gap-6">
                    <div class="text-right">
                      <div class="text-[10px] md:text-xs text-gray-500 mb-0.5">
                        {{ currency.rate ? 'Курс' : 'Покупка' }}
                      </div>
                      <div class="flex items-center gap-1 justify-end">
                        <span
                          v-if="currency.change"
                          :class="getChangeColor(currency.change)"
                          class="text-xs"
                        >
                          {{ getChangeIcon(currency.change) }}
                        </span>
                        <span class="text-sm md:text-base font-semibold text-gray-900">
                          {{ currency.buy || currency.rate }}
                        </span>
                      </div>
                    </div>

                    <div v-if="currency.sell" class="text-right">
                      <div class="text-[10px] md:text-xs text-gray-500 mb-0.5">Продажа</div>
                      <div class="text-sm md:text-base font-semibold text-gray-900">
                        {{ currency.sell }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="bg-[#374151] rounded-2xl md:rounded-[32px] p-6 md:p-8 text-white shadow-xl sticky top-6"
              >
                <h4 class="text-lg md:text-xl font-medium mb-6">Конвертер валют</h4>

                <div class="flex flex-col relative gap-2">
                  <div
                    class="bg-white rounded-2xl p-2 pl-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-blue-500 transition-all"
                  >
                    <input
                      v-model.number="converter.amount"
                      @input="handleAmountInput"
                      type="number"
                      placeholder="Отдам"
                      class="flex-1 bg-transparent text-gray-900 text-base md:text-lg font-medium outline-none placeholder-gray-400 min-w-0"
                    />
                    <select
                      v-model="converter.fromCurrency"
                      @change="convertCurrency"
                      class="bg-transparent pl-3 pr-2 py-2 text-sm md:text-base font-semibold text-gray-900 outline-none cursor-pointer border-l border-gray-200"
                    >
                      <option
                        v-for="curr in availableCurrencies"
                        :key="curr.code"
                        :value="curr.code"
                      >
                        {{ curr.code }}
                      </option>
                    </select>
                  </div>

                  <button
                    @click="swapCurrencies"
                    aria-label="Поменять валюты местами"
                    class="absolute left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 text-blue-600"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </button>

                  <div class="bg-white rounded-2xl p-2 pl-4 flex items-center justify-between">
                    <input
                      :value="formatCurrency(conversionResult)"
                      type="text"
                      readonly
                      placeholder="Получу"
                      class="flex-1 bg-transparent text-gray-900 text-base md:text-lg font-medium outline-none min-w-0"
                    />
                    <select
                      v-model="converter.toCurrency"
                      @change="convertCurrency"
                      class="bg-transparent pl-3 pr-2 py-2 text-sm md:text-base font-semibold text-gray-900 outline-none cursor-pointer border-l border-gray-200"
                    >
                      <option
                        v-for="curr in availableCurrencies"
                        :key="curr.code"
                        :value="curr.code"
                      >
                        {{ curr.code }}
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  v-if="conversionRate"
                  class="mt-5 text-center text-sm font-medium text-gray-400"
                >
                  1 {{ converter.fromCurrency }} = {{ conversionRate.toFixed(4) }}
                  {{ converter.toCurrency }}
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="bg-gray-100 rounded-2xl shadow-lg p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 class="text-xl md:text-2xl font-medium mb-3 text-gray-900 text-center">
              Офисы и банкоматы
            </h3>
            <p class="text-sm md:text-base text-gray-600 text-center mb-8">
              Найдите ближайшие к вам отделения и банкоматы на карте
            </p>
          </div>

          <div class="flex-1 flex items-center justify-center my-8">
            <div class="relative w-32 h-32 md:w-40 md:h-40">
              <div
                class="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"
              ></div>
              <div
                class="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-xl border border-gray-50"
              >
                <div
                  class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-inner"
                >
                  <svg
                    class="w-8 h-8 md:w-10 md:h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <button
            class="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl mt-auto"
          >
            Смотреть на карте
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
