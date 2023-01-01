<template>
    <div @click="checkModal = !checkModal"
        :class="['dropdown relative h-max transition-all border-2 border-gray-200 rounded-md flex flex-col gap-4 cursor-pointer', {'border-indigo-500': checkModal}]">
        <div class="text-black p-2 flex flex-row justify-between dropdown">
            <span class="dropdown">
                {{ title }}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-6 h-6 dropdown">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
        </div>
        <div v-show="checkModal"
            class="w-full dropdown transition-all h-max backdrop-blur-[6px] mt-4 flex flex-col gap-2 absolute z-30 top-[35px] bg-gray-500/25 rounded-lg p-2 text-white border-2 border-gray-400">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue";
const props = defineProps({
    title: String,
});
const checkModal = ref(false);
onMounted(() => {
    document.querySelector('body').addEventListener("click", (event)=>{
        if(Array.from(event.target.classList).includes('dropdown')){
            return 
        }
        checkModal.value = false
    })
})
</script>