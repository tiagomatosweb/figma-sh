<template>
    <div class="h-full bg-gray-900">
        <div id="editor" />
    </div>
</template>

<script setup>
import './ace';
// import ace from 'ace-builds';
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
const aceEditor = ref(null);

onMounted(async () => {
    aceEditor.value = await ace.edit('editor', {
        value: code.value,
        maxLines: 20,
        minLines: 20,
        fontSize: 14,
        theme: 'ace/theme/monokai',
        // mode: 'ace/mode/powershell',
        mode: 'ace/mode/javascript',
        showFoldWidgets: false,
        // tabSize: 2,
        useSoftTabs: true,
    })

    console.log(window.getComputedStyle(aceEditor.value.container).backgroundColor);
})

defineExpose({
    aceEditor
})
</script>

<style>
    /*.ace-monokai .ace_paren {*/
    /*    color: #89ddff;*/
    /*}*/
    /*.ace-monokai .ace_identifier + .ace_paren {*/
    /*    !*color: #82aaff;*!*/
    /*    color: red*/
    /*}*/
</style>
