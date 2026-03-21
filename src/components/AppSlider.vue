<script setup lang="ts">
import { ref } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'

interface Slide {
  image: string
  text: string
}

const props = defineProps<{ slides: Slide[] }>()
const currentIndex = ref<number>(0)

const nextSlide = () => {
  if (currentIndex.value < props.slides.length - 1) currentIndex.value++
}
const prevSlide = () => {
  if (currentIndex.value > 0) currentIndex.value--
}
const goToSlide = (index: number) => {
  if (index >= 0 && index < props.slides.length) currentIndex.value = index
}
</script>

<template>
  <div class="relative w-full h-[350px] sm:h-[450px] lg:h-[600px] overflow-hidden group">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :class="[
        slide.image,
        'absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ease-in-out',
        currentIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0',
      ]"
    >
      <div class="absolute inset-0 bg-black/30"></div>
      <div class="absolute inset-0 flex items-center justify-center px-12 sm:px-20 lg:px-32">
        <p
          class="text-white text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-center font-bold drop-shadow-xl leading-tight"
        >
          {{ slide.text }}
        </p>
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute left-2 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 z-20 sm:opacity-0 sm:group-hover:opacity-100"
    >
      <HugeiconsIcon :icon="ArrowLeft01Icon" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </button>
    <button
      @click="nextSlide"
      class="absolute right-2 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 z-20 sm:opacity-0 sm:group-hover:opacity-100"
    >
      <HugeiconsIcon :icon="ArrowRight01Icon" class="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </button>

    <div
      class="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:bottom-8 md:right-10 flex items-center gap-3 sm:gap-4 bg-black/20 md:bg-white/10 backdrop-blur-md rounded-full px-3 py-2 sm:px-4 sm:py-2 z-20"
    >
      <div class="flex gap-2">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          @click="goToSlide(index)"
          class="relative w-2 h-2 sm:w-3 sm:h-3 rounded-sm transition-all duration-300 cursor-pointer"
          :class="currentIndex === index ? 'bg-white scale-110' : 'bg-white/40 hover:bg-white/60'"
        ></button>
      </div>

      <div class="w-px h-3 sm:h-4 bg-white/30 hidden sm:block"></div>

      <div class="hidden sm:flex gap-1">
        <button
          @click="prevSlide"
          :disabled="currentIndex === 0"
          class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <HugeiconsIcon :icon="ArrowLeft01Icon" class="w-4 h-4 text-white" />
        </button>
        <button
          @click="nextSlide"
          :disabled="currentIndex === slides.length - 1"
          class="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/20 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <HugeiconsIcon :icon="ArrowRight01Icon" class="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>
