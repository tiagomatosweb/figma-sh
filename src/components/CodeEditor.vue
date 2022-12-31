<template>
    <div class="flex flex-row gap-2 px-2 min-h-full">
        <div class="flex flex-col items-end px-2" id="countDisplay">
            <span class="text-gray-500 font-mono flex items-center justify-center" id="count" v-for="line in codeLines"
                v-bind:key="line">{{ line }}</span>
        </div>
        <div class="relative w-full min-h-full">
            <textarea id="teste"
                class="absolute z-20 focus:outline-0 focus:ring-0 w-full min-h-full caret-white pt-[5px] bg-transparent text-transparent overflow-hidden"
                placeholder="Seu código aqui..." spellcheck="false" v-model="textCodeValue" name="code"></textarea>

            <div class="break-all text-white" v-html="htmlCode"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits } from "vue";
import { getHighlighter } from 'shiki'
const textCodeValue = ref('')
const codeLines = ref(1)
const htmlCode = ref('')
const setTheme = ref({})
const emit = defineEmits(['set-load', 'set-background'])
function loadTheme() {
    getHighlighter({
        theme: 'dracula',
        langs: ['javascript', 'js']
    }).then(highlighter => {
        console.log('executou')
        setTheme.value = highlighter
        emit('set-load')
        emit('set-background', highlighter.getBackgroundColor('dracula'))
    })
}

onMounted(async () => {
    loadTheme()
})

watch(textCodeValue, async () => {
    codeLines.value = textCodeValue.value.split('\n').length;
    htmlCode.value = await setTheme.value.codeToHtml(`${textCodeValue.value}`, { lang: 'js' })
})

</script>

<style>
#teste {
    margin: 0;
    padding: 0;
    outline: unset;
    border: none;
    resize: none !important;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1em;
    /* line-height: 27.3px; */
}

#count {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 1em;
}

#countDisplay {
   
}

textarea:focus {
    outline: none;
}
</style>

