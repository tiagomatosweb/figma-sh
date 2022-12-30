<template>
    <div class="p-4">
        <div class="grid grid-cols-4 gap-2 mb-4">
            <div class="w-screen h-screen fixed top-0 left-0 z-40 bg-white flex items-center justify-center"
                v-if="loadScreen">
                <span>Carregando...</span>
            </div>
            <select name=""
                class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="">Monakai</option>
                <option value="">Material</option>
            </select>

            <select name="" id=""
                class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="">Javascript</option>
                <option value="">PHP</option>
            </select>

            <div class="flex flex-row gap-2">
                <button
                    class="p-2 bg-blue-500 text-white font-mono font-bold h-max w-max transition-all rounded hover:ring focus:bg-blue-600">
                    Run
                </button>

                <button
                    class="p-2 bg-white border border-black text-black font-mono font-bold h-max w-max transition-all rounded ring-gray-300 hover:ring focus:bg-black focus:text-white">
                    Copy
                </button>

            </div>

        </div>

        <div class="rounded-lg py-4 pb-8 h-[500px] overflow-scroll" :style="`background-color: ${backgroundColor}`">
            <CodeEditor @set-load="loadScreen = false" @set-background="setBackground" />
        </div>

        <CreateRectangle />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import CodeEditor from './components/CodeEditor.vue';
import CreateRectangle from './components/CreateRectangle.vue'
const loadScreen = ref(true)
const backgroundColor = ref('')
function setBackground(payload){
    backgroundColor.value = payload
}
</script>
<style>
</style>