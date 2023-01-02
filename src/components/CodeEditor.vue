<template>
  <textarea id="editor" v-model="textCodeValue"></textarea>
</template>

<script setup>
import { ref, watch, onMounted, defineEmits, defineProps } from "vue";
import * as codeMirror from "codemirror";

//import themes
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/material.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/night.css";
import "codemirror/theme/solarized.css";

//import languages
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/php/php.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/jsx/jsx.js';
import 'codemirror/mode/vue/vue.js';

const textCodeValue = ref("");
const currentConfig = ref({})
const props = defineProps({
  config: Object,
});
const emit = defineEmits(["set-load", "set-background"]);

function loadConfig() {
  emit("set-load");
  currentConfig.value = codeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    theme: props.config.theme.toLowerCase(),
    mode: props.config.lang.toLowerCase(),
  });
}
function updateConfig(){
  const node = document.getElementById('remover')
  const removed = document.querySelector('.CodeMirror')
  node.removeChild(removed)
  loadConfig()
}
onMounted(async () => {
  loadConfig();
});
watch(props.config, () => {
  updateConfig()
});
</script>
<style>
.CodeMirror {
  border-radius: 15px;
  padding-top: 2px;
  height: 100%;
  font-size: 15px;
}
</style>