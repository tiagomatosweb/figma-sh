<template>
  <div class="p-4">
    <div
      class="w-screen h-screen fixed top-0 left-0 z-40 bg-white flex items-center justify-center"
      v-if="loadScreen"
    >
      <div
        class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-black rounded-full"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="grid grid-cols-4 gap-2 mb-4 items-end">
      <div class="flex flex-col gap-2">
        <span>Selecione o tema:</span>
        <Dropdown :title="currentConfig.theme">
          <span
            v-for="(theme, index) in config.themes"
            :key="index"
            @click="setConfig('theme', theme)"
            class="cursor-pointer hover:bg-gray-900/75 px-2 py-1 rounded-md"
          >
            {{ theme }}
          </span>
        </Dropdown>
      </div>

      <div class="flex flex-col gap-2">
        <span>Selecione o tema:</span>
        <Dropdown :title="currentConfig.langTitle">
          <span
            v-for="(lang, index) in config.langs"
            :key="index"
            @click="
              setConfig('langTitle', lang.title);
              setConfig('lang', lang.lang);
            "
            class="cursor-pointer hover:bg-gray-900/75 px-2 py-1 rounded-md"
          >
            {{ lang.title }}
          </span>
        </Dropdown>
      </div>

      <div class="flex flex-row gap-2">
        <button
          class="p-2 bg-blue-500 text-white font-mono font-bold h-max w-max transition-all rounded hover:ring focus:bg-blue-600"
        >
          Run
        </button>

        <button
          @click="copyCode"
          class="p-2 bg-white border border-black text-black font-mono font-bold h-max w-max transition-all rounded ring-gray-300 hover:ring focus:bg-black focus:text-white"
        >
          Copy
        </button>
      </div>
    </div>

    <div
      class="rounded-lg py-2 pb-8 h-[500px] overflow-scroll px-2"
      :style="`background-color: ${backgroundColor}`"
    >
      <CodeEditor
        @set-load="loadScreen = false"
        @set-background="setBackground"
        :config="currentConfig"
      />
    </div>

    <CreateRectangle />
  </div>
</template>

<script setup>
import { ref } from "vue";
import CodeEditor from "./components/CodeEditor.vue";
import CreateRectangle from "./components/CreateRectangle.vue";
import Dropdown from "./components/Dropdown.vue";
const currentConfig = ref({
  lang: "javascript",
  langTitle: "Javascript",
  theme: "Dracula",
});
const loadScreen = ref(true);
const backgroundColor = ref("");
const config = ref({
  themes: [
    "Dracula",
    "Nord",
    "Base16-dark",
    "Material",
    "seti",
    "Night",
    "Solarized",
  ],
  langs: [
    {
      title: "Javascript",
      lang: "Javascript",
    },
    {
      title: "PHP",
      lang: "php",
    },
    {
      title: "Python",
      lang: "python",
    },
    {
      title: "CSS",
      lang: "css",
    },
    {
      title: "HTML",
      lang: "xml",
    },
    {
      title: "JSX",
      lang: "jsx",
    },
    {
      title: "Vue",
      lang: "vue",
    }
  ],
});
function copyCode() {
  const codeContent = document.getElementById("codeContent");
  codeContent.select();
  codeContent.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(codeContent.value);
}
function setConfig(key, value) {
  currentConfig.value[key] = value;
}
function setBackground(payload) {
  backgroundColor.value = payload;
}
</script>
