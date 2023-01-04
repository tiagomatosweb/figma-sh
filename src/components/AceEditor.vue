<template>
    <div>
        <button @click="getValue">get value</button>
        <div id="editor" />
    </div>
</template>

<script setup>
import './ace';
import { onMounted, ref } from 'vue';

const code = ref("function submit() {\n" +
    "    const pluginMessage = {\n" +
    "        type: 'APPLY_THEME',\n" +
    "        code: aceEditor.value.aceEditor.getValue(),\n" +
    "        code_highlighted: buildPayloadMessage()\n" +
    "    }\n" +
    "\n" +
    "    parent.postMessage({ pluginMessage }, '*')\n" +
    "}");
const editorEl = ref();
const aceEditor = ref(null);

onMounted(async () => {
    // console.log(editorEl.value);
    aceEditor.value = await ace.edit('editor', {
        value: code.value,
        maxLines: 20,
        minLines: 10,
        fontSize: 14,
        theme: 'ace/theme/monokai',
        // mode: 'ace/mode/powershell',
        mode: 'ace/mode/javascript',
        // tabSize: 2,
        // useSoftTabs: true
    })
})

defineExpose({
    aceEditor
})
</script>
