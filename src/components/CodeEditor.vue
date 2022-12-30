<template>
    <div class="flex flex-row gap-2 px-2">
        <div class="flex flex-col items-end p-1 border-r-2 border-gray-800">
            <span class="text-gray-700 font-mono" v-for="line in codeLines" v-bind:key="line">{{ line }}</span>
        </div>
        <div class="relative w-full h-max">
            <div class="break-all text-white" v-html="htmlCode">
            </div>
            <textarea class="absolute right-0 z-20 top-0 w-full min-h-[500px] mb-4 p-0 bg-transparent text-transparent"
                placeholder="Seu código aqui..." v-model="textCodeValue" name="code"></textarea>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { getHighlighter } from 'shiki'
const textCodeValue = ref('')
const codeLines = ref(1) // count number example
const htmlCode = ref('')
watch(textCodeValue, () => {
    codeLines.value = textCodeValue.value.split('\n').length;
    getHighlighter({
      theme: 'nord'
    }).then(highlighter => {
      const code = highlighter.codeToHtml(`${textCodeValue.value}`, { lang: 'js' })
      htmlCode.value = code
    })
    
})

</script>

<style>
textarea {
    outline: #00000000;
    border: none;
    resize: none !important;
    margin-bottom: -1rem;
}

textarea:focus {
    outline: none;
}
</style>

