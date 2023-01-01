<template>
  <div class="p-4">
      <div class="grid grid-cols-4 gap-2 mb-4">
          <div class="w-screen h-screen fixed top-0 left-0 z-40 bg-white flex items-center justify-center"
              v-if="loadScreen">
              <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-black rounded-full"
                  role="status" aria-label="loading">
                  <span class="sr-only">Loading...</span>
              </div>
          </div>
          <select name=""
              class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option v-for="(theme, index) in config.themes" :key="index" @click="setConfig('theme', theme)">{{ theme }}</option>
          </select>

          <select class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option v-for="(lang, index) in config.langs" :key="index" @click="setConfig('lang', lang.lang)">{{ lang.title }}</option>
          </select>

          <div class="flex flex-row gap-2">
              <button
                  class="p-2 bg-blue-500 text-white font-mono font-bold h-max w-max transition-all rounded hover:ring focus:bg-blue-600">
                  Run
              </button>

              <button
                  class="p-2 bg-white border border-black text-black font-mono font-bold h-max w-max transition-all rounded ring-gray-300 hover:ring focus:bg-black focus:text-white">
                  Copy
              </button>

          </div>

      </div>

      <div class="rounded-lg py-4 pb-8 h-[500px] overflow-scroll" :style="`background-color: ${backgroundColor}`">
          <CodeEditor @set-load="loadScreen = false" @set-background="setBackground" :config="currentConfig"/>
      </div>

      <CreateRectangle />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CodeEditor from './components/CodeEditor.vue';
import CreateRectangle from './components/CreateRectangle.vue';
const config = ref({
  themes: [
      'Dracula',
      'Nord',
      'One-dark-pro',
      'Material-darker',
      'Dark-plus',
      'Min-dark',
      'Github-dark'
  ],
  langs: [
      {
          title: 'Javascript',
          lang: 'js'
      },
      {
          title: 'PHP',
          lang: 'php'
      },
      {
          title: 'Python',
          lang: 'python'
      },
      {
          title: 'CSS',
          lang: 'css'
      },
      {
          title: 'HTML',
          lang: 'html'
      },
      {
          title: 'JSX',
          lang: 'jsx'
      },
      {
          title: 'Vue',
          lang: 'vue'
      },
      {
          title: 'Typescript',
          lang: 'typescript'
      },
  ]
})
const currentConfig = ref({
  lang: 'js',
  theme: 'nord'
})
function setConfig(key, value){
  currentConfig.value[key] = value
  console.log(currentConfig.value.lang)
  console.log(currentConfig.value.theme)
}
const loadScreen = ref(true)
const backgroundColor = ref('')
function setBackground(payload) {
  backgroundColor.value = payload
}
</script>
<style>
</style>