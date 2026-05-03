<script setup lang="ts">
interface Card {
  image: string
  text: string
  title: string
}

defineProps<{ cards: Card[] }>()
</script>

<template>
  <div class="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-20">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-10 md:mt-12">
      <div
        v-for="(card, index) in cards"
        :key="index"
        class="flex flex-col items-center text-center p-4 bg-[#f2f2f2] rounded-xl min-h-[190px] justify-between"
      >
        <div class="text-sm md:text-base font-semibold leading-tight">{{ card.title }}</div>
        <div class="font-extralight text-xs md:text-sm text-gray-500 mt-1">{{ card.text }}</div>
        <img class="w-16 h-16 md:w-20 md:h-20 mt-3 object-contain" :src="card.image" alt="" />
      </div>
    </div>
  </div>
</template>
