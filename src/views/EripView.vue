<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppChatBot from '@/components/AppChatBot.vue'

const stats = [
  { value: 'Карты зарубежных банков*', label: 'Принимаем' },
  { value: '1%', label: 'Комиссия с каждой операции' },
  { value: 'Любая валюта', label: 'Оплата картой банка-эмитента' },
  { value: 'Из любой точки мира', label: 'Оплата 24/7' },
]

const popularPayments = [
  { icon: '🏠', title: 'Коммунальные платежи', desc: 'ЖКХ, электричество, газ, вода' },
  { icon: '📡', title: 'Интернет, телевидение, телефония', desc: 'Все операторы Беларуси' },
  { icon: '🛒', title: 'Интернет-магазины', desc: 'Оплата покупок онлайн' },
]

const steps = [
  {
    num: '1',
    title: 'Зайти на страницу сервиса',
    desc: 'Перейдите по ссылке на сервис ЕРИП без границ',
  },
  { num: '2', title: 'Заполнить информацию', desc: 'Укажите данные карты и реквизиты платежа' },
  { num: '3', title: 'Совершить платёж через ЕРИП', desc: 'Подтвердите и оплатите' },
]

const faqs = [
  {
    q: 'Можно ли оплатить картой VISA?',
    a: 'По техническим причинам приём карточек VISA временно приостановлен. О возобновлении сообщим дополнительно.',
  },
  {
    q: 'Для кого предназначен сервис?',
    a: 'Сервис удобен для иностранных граждан на территории Беларуси, а также белорусов за границей.',
  },
  {
    q: 'Какие платёжные системы поддерживаются?',
    a: 'Mastercard, а также карты банков Российской Федерации.',
  },
]

import { ref } from 'vue'
const openFaq = ref<number | null>(null)
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
          <span class="text-white">ЕРИП без границ</span>
        </nav>
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="flex-1">
            <span class="inline-block bg-white/20 text-xs font-medium px-3 py-1 rounded-full mb-4">
              Онлайн-оплата
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              ЕРИП без границ
            </h1>
            <p class="text-white/80 text-lg mb-2">Платежи из любой точки мира</p>
            <p class="text-white/60 mb-8 max-w-lg">
              Оплачивайте услуги через ЕРИП с карт зарубежных банков — сервис для оплаты из любой
              точки мира.
            </p>
            <button
              class="px-8 py-4 bg-white text-[#1e4d8b] rounded-full font-semibold hover:bg-blue-50 transition text-lg"
            >
              Совершить платёж
            </button>
          </div>
          <div class="hidden lg:flex items-center justify-center w-72 h-64 bg-white/10 rounded-3xl">
            <span class="text-9xl">🌍</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12">
      <!-- Статистика -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        <div
          v-for="stat in stats"
          :key="stat.value"
          class="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
        >
          <p class="font-bold text-[#1e4d8b] text-lg leading-tight mb-1">{{ stat.value }}</p>
          <p class="text-sm text-gray-500">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Популярные платежи -->
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Популярные платежи</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div
          v-for="p in popularPayments"
          :key="p.title"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition"
        >
          <div class="text-4xl mb-4">{{ p.icon }}</div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ p.title }}</h3>
          <p class="text-sm text-gray-500">{{ p.desc }}</p>
        </div>
      </div>

      <!-- Как совершить платёж -->
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Как совершить платёж</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        <div v-for="step in steps" :key="step.num" class="relative">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div
              class="w-10 h-10 bg-[#1e4d8b] text-white rounded-full flex items-center justify-center font-bold mb-4"
            >
              {{ step.num }}
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Часто задаваемые вопросы</h2>
      <div class="space-y-3 mb-16">
        <div
          v-for="(faq, i) in faqs"
          :key="i"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <button
            @click="openFaq = openFaq === i ? null : i"
            class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
          >
            <span class="font-medium text-gray-800">{{ faq.q }}</span>
            <span
              class="text-[#1e4d8b] text-xl shrink-0 ml-4 transition-transform duration-300"
              :class="openFaq === i ? 'rotate-45' : ''"
              >+</span
            >
          </button>
          <div
            class="overflow-hidden transition-all duration-300"
            :class="openFaq === i ? 'max-h-40' : 'max-h-0'"
          >
            <p
              class="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4"
            >
              {{ faq.a }}
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="bg-gradient-to-r from-[#1e4d8b] to-[#2a6dd9] rounded-3xl p-8 sm:p-12 text-white text-center"
      >
        <h2 class="text-2xl sm:text-3xl font-bold mb-2">Оплатите прямо сейчас</h2>
        <p class="text-white/70 mb-8">С карт Mastercard и банков РФ из любой точки мира</p>
        <button
          class="px-8 py-4 bg-white text-[#1e4d8b] rounded-full font-semibold hover:bg-blue-50 transition text-lg"
        >
          Перейти к сервису
        </button>
        <p class="text-white/40 text-xs mt-4">* Mastercard, с карт банков РФ</p>
      </div>
    </div>
  </main>

  <AppFooter />
  <AppChatBot />
</template>
