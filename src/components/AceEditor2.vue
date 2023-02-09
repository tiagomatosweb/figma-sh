<template>
    <div class="h-full bg-gray-900">
        <v-ace-editor
            v-model:value="code"
            lang="javascript"
            theme="monokai"
            :min-lines="20"
            :max-lines="20"
            @init="editorInit"
        />
    </div>
</template>

<script setup>
import './ace';
import { VAceEditor } from 'vue3-ace-editor';
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


function editorInit(ace) {
    // console.log(ace);
}

defineExpose({
    code
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
