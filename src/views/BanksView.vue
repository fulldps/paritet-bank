<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppChatBot from '@/components/AppChatBot.vue'

const sideMenu = [
  { text: 'Корреспондентские отношения', to: '/banks', active: true },
  { text: 'Операции на финансовых рынках', to: '#' },
  { text: 'Противодействие легализации преступных доходов', to: '#' },
  { text: 'История банка', to: '#' },
]

const services = [
  {
    title: 'Расчётно-кассовое обслуживание',
    icon: '🏦',
    items: [
      'Открытие и ведение корреспондентских счетов в BYN и иностранной валюте',
      'Оптимальное проведение всех видов расчётов с использованием корреспондентской сети',
      'Гибкие тарифы обслуживания',
      'Индивидуальный подход к клиентам',
    ],
  },
  {
    title: 'Осуществление расчётов',
    icon: '💱',
    items: [
      'Мгновенные платежи',
      'График обслуживания клиентов',
      'Дополнительные услуги',
      'Документарное инкассо',
    ],
  },
  {
    title: 'Финансирование',
    icon: '📈',
    items: [
      'Международное торговое финансирование',
      'Банк развития',
      'Документарные аккредитивы',
      'Банковские гарантии',
    ],
  },
  {
    title: 'Международные платежи',
    icon: '🌍',
    items: ['Платежи в 185 стран мира', 'ISO20022', 'Мгновенные платежи', 'Документарное инкассо'],
  },
]

const advantages = [
  {
    icon: '🤝',
    title: 'Индивидуальный подход',
    desc: 'Персональный менеджер для каждого банка-партнёра',
  },
  {
    icon: '💱',
    title: 'Гибкие тарифы',
    desc: 'Тарифы формируются индивидуально под объём операций',
  },
  { icon: '⚡', title: 'Оперативность', desc: 'Быстрое открытие счетов и проведение платежей' },
  { icon: '🔒', title: 'Надёжность', desc: 'Более 30 лет на финансовом рынке Беларуси' },
]

const currencies = ['BYN', 'USD', 'EUR', 'RUB', 'GBP', 'CHF', 'CNY', 'PLN']
</script>

<template>
  <AppHeader />

  <main class="bg-gray-50 min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-r from-[#0f3460] to-[#1e4d8b] text-white">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-16 sm:py-20">
        <nav class="text-sm text-white/60 flex items-center gap-2 mb-8">
          <a href="/" class="hover:text-white transition">Главная</a>
          <span>›</span>
          <span class="text-white/60">Банкам</span>
          <span>›</span>
          <span class="text-white">Корреспондентские отношения</span>
        </nav>
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="flex-1">
            <span class="inline-block bg-white/20 text-xs font-medium px-3 py-1 rounded-full mb-4">
              Финансовым институтам
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Paritetbank оказывает услуги финансовым институтам по открытию и ведению
              корреспондентских счетов в белорусских рублях и иностранной валюте.
            </h1>
            <p class="text-white/70 text-lg mb-8 max-w-xl">
              Paritetbank оказывает услуги финансовым институтам по открытию и ведению
              корреспондентских счетов в белорусских рублях и иностранной валюте.
            </p>
            <div class="flex flex-wrap gap-4">
              <a
                href="tel:+375173114529"
                class="px-8 py-3 bg-white text-[#1e4d8b] rounded-full font-semibold hover:bg-blue-50 transition"
              >
                +375 (17) 311 45 29
              </a>
              <a
                href="mailto:FI@paritetbank.by"
                class="px-8 py-3 border border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition"
              >
                FI@paritetbank.by
              </a>
            </div>
          </div>
          <div class="hidden lg:flex items-center justify-center w-64 h-64 bg-white/10 rounded-3xl">
            <span class="text-9xl">🏛</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12 flex gap-8">
      <!-- Sidebar -->
      <aside class="hidden lg:block w-64 shrink-0">
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6"
        >
          <div class="bg-[#1e4d8b] px-6 py-4">
            <h2 class="text-white font-semibold">Финансовым институтам</h2>
          </div>
          <nav class="py-2">
            <a
              v-for="item in sideMenu"
              :key="item.text"
              :href="item.to"
              :class="[
                'block px-6 py-2.5 text-sm transition border-l-2',
                item.active
                  ? 'text-[#1e4d8b] font-medium bg-blue-50 border-[#1e4d8b]'
                  : 'text-gray-700 hover:bg-blue-50 hover:text-[#1e4d8b] border-transparent hover:border-[#1e4d8b]',
              ]"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>
      </aside>

      <!-- Main -->
      <div class="flex-1 min-w-0">
        <!-- Валюты счетов -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Валюты корреспондентских счетов</h2>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="cur in currencies"
              :key="cur"
              class="px-4 py-2 bg-blue-50 text-[#1e4d8b] rounded-xl font-semibold text-sm border border-blue-100"
            >
              {{ cur }}
            </span>
          </div>
        </div>

        <!-- Услуги -->
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Услуги для финансовых институтов</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div
            v-for="service in services"
            :key="service.title"
            class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div class="text-3xl mb-3">{{ service.icon }}</div>
            <h3 class="font-semibold text-[#1e4d8b] mb-4 pb-3 border-b border-blue-100">
              {{ service.title }}
            </h3>
            <ul class="space-y-2">
              <li
                v-for="item in service.items"
                :key="item"
                class="flex items-start gap-2 text-sm text-gray-600"
              >
                <span class="text-blue-400 mt-0.5 shrink-0">›</span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Преимущества -->
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Преимущества сотрудничества</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div
            v-for="adv in advantages"
            :key="adv.title"
            class="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
          >
            <div class="text-3xl mb-3">{{ adv.icon }}</div>
            <h3 class="font-semibold text-gray-900 mb-1 text-sm">{{ adv.title }}</h3>
            <p class="text-xs text-gray-500 leading-relaxed">{{ adv.desc }}</p>
          </div>
        </div>

        <!-- Доп. информация -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Дополнительная информация</h2>
          <a
            href="#"
            class="inline-flex items-center gap-3 px-6 py-3 border border-blue-200 bg-blue-50 rounded-xl hover:bg-blue-100 transition text-[#1e4d8b] font-medium text-sm"
          >
            <span class="text-xl">📄</span>
            Информация о праздничных днях банков стран-эмитентов иностранной валюты
          </a>
        </div>

        <!-- CTA -->
        <div
          class="bg-gradient-to-r from-[#1e4d8b] to-[#2a6dd9] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <h2 class="text-2xl font-bold mb-2">Стать партнёром</h2>
            <p class="text-white/70">
              Свяжитесь с нами для установления корреспондентских отношений
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:+375173114529"
              class="px-6 py-3 bg-white text-[#1e4d8b] rounded-full font-semibold hover:bg-blue-50 transition text-center"
            >
              Позвонить
            </a>
            <a
              href="mailto:FI@paritetbank.by"
              class="px-6 py-3 border border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition text-center"
            >
              Написать
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <AppFooter />
  <AppChatBot />
</template>
