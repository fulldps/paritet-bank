<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const isOpen = ref(false)
const isLoading = ref(false)
const inputText = ref('')
const messages = ref<Message[]>([])
const sessionId = ref<string | null>(null)
const messagesEl = ref<HTMLElement | null>(null)

// Восстанавливаем sessionId из localStorage
onMounted(() => {
  sessionId.value = localStorage.getItem('paritet_chat_session')
  messages.value = [
    {
      role: 'assistant',
      content: 'Здравствуйте! Я виртуальный ассистент банка Paritet. Чем могу помочь? 😊',
    },
  ]
})

const scrollToBottom = async () => {
  await nextTick()
  if (messagesEl.value) {
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  }
}

const sendMessage = async () => {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  isLoading.value = true
  scrollToBottom()

  try {
    const res = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId: sessionId.value }),
    })

    if (!res.ok) throw new Error('Server error')
    const data = await res.json()

    if (!sessionId.value && data.sessionId) {
      sessionId.value = data.sessionId
      localStorage.setItem('paritet_chat_session', data.sessionId)
    }

    messages.value.push({ role: 'assistant', content: data.reply })
  } catch {
    messages.value.push({
      role: 'assistant',
      content: 'Извините, произошла ошибка. Попробуйте позже или позвоните нам.',
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
  }
}

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <!-- Кнопка открытия -->
  <button
    @click="isOpen = !isOpen"
    class="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0A2240] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110"
    aria-label="Открыть чат"
  >
    <span v-if="!isOpen" class="text-2xl">💬</span>
    <span v-else class="text-xl font-bold">✕</span>
  </button>

  <!-- Окно чата -->
  <Transition name="chat">
    <div
      v-if="isOpen"
      class="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
      style="max-height: 520px"
    >
      <!-- Шапка -->
      <div class="bg-[#0A2240] px-4 py-3 flex items-center gap-3">
        <div class="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-lg">
          🏦
        </div>
        <div>
          <p class="text-white font-semibold text-sm">Ассистент Paritet</p>
          <p class="text-white/60 text-xs">Онлайн • отвечает мгновенно</p>
        </div>
      </div>

      <!-- Сообщения -->
      <div
        ref="messagesEl"
        class="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50"
        style="min-height: 300px; max-height: 360px"
      >
        <div
          v-for="(msg, i) in messages"
          :key="i"
          :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']"
        >
          <div
            :class="[
              'max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed',
              msg.role === 'user'
                ? 'bg-[#0A2240] text-white rounded-br-sm'
                : 'bg-white text-gray-800 shadow-sm rounded-bl-sm border border-gray-100',
            ]"
          >
            {{ msg.content }}
          </div>
        </div>

        <!-- Индикатор загрузки -->
        <div v-if="isLoading" class="flex justify-start">
          <div
            class="bg-white shadow-sm border border-gray-100 px-4 py-2 rounded-2xl rounded-bl-sm"
          >
            <span class="flex gap-1">
              <span
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 0ms"
              ></span>
              <span
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 150ms"
              ></span>
              <span
                class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style="animation-delay: 300ms"
              ></span>
            </span>
          </div>
        </div>
      </div>

      <!-- Ввод -->
      <div class="p-3 bg-white border-t border-gray-100 flex gap-2">
        <textarea
          v-model="inputText"
          @keydown="onKeydown"
          placeholder="Напишите сообщение..."
          rows="1"
          class="flex-1 resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0A2240] transition-colors"
          :disabled="isLoading"
        />
        <button
          @click="sendMessage"
          :disabled="isLoading || !inputText.trim()"
          class="w-10 h-10 rounded-xl bg-[#0A2240] text-white flex items-center justify-center disabled:opacity-40 hover:bg-[#1a3a60] transition-colors flex-shrink-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-4 h-4"
          >
            <path
              d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.chat-enter-active,
.chat-leave-active {
  transition: all 0.25s ease;
}
.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.97);
}
</style>
