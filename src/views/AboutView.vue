<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppChatBot from '@/components/AppChatBot.vue'

const activeSection = ref<number | null>(null)

const toggle = (i: number) => {
  activeSection.value = activeSection.value === i ? null : i
}

const sections = [
  {
    title: '1. Юридический статус',
    content: `Открытое акционерное общество.

Полное и сокращённое наименование:
• Открытое акционерное общество «Паритетбанк» (ОАО «Паритетбанк»)
• Адкрытае акцыянернае таварыства «Парытэтбанк» (ААТ «Парытэтбанк»)
• Open joint-stock company «Paritetbank» (OJSC «Paritetbank»)`,
  },
  {
    title: '2. Дата регистрации',
    content: `15 мая 1991 года Национальным банком Республики Беларусь зарегистрирован коммерческий банк «Поиск». 5 мая 2004 года банк «Поиск» был переименован в ОАО «Паритетбанк».`,
  },
  {
    title: '3. Реквизиты Банка',
    content: `Юридический адрес: 220002, г. Минск, ул. Киселева, 61а
ENG: 61A, Kiselev St., Minsk, 220002, Republic of Belarus

Телефон: 171
S.W.I.F.T.: POISBY2X
Электронная почта: info@paritetbank.by
УНП: 100233809
Корреспондентский счёт в НБРБ: BY39NBRB32000078200190000000`,
  },
  {
    title: '4. Регистрационный номер',
    content: `В Едином государственном регистре юридических лиц и индивидуальных предпринимателей — 100233809`,
  },
  {
    title: '5. Вид деятельности',
    content: `Банковская деятельность`,
  },
  {
    title: '6. Состав банковского холдинга',
    content: `ОАО «Паритетбанк» не является головной организацией банковской группы и (или) банковского холдинга, а также не является участником банковской группы и (или) банковского холдинга.`,
  },
  {
    title: '7. Нормативный капитал',
    content: `159 000,4 тыс. рублей (по состоянию на 01.04.2026 года).`,
  },
  {
    title: '8. Членство в Банковской Ассоциации',
    content: `ОАО «Паритетбанк» является членом Банковской Ассоциации Стран Центральной и Восточной Европы (Banking Association for Central and Eastern Europe / BACEE) на условиях регулярного членства.`,
  },
]

const offices = [
  {
    region: 'Минск',
    list: [
      'ДО №1 ЦБУ №17 — 220090, ул. Гамарника, 9/4',
      'ЦБУ №5 — 220006, ул. Бобруйская, 15',
      'ЦБУ №17 — 220002, ул. Киселева, 61а',
      'ЦБУ «Минск-Мир» — 220065, пр-т Мира, 4',
      'ЦБУ «Каменная Горка» — 220136, ул. Притыцкого, 97',
    ],
  },
  {
    region: 'Витебская область',
    list: [
      'ЦБУ №1 — 210015, г. Витебск, проезд Гоголя, 11-1',
      'ДО №1 ЦБУ №1 — 210015, пр-т Московский, 12-63',
      'ЦБУ №18 — 211500, г. Новополоцк, ул. Молодёжная, 166а',
      'ЦБУ №20 — 211391, г. Орша, ул. Ленина, 20А-9',
    ],
  },
  {
    region: 'Гродненская область',
    list: [
      'ЦБУ №6 — 230025, г. Гродно, ул. Антонова, 9-1',
      'ЦБУ №19 — 231291, г. Лида, ул. Кирова, 4',
    ],
  },
  {
    region: 'Брестская область',
    list: [
      'ЦБУ №15 — 224005, г. Брест, ул. Советская, 12',
      'ДО №1 ЦБУ №15 — 224010, г. Брест, пр-т Машерова, 70',
      'ЦБУ №16 — 225409, г. Барановичи, ул. Советская, 82/1',
      'ЦБУ №7 — 225716, г. Пинск, ул. Ленина, 1-4',
      'ЦБУ №11 — 225501, г. Столин, пл. Комсомольская, 9',
    ],
  },
  {
    region: 'Могилёвская область',
    list: [
      'ЦБУ №8 — 212030, г. Могилёв, ул. Первомайская, 69',
      'ЦБУ №12 — 213827, г. Бобруйск, ул. Островского, 48',
    ],
  },
  {
    region: 'Гомельская область',
    list: [
      'ЦБУ №14 — 246017, г. Гомель, п-т Победы, 20-1',
      'ДО №1 ЦБУ №14 — 246050, г. Гомель, пр-т Ленина, 29а-2',
      'ЦБУ №10 — 247783, г. Мозырь, б-р Юности, 39Б',
    ],
  },
]

const sideMenu = [
  'Корпоративное управление',
  'Финансовая отчётность',
  'Личный приём',
  'Наши награды',
  'Кодекс корпоративной этики',
  'Комиссия по противодействию коррупции',
  'Реализация имущества',
  'Закупки',
  'Часто задаваемые вопросы',
  'Обратная связь',
  'Работа в банке',
  'Безопасность',
  'Тарифы',
  'Раскрытие информации',
  'Работа с обращениями',
]
</script>

<template>
  <AppHeader />

  <main class="bg-gray-50 min-h-screen">
    <!-- Breadcrumb -->
    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 py-4">
      <nav class="text-sm text-gray-500 flex items-center gap-2">
        <a href="/" class="hover:text-[#1e4d8b] transition">Главная</a>
        <span>›</span>
        <span class="text-gray-800">О Банке</span>
      </nav>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 pb-16 flex gap-8">
      <!-- Sidebar -->
      <aside class="hidden lg:block w-64 shrink-0">
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6"
        >
          <div class="bg-[#1e4d8b] px-6 py-4">
            <h2 class="text-white font-semibold">О Банке</h2>
          </div>
          <nav class="py-2">
            <a
              v-for="item in sideMenu"
              :key="item"
              href="#"
              class="block px-6 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-[#1e4d8b] transition border-l-2 border-transparent hover:border-[#1e4d8b]"
            >
              {{ item }}
            </a>
          </nav>
        </div>
      </aside>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">О Банке</h1>

        <!-- Accordion sections -->
        <div class="space-y-3 mb-12">
          <div
            v-for="(section, i) in sections"
            :key="i"
            class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
          >
            <button
              @click="toggle(i)"
              class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
            >
              <span class="font-semibold text-gray-800">{{ section.title }}</span>
              <span
                class="text-[#1e4d8b] text-xl transition-transform duration-300 shrink-0 ml-4"
                :class="activeSection === i ? 'rotate-45' : ''"
                >+</span
              >
            </button>
            <div
              class="overflow-hidden transition-all duration-300"
              :class="activeSection === i ? 'max-h-[600px]' : 'max-h-0'"
            >
              <div
                class="px-6 pb-6 text-gray-600 text-sm leading-relaxed whitespace-pre-line border-t border-gray-100 pt-4"
              >
                {{ section.content }}
              </div>
            </div>
          </div>
        </div>

        <!-- Offices section -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h2 class="text-xl font-bold text-gray-900 mb-6">
            9. Центры банковских услуг ОАО «Паритетбанк»
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div v-for="region in offices" :key="region.region">
              <h3 class="font-semibold text-[#1e4d8b] mb-3 pb-2 border-b border-blue-100">
                {{ region.region }}
              </h3>
              <ul class="space-y-2">
                <li
                  v-for="office in region.list"
                  :key="office"
                  class="text-sm text-gray-600 flex items-start gap-2"
                >
                  <span class="text-[#1e4d8b] mt-0.5 shrink-0">•</span>
                  {{ office }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <AppFooter />
  <AppChatBot />
</template>
