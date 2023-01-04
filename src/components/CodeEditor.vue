<template>
    <div
        class="code-font text-sm leading-[1.4rem] flex-1 flex flex-row gap-3 overflow-scroll py-4"
        :style="{ backgroundColor }"
    >
        <div class="flex flex-col items-end text-gray-600 min-w-[35px]">
            <div
                v-for="line in codeLineNumbers"
                :key="line"
            >{{ line }}
            </div>
        </div>

        <div class="relative w-max">
            <textarea
                class="absolute text-sm leading-[1.4rem] min-w-max w-full h-full text-transparent bg-transparent outline-none resize-none caret-white p-0 m-o border-none focus:ring-0"
                placeholder="Seu código aqui..."
                spellcheck="false"
                v-model="codeText"
                @keydown.tab.prevent.stop="tabber($event)"
                @keyup.tab="textAreaElement.setSelectionRange(currentSelection, currentSelection)"
                ref="textAreaElement"
                name="code"
            />

            <div
                class="w-max"
                v-html="codeHtml"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { getHighlighter } from 'shiki';

const codeText = ref('');
const codeHtml = ref('');
const codeLineNumbers = ref(1);
const textAreaElement = ref(null);
const currentSelection = ref(0)

const props = defineProps({
    theme: String,
    lang: String
});

async function tabber({ target: { selectionEnd, selectionStart, value } }) {
    const start = selectionStart;
    const end = selectionEnd;
    codeText.value = `${value.substring(0, start)}  ${value.substring(end)}`;
    currentSelection.value = end + 2
}

const shiki = ref(null)
onMounted(async () => {
    shiki.value = await getHighlighter({
        theme: props.theme,
        langs: [props.lang],
    })

    buildHtml()
    calculateLineNumbers()
});

function buildHtml() {
    codeHtml.value = shiki.value.codeToHtml(`${codeText.value}`, {
        lang: props.lang,
        theme: props.theme,
    });

    settBackgroundColor()
}

function calculateLineNumbers() {
    codeLineNumbers.value = codeText.value.split('\n').length;
}

const backgroundColor = ref()
function settBackgroundColor() {
    backgroundColor.value = shiki.value.getBackgroundColor(props.theme)
}

watch(codeText, (vl) => {
    calculateLineNumbers()
    buildHtml()
});

watch(() => props.lang, async (vl) => {
    await shiki.value.loadLanguage(vl)
    buildHtml()
});

watch(() => props.theme, async (vl) => {
    await shiki.value.loadTheme(vl)
    buildHtml()
});
</script>

<style>
.code-font {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
}
</style>
