<script setup lang="ts">
import { slides } from '../mocks/slides'
import { cards } from '../mocks/cards'
import AppHeader from '@/components/AppHeader.vue'
import AppSlider from '@/components/AppSlider.vue'
import AppFooter from '@/components/AppFooter.vue'
import AppOffers from '@/components/AppOffers.vue'
import AppCurrencyConverter from '@/components/AppCurrencyConverter.vue'
import ServiceCards from '@/components/ServiceCards.vue'
import IParitetBanner from '@/components/IParitetBanner.vue'
import AppChatBot from '@/components/AppChatBot.vue'
</script>

<template>
  <AppHeader />

  <main>
    <AppSlider :slides="slides" />
    <ServiceCards :cards="cards" />
    <AppOffers />
    <AppCurrencyConverter />
    <IParitetBanner />
  </main>

  <AppFooter />

  <!-- Чат-бот поверх всего -->
  <AppChatBot />
</template>
