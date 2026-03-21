<script setup lang="ts">
interface Offer {
  id: number
  title: string
  description: string
  image: string
}

const offers: Offer[] = [
  {
    id: 1,
    title: '#КОМБОкарта',
    description:
      'Зарабатывайте манибэк деньгами, когда вы тратите. Дебетовые и виртуальные карты с манибэком до 17,8%',
    image: '/offers/offer1.png',
  },
  {
    id: 2,
    title: 'Кредит #будутденьги',
    description:
      'Кредит наличными на любые цели, без справки о доходах и поручителей до 20 000 BYN на срок до 60 месяцев',
    image: '/offers/offer2.png',
  },
  {
    id: 3,
    title: 'Онлайн-кредит iParitet',
    description: 'Кредит на текущий счет на любые цели, не выходя из дома',
    image: '/offers/offer3.png',
  },
  {
    id: 4,
    title: 'Премиальные карты',
    description: 'С эксклюзивными услугами и привилегиями от платежных систем Visa и Mastercard',
    image: '/offers/offer4.png',
  },
  {
    id: 5,
    title: 'Вклад Online в BYN',
    description: 'со ставкой до 14,50%',
    image: '/offers/offer5.png',
  },
]

const firstRowOffers = offers.slice(0, 2)
const secondRowOffers = offers.slice(2)
</script>

<template>
  <section class="py-10 md:py-16 bg-gray-50">
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
      <h2
        class="text-2xl sm:text-3xl md:text-4xl font-light mb-8 md:mb-12 text-gray-800 text-center"
      >
        Лучшие предложения банка
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div
          v-for="offer in firstRowOffers"
          :key="offer.id"
          class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
        >
          <div class="p-6 md:p-10 flex flex-col flex-1 items-center">
            <h3 class="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-center text-gray-800">
              {{ offer.title }}
            </h3>
            <p class="text-sm md:text-base text-gray-600 leading-relaxed text-center mb-6 md:mb-8">
              {{ offer.description }}
            </p>
            <button
              class="px-8 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl text-white text-sm md:text-base font-medium transition-all duration-300 w-full sm:w-auto mt-auto"
            >
              Подробнее
            </button>
          </div>
          <div class="px-6 pb-6 md:px-10 md:pb-10 flex justify-center w-full">
            <div
              class="relative w-full aspect-square max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]"
            >
              <img
                :src="offer.image"
                :alt="offer.title"
                class="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="offer in secondRowOffers"
          :key="offer.id"
          class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl md:rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
        >
          <div class="p-5 md:p-8 flex flex-col flex-1 items-center">
            <h3 class="text-xl md:text-2xl font-bold mb-3 text-center text-gray-800">
              {{ offer.title }}
            </h3>
            <p class="text-xs sm:text-sm text-gray-600 leading-relaxed text-center mb-5 md:mb-6">
              {{ offer.description }}
            </p>
            <button
              class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl text-white text-sm font-medium transition-all duration-300 w-full sm:w-auto mt-auto"
            >
              Подробнее
            </button>
          </div>
          <div class="px-5 pb-5 md:px-8 md:pb-8 flex justify-center w-full">
            <div class="relative w-full aspect-square max-w-[220px] sm:max-w-[260px]">
              <img
                :src="offer.image"
                :alt="offer.title"
                class="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
