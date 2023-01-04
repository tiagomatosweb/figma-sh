<template>
    <PrismEditor
        id="prismEditor"
        v-if="!loading"
        v-model="codeText"
        :highlight="buildHtml"
        line-numbers
        class="editor flex-1"
        :style="{ backgroundColor }"
    />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { getHighlighter } from 'shiki';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

const codeText = ref("const nodes = Array.from(el.childNodes);");

const props = defineProps({
    theme: String,
    lang: String
});

const localTheme = ref(props.theme)
const localLang = ref(props.lang)

const shiki = ref(null)
const loading = ref(true)
onMounted(async () => {
    shiki.value = await getHighlighter({
        theme: localTheme.value,
        langs: [localLang.value],
    })

    settBackgroundColor()

    loading.value = false
});

function buildHtml() {
    const html = shiki.value.codeToHtml(`${codeText.value}`, {
        theme: localTheme.value,
        lang: localLang.value,
    });

    settBackgroundColor()
    return  html
}

const backgroundColor = ref()
function settBackgroundColor() {
    backgroundColor.value = shiki.value.getBackgroundColor(localTheme.value)
}

watch(() => props.theme, async (vl) => {
    await shiki.value.loadTheme(vl)
    localTheme.value = vl
    buildHtml()
});

watch(() => props.lang, async (vl) => {
    await shiki.value.loadLanguage(vl)
    localLang.value = vl
    buildHtml()
});

defineExpose({
    code: codeText
})
</script>

<style scoped>
.editor {
    color: #fff;
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.715;
}
:deep(.prism-editor__line-numbers) {
    @apply text-white opacity-50;
}
:deep(.prism-editor__textarea) {
    z-index: 9999 !important;
}
</style>
