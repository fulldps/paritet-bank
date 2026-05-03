<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppChatBot from '@/components/AppChatBot.vue'

const features = [
  { icon: '🌍', title: 'Более 60 стран', desc: 'Переводы по всему миру без ограничений' },
  { icon: '⚡', title: 'Мгновенно', desc: 'Деньги приходят в течение нескольких секунд' },
  { icon: '🔒', title: 'Безопасно', desc: 'Все транзакции защищены шифрованием' },
  { icon: '💰', title: 'Выгодно', desc: 'Минимальная комиссия за перевод' },
]

const steps = [
  { num: '1', title: 'Введите номер карты', desc: 'Укажите номер карты получателя' },
  { num: '2', title: 'Укажите сумму', desc: 'Введите сумму перевода в любой валюте' },
  { num: '3', title: 'Подтвердите', desc: 'Проверьте данные и подтвердите перевод' },
  { num: '4', title: 'Готово', desc: 'Деньги уже у получателя' },
]
</script>

<template>
  <AppHeader />

  <main class="bg-gray-50 min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-r from-[#1e4d8b] to-[#2a6dd9] text-white">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-16 sm:py-20">
        <nav class="text-sm text-white/60 flex items-center gap-2 mb-8">
          <a href="/" class="hover:text-white transition">Главная</a>
          <span>›</span>
          <span class="text-white">P2P переводы</span>
        </nav>
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="flex-1">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Переводы с карты на карту
            </h1>
            <p class="text-white/80 text-lg mb-2">P2P переводы онлайн</p>
            <p class="text-white/60 mb-8 max-w-lg">
              Быстрые и безопасные переводы с карты на карту в более чем 60 стран мира. Без визита в
              банк — прямо с телефона.
            </p>
            <button
              class="px-8 py-4 bg-white text-[#1e4d8b] rounded-full font-semibold hover:bg-blue-50 transition text-lg"
            >
              Совершить перевод
            </button>
          </div>
          <div class="hidden lg:flex items-center justify-center w-72 h-72 bg-white/10 rounded-3xl">
            <span class="text-9xl">💳</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12">
      <!-- Преимущества -->
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Преимущества</h2>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          v-for="f in features"
          :key="f.title"
          class="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
        >
          <div class="text-4xl mb-3">{{ f.icon }}</div>
          <h3 class="font-semibold text-gray-900 mb-1">{{ f.title }}</h3>
          <p class="text-sm text-gray-500">{{ f.desc }}</p>
        </div>
      </div>

      <!-- Как совершить перевод -->
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Как совершить перевод</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div v-for="step in steps" :key="step.num" class="relative">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div
              class="w-10 h-10 bg-[#1e4d8b] text-white rounded-full flex items-center justify-center font-bold mb-4"
            >
              {{ step.num }}
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-500">{{ step.desc }}</p>
          </div>
          <!-- Стрелка между шагами -->
          <div
            v-if="step.num !== '4'"
            class="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 text-gray-300 z-10 text-xl"
          >
            ›
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div
        class="bg-gradient-to-r from-[#1e4d8b] to-[#2a6dd9] rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold mb-2">Готовы к переводу?</h2>
          <p class="text-white/70">Отправьте деньги близким прямо сейчас</p>
        </div>
        <button
          class="px-8 py-4 bg-white text-[#1e4d8b] rounded-full font-semibold hover:bg-blue-50 transition whitespace-nowrap"
        >
          Перевести деньги
        </button>
      </div>
    </div>
  </main>

  <AppFooter />
  <AppChatBot />
</template>
