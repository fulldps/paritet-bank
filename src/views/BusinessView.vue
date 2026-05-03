<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppChatBot from '@/components/AppChatBot.vue'

const slides = [
  {
    tag: 'Международные платежи',
    title: 'Международные платежи для бизнеса',
    subtitle: '185 стран',
    btn: 'Подробнее',
    bg: 'from-[#1e4d8b] to-[#2a6dd9]',
  },
  {
    tag: 'Обслуживание 24/7',
    title: 'Paritetbank выручает 24/7',
    subtitle: 'Открытие счетов и обслуживание бизнеса удалённо',
    btn: 'Подробнее',
    bg: 'from-[#0f3460] to-[#1e4d8b]',
  },
  {
    tag: 'Бизнес-касса',
    title: 'Ваша законопослушная бизнес-касса',
    subtitle: 'Бесплатный терминал',
    btn: 'Подробнее',
    bg: 'from-[#1a5276] to-[#2471a3]',
  },
]

const offers = [
  {
    icon: '🏦',
    title: 'Открытие счёта',
    desc: 'Пакеты РКО от 0 BYN/мес. Международные платежи в 185 стран мира.',
    btn: 'Открыть счёт',
  },
  {
    icon: '💼',
    title: 'Зарплатный проект',
    desc: '0,0001% за вывод личного дохода. 0,1% за зачисление зарплаты сотрудникам. Зарплатные карты с манибэком.',
    btn: 'Подробнее',
  },
  {
    icon: '💳',
    title: 'Эквайринг',
    desc: 'Снижены тарифы на интернет-эквайринг. Принимайте платежи с комиссией от 1,1%.',
    btn: 'Подробнее',
  },
  {
    icon: '💰',
    title: 'Кредиты для бизнеса',
    desc: 'До 1 125 000 BYN. Решение от 2-х часов. Срок ведения деятельности от 6 месяцев. Без залога до 150 000 BYN.',
    btn: 'Подробнее',
  },
  {
    icon: '🤝',
    title: 'Реферальная программа',
    desc: 'Рекомендуйте банк и получайте до 500 BYN за каждого привлечённого клиента.',
    btn: 'Подробнее',
  },
  {
    icon: '📱',
    title: 'Своё дело',
    desc: 'Бизнес-сервис для ИП и малого бизнеса. Онлайн открываем счёт, оплата и зарплата.',
    btn: 'Подробнее',
  },
]

const services = [
  {
    category: 'Расчётно-кассовое обслуживание',
    items: [
      'Тарифный пакет RUBин',
      'Бизнес-сервис «Своё дело»',
      'Сдача выручки',
      'Снятие наличных',
      'Электронная торговая площадка',
    ],
  },
  {
    category: 'Международные платежи',
    items: ['Платежи в 185 стран', 'ISO20022', 'Мгновенные платежи', 'Документарное инкассо'],
  },
  {
    category: 'Эквайринг',
    items: [
      'Интернет-эквайринг',
      'Мобильный эквайринг',
      'Торговый эквайринг',
      'Пакет «Бизнес-касса»',
    ],
  },
  {
    category: 'Кредиты',
    items: [
      'Овердрафтное кредитование',
      'Лёгкий',
      'Авто',
      'Лёгкий старт PRO',
      'Банк развития',
      'Инвест',
      'Инвест PRO',
    ],
  },
  {
    category: 'Зарплатный проект',
    items: ['Корпоративные платёжные карты', 'Зачисление зарплаты 0,1%', 'Карты с манибэком'],
  },
  {
    category: 'Финансирование',
    items: [
      'Факторинг',
      'Международное торговое финансирование',
      'Банк развития',
      'Документарные аккредитивы',
      'Банковские гарантии',
    ],
  },
  {
    category: 'Ценные бумаги',
    items: ['Брокерское обслуживание', 'Доверительное управление', 'Облигации ОАО «Паритетбанк»'],
  },
  {
    category: 'Депозиты и тарифы',
    items: [
      'Депозиты для бизнеса',
      'Тарифы',
      'Реферальная программа',
      'Стать партнёром на кредитование',
    ],
  },
]
</script>

<template>
  <AppHeader />

  <main class="bg-gray-50 min-h-screen">
    <!-- Hero слайдер (статичный первый слайд) -->
    <div class="bg-gradient-to-r from-[#1e4d8b] to-[#2a6dd9] text-white">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12 sm:py-16 lg:py-20">
        <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div class="flex-1">
            <span
              class="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4"
            >
              Международные платежи
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Международные платежи для бизнеса
            </h1>
            <p class="text-white/80 text-lg mb-2">185 стран мира</p>
            <p class="text-white/60 text-sm mb-8">Быстрые и надёжные платежи для вашего бизнеса</p>
            <div class="flex flex-wrap gap-4">
              <button
                class="px-8 py-3 bg-white text-[#1e4d8b] rounded-full font-semibold hover:bg-blue-50 transition"
              >
                Подробнее
              </button>
              <button
                class="px-8 py-3 border border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition"
              >
                Открыть счёт
              </button>
            </div>
          </div>
          <div class="hidden lg:flex items-center justify-center w-64 h-64 bg-white/10 rounded-3xl">
            <span class="text-8xl">🌍</span>
          </div>
        </div>

        <!-- Слайд-индикаторы -->
        <div class="flex items-center gap-2 mt-8">
          <button
            v-for="(_, i) in slides"
            :key="i"
            :class="[
              'h-1.5 rounded-full transition-all',
              i === 0 ? 'bg-white w-8' : 'bg-white/40 w-4',
            ]"
          />
        </div>
      </div>
    </div>

    <!-- eParitet banner -->
    <div class="bg-[#0f3460] text-white">
      <div
        class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm"
          >
            eP
          </div>
          <div>
            <p class="font-semibold">eParitet</p>
            <p class="text-white/60 text-xs">Мобильный банк для бизнеса</p>
          </div>
        </div>
        <button
          class="px-6 py-2 bg-blue-500 hover:bg-blue-400 rounded-full text-sm font-medium transition"
        >
          Скачать
        </button>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12">
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 flex items-center gap-2 mb-10">
        <a href="/" class="hover:text-[#1e4d8b] transition">Главная</a>
        <span>›</span>
        <span class="text-gray-800">Для бизнеса</span>
      </nav>

      <!-- Предложения -->
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Предложения</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div
          v-for="offer in offers"
          :key="offer.title"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition group"
        >
          <div class="text-3xl mb-4">{{ offer.icon }}</div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ offer.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed mb-4">{{ offer.desc }}</p>
          <button
            class="text-[#1e4d8b] text-sm font-medium hover:underline group-hover:text-blue-600 transition"
          >
            {{ offer.btn }} →
          </button>
        </div>
      </div>

      <!-- Все услуги -->
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Все услуги для бизнеса</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="service in services"
          :key="service.category"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 class="font-semibold text-[#1e4d8b] mb-4 pb-3 border-b border-blue-100">
            {{ service.category }}
          </h3>
          <ul class="space-y-2">
            <li v-for="item in service.items" :key="item">
              <a
                href="#"
                class="text-sm text-gray-600 hover:text-[#1e4d8b] transition flex items-start gap-2"
              >
                <span class="text-blue-300 mt-0.5 shrink-0">›</span>
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- CTA блок -->
      <div
        class="mt-16 bg-gradient-to-r from-[#1e4d8b] to-[#2a6dd9] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold mb-2">Откройте счёт онлайн</h2>
          <p class="text-white/70">Без визита в банк. Быстро и удобно.</p>
        </div>
        <button
          class="px-8 py-4 bg-white text-[#1e4d8b] rounded-full font-semibold hover:bg-blue-50 transition whitespace-nowrap"
        >
          Открыть счёт
        </button>
      </div>
    </div>
  </main>

  <AppFooter />
  <AppChatBot />
</template>
