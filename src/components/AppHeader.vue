<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { AppleIcon, PlayStoreIcon, EyeIcon, CancelSquareIcon } from '@hugeicons/core-free-icons'

const isMenuOpen = ref(false)

const headerMenu = ref([
  {
    title: 'Карты',
    links: [
      { text: 'С манибэком' },
      { text: 'Кредитные' },
      { text: 'Виртуальные' },
      { text: 'Премиальные' },
      { text: 'Белкарт' },
      { text: 'Visa' },
      { text: 'Mastercard' },
      { text: 'Зарплатные' },
    ],
  },
  {
    title: 'Кредиты',
    links: [
      { text: 'Наличными' },
      { text: 'На белорусские товары' },
      { text: 'Онлайн-кредиты' },
      { text: 'Потребительские' },
      { text: 'Кредитные карты' },
      { text: 'Партнерские' },
      { text: 'Зарплатным клиентам' },
    ],
  },
  {
    title: 'Вклады',
    links: [
      { text: 'Вклады в BYN' },
      { text: 'Вклады в USD' },
      { text: 'Вклады в RUB' },
      { text: 'Online' },
      { text: 'Отзывные' },
      { text: 'Безотзывные' },
    ],
  },
])

const leftMenuItems = ref([
  'Курсы валют',
  'Новости',
  'Акции для частных клиентов',
  'Акции для бизнеса',
  'Офисы и банкоматы',
  'Работа в банке',
  'О банке',
  'Вопрос-ответ',
])

const middleMenuItems = ref([
  {
    title: 'КАРТЫ',
    links: [
      'С манибэком',
      'Кредитные',
      'Виртуальные',
      'Премиальные',
      'Зарплатные',
      'Белкарт',
      'Visa',
      'Mastercard',
    ],
  },
  {
    title: 'КРЕДИТЫ',
    links: [
      'Наличными',
      'Онлайн-кредиты',
      'Потребительские',
      'На белорусские товары',
      'Партнёрские кредиты',
      'Зарплатным клиентам',
      'Кредитные карты',
    ],
  },
  {
    title: 'СЕРВИСЫ',
    links: ['Международные переводы', 'Переводы с карты на карту'],
  },
])

const rightMenuItems = ref([
  { title: 'СТРАХОВЫЕ ПРОГРАММЫ', links: [] },
  {
    title: 'ВКЛАДЫ',
    links: ['Вклады в BYN', 'Вклады в USD', 'Вклады в RUB', 'Online', 'Отзывные', 'Безотзывные'],
  },
  { title: 'ТАРИФЫ', links: [] },
  { title: 'ПАРТНЁРСКАЯ ПРОГРАММА', links: [] },
  { title: 'ТЕКУЩИЙ СЧЕТ', links: [] },
  {
    title: 'ЦЕННЫЕ БУМАГИ',
    links: ['Доверительное управление', 'Облигации ОАО «Паритетбанк»', 'Брокерское обслуживание'],
  },
  { title: 'БЕСКОНТАКТНАЯ ОПЛАТА', links: ['Apple Pay'] },
])

const expandedSections = ref<Record<string, boolean>>({})

const toggleSection = (title: string) => {
  expandedSections.value[title] = !expandedSections.value[title]
}

const openMenu = () => {
  isMenuOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
  expandedSections.value = {}
}

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

onMounted(() => document.addEventListener('keydown', handleEsc))
onUnmounted(() => {
  document.removeEventListener('keydown', handleEsc)
  document.body.style.overflow = ''
})
</script>

<template>
  <nav
    class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-2 border-b border-gray-200 flex items-center justify-between"
  >
    <ul class="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8 text-xs sm:text-sm font-light">
      <li v-for="item in ['Частным клиентам', 'Для бизнеса', 'Банкам', 'О Банке']" :key="item">
        <a href="#" class="transition duration-300 hover:text-[#0283CB]">{{ item }}</a>
      </li>
    </ul>

    <div class="flex items-center gap-3 sm:gap-4 ml-auto">
      <HugeiconsIcon
        :icon="AppleIcon"
        class="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hidden sm:block hover:text-[#0283CB] transition"
      />
      <HugeiconsIcon
        :icon="PlayStoreIcon"
        class="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hidden sm:block hover:text-[#0283CB] transition"
      />
      <HugeiconsIcon
        :icon="EyeIcon"
        class="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hidden sm:block hover:text-[#0283CB] transition"
      />
      <button
        class="px-3 sm:px-4 py-1 bg-gray-200 rounded-3xl text-xs sm:text-sm font-medium hover:bg-gray-300 transition"
      >
        ENG
      </button>
    </div>
  </nav>

  <header
    class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 py-3 sm:py-4 flex items-center justify-between"
  >
    <a href="" class="flex-shrink-0 mr-4 lg:mr-8">
      <img src="/logo.svg" alt="Paritetbank" class="h-7 sm:h-8 md:h-10 lg:h-12 w-auto" />
    </a>

    <ul class="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-center">
      <li v-for="item in headerMenu" :key="item.title" class="relative group">
        <a
          class="text-sm xl:text-base font-medium text-gray-800 hover:text-[#0283CB] transition py-4"
          href=""
        >
          {{ item.title }}
        </a>
        <div
          class="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
        >
          <ul
            class="w-[320px] xl:w-[400px] bg-white rounded-xl shadow-lg p-4 xl:p-6 border border-gray-100"
          >
            <div class="grid grid-cols-2 gap-x-4 xl:gap-x-8 gap-y-2">
              <li
                v-for="link in item.links"
                :key="link.text"
                class="p-2 hover:bg-blue-50 rounded-lg cursor-pointer transition"
              >
                <span class="text-gray-700 text-xs xl:text-sm">{{ link.text }}</span>
              </li>
            </div>
          </ul>
        </div>
      </li>
    </ul>

    <div class="flex items-center gap-2 sm:gap-4">
      <button
        @click="openMenu"
        aria-label="Открыть меню"
        class="p-2 hover:bg-gray-100 rounded-lg transition lg:hidden"
      >
        <img src="/icons/burger-menu.svg" alt="" class="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <div class="hidden lg:flex items-center gap-2 xl:gap-4">
        <button
          class="px-4 xl:px-6 py-2 xl:py-2.5 bg-[#1e4d8b] text-white rounded-full text-xs xl:text-sm font-medium hover:bg-[#153a6b] transition whitespace-nowrap"
        >
          Онлайн-сервисы
        </button>
        <button
          class="px-4 xl:px-6 py-2 xl:py-2.5 bg-[#1e4d8b] text-white rounded-full text-xs xl:text-sm font-medium hover:bg-[#153a6b] transition whitespace-nowrap"
        >
          Интернет-банк
        </button>
      </div>
    </div>
  </header>

  <Transition name="menu">
    <div
      v-if="isMenuOpen"
      role="dialog"
      aria-modal="true"
      class="fixed inset-0 bg-gradient-to-br from-[#1e4d8b] via-[#2a5298] to-[#7e8ba3] z-[100] flex flex-col h-[100dvh]"
    >
      <div class="flex items-center justify-between p-4 sm:p-6 w-full">
        <button
          @click="closeMenu"
          aria-label="Закрыть меню"
          class="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
        >
          <HugeiconsIcon :icon="CancelSquareIcon" class="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
        </button>
        <button
          aria-label="Поиск"
          class="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition"
        >
          <svg
            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto px-4 sm:px-8 pb-10">
        <div
          class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 text-white"
        >
          <nav class="order-3 md:order-1 lg:pr-4">
            <ul class="space-y-3 sm:space-y-4">
              <li v-for="item in leftMenuItems" :key="item">
                <a
                  href="#"
                  class="block text-base sm:text-lg hover:text-blue-200 transition py-1"
                  >{{ item }}</a
                >
              </li>
            </ul>
            <div class="mt-8 pt-6 border-t border-white/20">
              <a
                href="tel:171"
                class="flex items-center gap-2 text-xl sm:text-2xl font-semibold hover:text-blue-200 transition"
              >
                <svg
                  class="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                171
              </a>
            </div>
            <div class="mt-6 flex gap-3 sm:gap-4">
              <a
                v-for="social in ['f', 'VK', '📷', '♪', '✈']"
                :key="social"
                href="#"
                class="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-100 transition"
              >
                <span class="text-blue-800 text-sm font-bold">{{ social }}</span>
              </a>
            </div>
          </nav>

          <nav class="order-1 md:order-2">
            <div v-for="section in middleMenuItems" :key="section.title" class="mb-4 sm:mb-6">
              <button
                @click="toggleSection(section.title)"
                class="w-full flex items-center justify-between text-left lg:pointer-events-none"
              >
                <h3 class="text-lg sm:text-xl font-semibold mb-1 sm:mb-3">{{ section.title }}</h3>
                <span
                  class="lg:hidden text-xl transition-transform duration-300"
                  :class="expandedSections[section.title] ? 'rotate-180' : ''"
                  >▼</span
                >
              </button>
              <ul
                class="space-y-2 overflow-hidden transition-all duration-300 ease-in-out"
                :class="[
                  expandedSections[section.title] || window?.innerWidth >= 1024
                    ? 'max-h-[500px] opacity-100 mt-2'
                    : 'max-h-0 opacity-0 lg:max-h-[500px] lg:opacity-100',
                ]"
              >
                <li v-for="link in section.links" :key="link">
                  <a
                    href="#"
                    class="text-white/80 hover:text-white transition block py-1 text-sm sm:text-base"
                    >{{ link }}</a
                  >
                </li>
              </ul>
            </div>
          </nav>

          <nav class="order-2 md:order-3">
            <div v-for="section in rightMenuItems" :key="section.title" class="mb-4 sm:mb-6">
              <button
                @click="toggleSection(section.title)"
                class="w-full flex items-center justify-between text-left lg:pointer-events-none"
              >
                <h3 class="text-lg sm:text-xl font-semibold mb-1 sm:mb-3">{{ section.title }}</h3>
                <span
                  v-if="section.links.length"
                  class="lg:hidden text-xl transition-transform duration-300"
                  :class="expandedSections[section.title] ? 'rotate-180' : ''"
                  >▼</span
                >
              </button>
              <ul
                v-if="section.links.length"
                class="space-y-2 overflow-hidden transition-all duration-300 ease-in-out"
                :class="[
                  expandedSections[section.title] || window?.innerWidth >= 1024
                    ? 'max-h-[500px] opacity-100 mt-2'
                    : 'max-h-0 opacity-0 lg:max-h-[500px] lg:opacity-100',
                ]"
              >
                <li v-for="link in section.links" :key="link">
                  <a
                    href="#"
                    class="text-white/80 hover:text-white transition block py-1 text-sm sm:text-base"
                    >{{ link }}</a
                  >
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="lg:hidden mt-8 pt-6 border-t border-white/20 space-y-3 sm:space-y-4">
          <button
            class="w-full py-3 sm:py-4 bg-white text-[#1e4d8b] rounded-full text-sm sm:text-base font-medium active:scale-95 transition"
          >
            Онлайн-сервисы
          </button>
          <button
            class="w-full py-3 sm:py-4 bg-white text-[#1e4d8b] rounded-full text-sm sm:text-base font-medium active:scale-95 transition"
          >
            Интернет-банк
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
