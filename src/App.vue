<template>
    <div class="p-4">
        <div class="grid grid-cols-4 gap-2 mb-4">
            <select name="" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="">Monakai</option>
                <option value="">Material</option>
            </select>

            <select name="" id="" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option value="">Javascript</option>
                <option value="">PHP</option>
            </select>
            
            <button class="p-2 bg-blue-500 text-white font-mono font-bold h-max w-max transition-all rounded hover:ring focus:bg-blue-600">
                Run
            </button>

        </div>

        <div id="editor" class="rounded-lg py-4 pb-8 min-h-[500px]">
            <CodeEditor />
        </div>

        <CreateRectangle />
    </div>
</template>

<script setup>
import { ref} from 'vue'
import CodeEditor from './components/CodeEditor.vue';
import CreateRectangle from './components/CreateRectangle.vue'

const currentHtmlCode= ref("")
const textCodeValue = ref('')

</script>
<style>
#editor {
    background-color: #2e3440;
}
</style>