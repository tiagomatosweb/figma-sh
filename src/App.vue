<template>
    <div class="p-4">
        <div class="grid grid-cols-4 gap-2 mb-4">
            <select
                name=""
                id=""
                class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
                <option value="">Monakai</option>
                <option value="">Material</option>
            </select>

            <select
                name=""
                id=""
                class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
                <option value="">Javascript</option>
                <option value="">PHP</option>
            </select>

        </div>

        <div class="bg-gray-900 rounded-lg py-4 h-[500px]">
            <CodeEditor />
        </div>

        <CreateRectangle />
    </div>
</template>

<script setup>
import CodeEditor from './components/CodeEditor.vue';
import CreateRectangle from './components/CreateRectangle.vue'
</script>
