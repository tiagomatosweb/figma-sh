<template>
    <button @click="getValue">get value</button>
    <div ref="editorEl" style="width: 100%" />
</template>

<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import * as monaco from 'monaco-editor'
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker()
        }

        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }

        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }

        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }

        return new editorWorker()
    }
}

const editorEl = ref()

let editor = null

watchEffect(() => {
    if (editorEl.value) {
        editor = monaco.editor.create(editorEl.value, {
            value: "function hello() {\n\talert('Hello world!');\n}",
            language: 'javascript',
            theme: 'vs-dark'
        });
    }
})

function getValue() {
    return editor.getValue()
}
defineExpose({
    getValue
})


</script>
