<script setup lang="ts"></script>

<template>
  <section class="py-8 md:py-12">
    <div class="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 xl:px-20">
      <div
        class="relative bg-gradient-to-r from-[#eef4ff] to-white rounded-[24px] md:rounded-[32px] flex flex-col md:flex-row items-center justify-between shadow-sm min-h-[380px] md:min-h-[440px]"
      >
        <div
          class="w-full md:w-5/12 lg:w-2/5 relative h-[320px] md:h-[440px] order-2 md:order-1 flex justify-center items-center"
        >
          <img
            src="/iparitet.png"
            alt="Приложение iParitet"
            class="absolute top-1/2 -translate-y-1/2 md:left-10 h-[100%] md:h-[110%] w-auto object-contain z-10 drop-shadow-xl"
          />
        </div>

        <div
          class="w-full md:w-7/12 lg:w-3/5 p-8 md:p-12 lg:pr-20 lg:py-16 flex flex-col items-center md:items-start text-center md:text-left order-1 md:order-2 z-20"
        >
          <h2
            class="text-[28px] md:text-4xl lg:text-[44px] font-normal text-gray-900 mb-4 md:mb-6 leading-[1.15]"
          >
            iParitet: Одно приложение — <br class="hidden lg:block" />
            много возможностей
          </h2>

          <p
            class="text-gray-500 text-sm md:text-base lg:text-lg mb-8 md:mb-10 max-w-xl leading-relaxed"
          >
            Мгновенный выпуск виртуальных карт, быстрые переводы, выгодные курсы обмена валют и
            другое в вашем смартфоне
          </p>

          <div class="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full sm:w-auto">
            <button
              class="w-full sm:w-auto bg-[#005BFF] hover:bg-blue-700 active:scale-95 text-white px-8 py-3.5 md:py-4 rounded-xl font-medium transition-all duration-300 shadow-sm text-sm md:text-base whitespace-nowrap"
            >
              Скачать приложение
            </button>

            <div class="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
              <a
                href="#"
                class="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                <span class="text-sm font-medium">Google Play</span>
              </a>
              <a
                href="#"
                class="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                <span class="text-sm font-medium">App Store</span>
              </a>
              <a
                href="#"
                class="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                <span class="text-sm font-medium">AppGallery</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
