<template>
    <PrismEditor
        id="prismEditor"
        v-model="code"
        :highlight="highlighter"
        line-numbers
        class="editor h-full"
    />
</template>

<script setup>
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import "../assets/themes/prism-material-oceanic.css";
import { ref } from 'vue';
import { usePrism } from '../composables/usePrism';

const code = ref("console.log('hello world!')");
const { highlighter } = usePrism()

defineExpose({
    code
})
</script>

<style scoped>
.editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #fff;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.715;
    padding: 5px;
}
</style>
