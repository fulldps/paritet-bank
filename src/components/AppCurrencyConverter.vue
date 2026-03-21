<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { CurrencyRate } from '../types/currency'

// ========== INTERFACES ==========
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

// ========== DATA ==========
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

// Конвертер
const converter = ref<ConverterState>({
  fromCurrency: 'RUB',
  toCurrency: 'BYN',
  amount: 1,
})

const conversionResult = ref<number | null>(null)
const conversionRate = ref<number | null>(null)

const availableCurrencies = [
  { code: 'BYN', name: 'BYN - Белорусский рубль' },
  { code: 'USD', name: 'USD - Доллар США' },
  { code: 'EUR', name: 'EUR - Евро' },
  { code: 'RUB', name: 'RUB - Российский рубль' },
  { code: 'PLN', name: 'PLN - Польский злотый' },
  { code: 'CNY', name: 'CNY - Китайский юань' },
]

// ========== API METHODS ==========
const API_URL = 'http://localhost:3000/api/currency'

const fetchCurrencyRates = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(`${API_URL}/rates?tab=${activeTab.value}`)
    const data: ApiResponse<CurrencyRate[]> = await response.json()

    if (data.success) {
      currencyRates.value = data.data
      timestamp.value = data.timestamp
    }
  } catch (err) {
    error.value = 'Failed to load currency rates'
    console.error('Error fetching rates:', err)
  } finally {
    loading.value = false
  }
}

const convertCurrency = async () => {
  try {
    const response = await fetch(`${API_URL}/convert`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromCurrency: converter.value.fromCurrency,
        toCurrency: converter.value.toCurrency,
        amount: converter.value.amount,
      }),
    })

    const data = await response.json()

    if (data.success) {
      conversionResult.value = data.data.result
      conversionRate.value = data.data.rate
    }
  } catch (err) {
    console.error('Error converting:', err)
  }
}

// ========== HELPERS ==========
const swapCurrencies = () => {
  const temp = converter.value.fromCurrency
  converter.value.fromCurrency = converter.value.toCurrency
  converter.value.toCurrency = temp
  convertCurrency()
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

// ========== WATCHERS ==========
import { watch } from 'vue'

watch(activeTab, () => {
  fetchCurrencyRates()
})

// ========== LIFECYCLE ==========
onMounted(() => {
  fetchCurrencyRates()
  convertCurrency()
})
</script>

<template>
  <section class="py-8 md:py-12 bg-gray-50">
    <div class="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-20">
      <h2 class="text-3xl md:text-4xl font-light mb-6 md:mb-8 text-gray-900">Сервисы</h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- ЛЕВАЯ КОЛОНКА: Курсы валют -->
        <div class="lg:col-span-2 bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8">
          <h3 class="text-xl md:text-2xl font-medium mb-4 md:mb-6 text-gray-900">
            Курсы обмена валют
          </h3>

          <!-- Loading state -->
          <div v-if="loading" class="text-center py-8">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"
            ></div>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="text-red-600 text-center py-4">
            {{ error }}
          </div>

          <template v-else>
            <!-- Табы -->
            <div class="flex flex-wrap gap-2 md:gap-3 mb-6">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id as TabId"
                class="px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300"
                :class="
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                "
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Timestamp -->
            <div class="text-xs md:text-sm text-gray-500 mb-4 md:mb-6">
              {{ timestamp }}
            </div>

            <!-- Grid: Таблица курсов + Конвертер -->
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <!-- Таблица курсов -->
              <div class="space-y-3">
                <div
                  v-for="currency in currencyRates"
                  :key="currency.code"
                  class="flex items-center justify-between p-3 md:p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center gap-3 md:gap-4">
                    <div
                      class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm md:text-base shadow-md"
                    >
                      {{ currency.icon }}
                    </div>
                    <span class="text-sm md:text-base font-medium text-gray-800">
                      {{ currency.name }}
                    </span>
                  </div>

                  <div class="flex items-center gap-3 md:gap-6">
                    <div class="text-right">
                      <div class="text-xs text-gray-500 mb-0.5 hidden sm:block">
                        {{ currency.rate ? 'Курс' : 'Покупка' }}
                      </div>
                      <div class="flex items-center gap-1">
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
                      <div class="text-xs text-gray-500 mb-0.5 hidden sm:block">Продажа</div>
                      <div class="text-sm md:text-base font-semibold text-gray-900">
                        {{ currency.sell }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Конвертер валют -->
              <div
                class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-4 md:p-6 lg:p-8 text-white shadow-xl"
              >
                <h4 class="text-lg md:text-xl font-medium mb-4 md:mb-6">Конвертер валют</h4>

                <div class="space-y-3 md:space-y-4">
                  <!-- Отдам -->
                  <div class="bg-white rounded-xl p-3 md:p-4">
                    <div class="flex items-center justify-between gap-3">
                      <input
                        v-model.number="converter.amount"
                        @input="convertCurrency"
                        type="number"
                        placeholder="Сумма"
                        class="flex-1 bg-transparent text-gray-900 text-base md:text-lg font-medium outline-none placeholder-gray-400"
                      />
                      <select
                        v-model="converter.fromCurrency"
                        @change="convertCurrency"
                        class="bg-gray-100 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium text-gray-900 outline-none cursor-pointer hover:bg-gray-200 transition"
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

                  <!-- Кнопка swap -->
                  <div class="flex justify-center -my-2 relative z-10">
                    <button
                      @click="swapCurrencies"
                      class="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
                    >
                      <svg
                        class="w-5 h-5 md:w-6 md:h-6 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                        />
                      </svg>
                    </button>
                  </div>

                  <!-- Получу -->
                  <div class="bg-white rounded-xl p-3 md:p-4">
                    <div class="flex items-center justify-between gap-3">
                      <input
                        :value="conversionResult?.toFixed(4) || '0.00'"
                        type="text"
                        readonly
                        class="flex-1 bg-transparent text-gray-900 text-base md:text-lg font-medium outline-none"
                      />
                      <select
                        v-model="converter.toCurrency"
                        @change="convertCurrency"
                        class="bg-gray-100 px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium text-gray-900 outline-none cursor-pointer hover:bg-gray-200 transition"
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
                </div>

                <!-- Rate info -->
                <div v-if="conversionRate" class="mt-4 text-center text-sm text-gray-300">
                  1 {{ converter.fromCurrency }} = {{ conversionRate.toFixed(6) }}
                  {{ converter.toCurrency }}
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- ПРАВАЯ КОЛОНКА: Офисы и банкоматы -->
        <div class="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 flex flex-col">
          <h3 class="text-xl md:text-2xl font-medium mb-2 text-gray-900 text-center">
            Офисы и банкоматы
          </h3>
          <p class="text-sm md:text-base text-gray-600 text-center mb-6 md:mb-8">
            Найдите ближайшие к вам отделения и банкоматы
          </p>

          <div class="flex-1 flex items-center justify-center mb-6 md:mb-8">
            <div class="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
              <div
                class="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-full blur-xl opacity-30"
              ></div>
              <div
                class="relative w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-2xl"
              >
                <div
                  class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg"
                >
                  <svg
                    class="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white"
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
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-3.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
