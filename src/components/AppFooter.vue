<script setup lang="ts">
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  AppleIcon,
  PlayStoreIcon,
  FacebookIcon,
  VkIcon,
  InstagramIcon,
  YoutubeIcon,
  TiktokIcon,
  TelegramIcon,
  ArrowUp02Icon,
} from '@hugeicons/core-free-icons'

const privateClients = [
  'Карты',
  'Вклады',
  'Кредиты',
  'Международные переводы',
  'Текущий счет',
  'Акции',
  'Партнерская программа',
  'P2P-переводы',
  'iParitet',
  'ЕРИП без границ',
]
const business = [
  'РКО',
  'Международные платежи',
  'Эквайринг',
  'Зарплатный проект',
  'Кредиты',
  'Депозиты',
  'Акции для Бизнеса',
  'Ценные бумаги',
  'Факторинг',
  'eParitet',
  'Реферальная программа',
]
const info = [
  'Корпоративное управление',
  'Финансовая отчётность',
  'Курсы валют',
  'Офисы и банкоматы',
  'Часто задаваемые вопросы',
  'Новости и уведомления',
  'Работа в банке',
  'О банке',
  'Раскрытие информации',
  'Валютные операции и курсы',
  'Безопасность',
  'Комиссия по противодействию коррупции',
  'Работа с обращениями',
]

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer class="bg-[#2d2d2c] text-white overflow-hidden">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-8 md:py-12">
      <div
        class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-0 mb-8 pb-8 border-b border-gray-600"
      >
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
            <div class="w-4 h-4 bg-[#2d2d2c] rounded-full"></div>
          </div>
          <span class="text-xl sm:text-2xl font-bold"
            >PARITET<span class="font-light">BANK</span></span
          >
        </div>

        <div
          class="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0"
            >
              24
            </div>
            <span class="text-lg sm:text-xl font-medium">171</span>
          </div>
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm shrink-0"
            >
              24
            </div>
            <span class="text-lg sm:text-xl font-medium whitespace-nowrap"
              >+375 (29) 311-49-49</span
            >
          </div>
          <div class="flex sm:flex-col lg:flex-row gap-4 sm:gap-2 lg:gap-6 mt-2 sm:mt-0">
            <button
              class="text-sm text-gray-300 hover:text-blue-400 transition border-b border-transparent hover:border-blue-400 pb-0.5"
            >
              Заказать звонок
            </button>
            <button
              class="text-sm text-gray-300 hover:text-blue-400 transition border-b border-transparent hover:border-blue-400 pb-0.5"
            >
              Задать вопрос
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 xl:gap-12 mb-8">
        <div>
          <h3 class="font-bold mb-3 md:mb-4 text-base md:text-lg">Частным клиентам</h3>
          <ul class="space-y-2.5">
            <li v-for="link in privateClients" :key="link">
              <a href="#" class="text-sm text-gray-400 hover:text-white transition">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold mb-3 md:mb-4 text-base md:text-lg">Для бизнеса</h3>
          <ul class="space-y-2.5">
            <li v-for="link in business" :key="link">
              <a href="#" class="text-sm text-gray-400 hover:text-white transition">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold mb-3 md:mb-4 text-base md:text-lg">Информация</h3>
          <ul class="space-y-2.5">
            <li v-for="link in info" :key="link">
              <a href="#" class="text-sm text-gray-400 hover:text-white transition">{{ link }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold mb-3 md:mb-4 text-base md:text-lg">Скачать приложение</h3>
          <div class="space-y-3">
            <button
              class="flex items-center gap-3 px-4 py-2.5 border border-gray-500 rounded-lg hover:bg-gray-700 transition w-full group"
            >
              <HugeiconsIcon
                :icon="AppleIcon"
                class="w-6 h-6 text-gray-300 group-hover:text-white transition"
              />
              <div class="text-left">
                <div class="text-[10px] md:text-xs text-gray-400">Загрузите в</div>
                <div class="text-sm font-semibold">App Store</div>
              </div>
            </button>
            <button
              class="flex items-center gap-3 px-4 py-2.5 border border-gray-500 rounded-lg hover:bg-gray-700 transition w-full group"
            >
              <HugeiconsIcon
                :icon="PlayStoreIcon"
                class="w-6 h-6 text-gray-300 group-hover:text-white transition"
              />
              <div class="text-left">
                <div class="text-[10px] md:text-xs text-gray-400">Загрузите в</div>
                <div class="text-sm font-semibold">Google Play</div>
              </div>
            </button>
            <button
              class="flex items-center gap-3 px-4 py-2.5 border border-gray-500 rounded-lg hover:bg-gray-700 transition w-full group"
            >
              <div
                class="w-6 h-6 bg-gray-500 group-hover:bg-gray-400 transition rounded flex items-center justify-center text-xs font-bold text-[#2d2d2c]"
              >
                H
              </div>
              <div class="text-left">
                <div class="text-[10px] md:text-xs text-gray-400">Загрузите в</div>
                <div class="text-sm font-semibold">AppGallery</div>
              </div>
            </button>
          </div>

          <div class="flex flex-wrap gap-2 md:gap-3 mt-6">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition"
              ><HugeiconsIcon :icon="FacebookIcon" class="w-5 h-5"
            /></a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition"
              ><HugeiconsIcon :icon="VkIcon" class="w-5 h-5"
            /></a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-600 transition"
              ><HugeiconsIcon :icon="InstagramIcon" class="w-5 h-5"
            /></a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition"
              ><HugeiconsIcon :icon="YoutubeIcon" class="w-5 h-5"
            /></a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-orange-500 transition"
              ><span class="text-sm font-bold">OK</span></a
            >
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-black transition"
              ><HugeiconsIcon :icon="TiktokIcon" class="w-5 h-5"
            /></a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-500 transition"
              ><HugeiconsIcon :icon="TelegramIcon" class="w-5 h-5"
            /></a>
          </div>

          <button
            class="mt-6 flex items-center gap-3 px-4 py-3 border border-blue-500/50 bg-blue-500/10 rounded-lg hover:bg-blue-600 hover:border-blue-600 transition w-full group"
          >
            <div
              class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold shrink-0"
            >
              PDF
            </div>
            <span class="text-sm text-left group-hover:text-white">Сборник размеров платы</span>
          </button>
        </div>
      </div>

      <div
        class="pt-6 md:pt-8 mt-4 md:mt-8 border-t border-gray-600 text-xs md:text-sm text-gray-400"
      >
        <div class="flex flex-col lg:flex-row gap-4 lg:gap-0 items-start justify-between mb-6">
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <a href="#" class="hover:text-white transition">НБРБ</a>
            <a href="#" class="hover:text-white transition"
              >Правила обработки персональных данных</a
            >
            <a href="#" class="hover:text-white transition">Выбор настроек Cookie</a>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div>
            <p>© 2026 ОАО «Паритетбанк». УНП 100233809</p>
            <p class="mt-1 max-w-2xl">
              Информация на сайте носит справочный характер и не является публичной офертой.
            </p>
          </div>
          <div class="flex items-center gap-6 md:gap-8 shrink-0">
            <a href="#" class="text-gray-500 hover:text-white transition font-medium">EV SSL</a>
            <div class="flex items-center gap-2">
              <span class="text-gray-500">Разработка сайта:</span>
              <span class="text-xl md:text-2xl font-bold text-red-600">97</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button
      @click="scrollToTop"
      class="fixed bottom-4 right-4 md:bottom-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] hover:-translate-y-1 z-50"
    >
      <HugeiconsIcon :icon="ArrowUp02Icon" class="w-5 h-5 md:w-6 md:h-6 text-white" />
    </button>
  </footer>
</template>
