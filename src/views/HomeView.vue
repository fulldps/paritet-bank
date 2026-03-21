<script setup lang="ts">
import { slides } from '../mocks/slides'
import AppHeader from '@/components/AppHeader.vue'
import AppSlider from '@/components/AppSlider.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppOffers from '@/components/AppOffers.vue'
import AppCurrencyConverter from '@/components/AppCurrencyConverter.vue'
</script>

<template>
  <AppHeader />

  <main>
    <div class="w-full">
      <AppSlider :slides="slides" />
      <AppOffers />
      <AppCurrencyConverter />
      <AppFooter />
    </div>

    <!-- Здесь может быть остальной контент страницы -->
    <RouterView />
  </main>
</template>
