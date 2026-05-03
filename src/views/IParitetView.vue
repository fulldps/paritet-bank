<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppChatBot from '@/components/AppChatBot.vue'

const features = [
  {
    icon: '🎨',
    title: 'Интуитивный дизайн',
    desc: 'Всё как на ладони: просто найти, легко управлять и невозможно забыть',
  },
  {
    icon: '📊',
    title: 'Комфортное управление',
    desc: 'Всеми продуктами в одном месте. Открыл — увидел — результат',
  },
  {
    icon: '⚡',
    title: 'Быстрая регистрация',
    desc: 'Никакого опросника и тысячи полей. Нужна карточка Paritetbank или документ',
  },
  { icon: '💸', title: 'Удобные платежи', desc: 'Переводы и оплата без лишних слов и действий' },
]

const freeFeatures = [
  'Просмотр курсов валют',
  'Карты офисов и банкоматов',
  'Сервис P2P переводов',
  'Заказ банковских продуктов',
  'Информативные stories',
  'Демонстрация и обучение',
]

const stores = [
  { name: 'App Store', icon: '🍎', sub: 'Загрузите в' },
  { name: 'Google Play', icon: '▶', sub: 'Загрузите в' },
  { name: 'AppGallery', icon: '🔶', sub: 'Загрузите в' },
]
</script>

<template>
  <AppHeader />

  <main class="bg-gray-50 min-h-screen">
    <!-- Hero -->
    <div class="bg-gradient-to-br from-[#0f3460] via-[#1e4d8b] to-[#2a6dd9] text-white">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-16 sm:py-20">
        <nav class="text-sm text-white/60 flex items-center gap-2 mb-8">
          <a href="/" class="hover:text-white transition">Главная</a>
          <span>›</span>
          <span class="text-white">iParitet</span>
        </nav>
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="flex-1">
            <span
              class="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-4"
            >
              Мобильный банк
            </span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Встречайте совершенно новый мобильный банк
              <span class="text-blue-300">«iParitet»</span>
            </h1>
            <p class="text-white/70 mb-8 max-w-lg text-lg">
              Решение финансовых запросов вашего смартфона. Быстро, удобно, безопасно.
            </p>
            <div class="flex flex-wrap gap-4">
              <button
                v-for="store in stores"
                :key="store.name"
                class="flex items-center gap-3 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition"
              >
                <span class="text-2xl">{{ store.icon }}</span>
                <div class="text-left">
                  <p class="text-white/60 text-xs">{{ store.sub }}</p>
                  <p class="font-semibold text-sm">{{ store.name }}</p>
                </div>
              </button>
            </div>
          </div>
          <div class="hidden lg:flex items-center justify-center">
            <div
              class="w-64 h-[480px] bg-white/10 rounded-[3rem] border-2 border-white/20 flex items-center justify-center"
            >
              <div class="text-center">
                <div class="text-6xl mb-4">📱</div>
                <p class="text-white/60 text-sm">iParitet App</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-12">
      <!-- Возможности -->
      <h2 class="text-2xl font-bold text-gray-900 mb-8">Возможности приложения</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          v-for="f in features"
          :key="f.title"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <div class="text-4xl mb-4">{{ f.icon }}</div>
          <h3 class="font-semibold text-gray-900 mb-2">{{ f.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>

      <!-- Без регистрации -->
      <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 sm:p-12 mb-12">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Без регистрации вам доступно</h2>
        <p class="text-gray-500 mb-8">Чувствуйте себя уютно, как дома</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="item in freeFeatures"
            :key="item"
            class="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl"
          >
            <div
              class="w-8 h-8 bg-[#1e4d8b] rounded-full flex items-center justify-center shrink-0"
            >
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span class="text-sm font-medium text-gray-800">{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- Скачать -->
      <div
        class="bg-gradient-to-r from-[#1e4d8b] to-[#2a6dd9] rounded-3xl p-8 sm:p-12 text-white text-center"
      >
        <h2 class="text-2xl sm:text-3xl font-bold mb-2">Скачайте iParitet прямо сейчас</h2>
        <p class="text-white/70 mb-8">Доступно для iOS, Android и Huawei</p>
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="store in stores"
            :key="store.name"
            class="flex items-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition"
          >
            <span class="text-2xl">{{ store.icon }}</span>
            <div class="text-left">
              <p class="text-white/60 text-xs">{{ store.sub }}</p>
              <p class="font-semibold">{{ store.name }}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  </main>

  <AppFooter />
  <AppChatBot />
</template>
