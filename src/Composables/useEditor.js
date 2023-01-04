import { getHighlighter } from 'shiki';
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';

const shiki = ref(null)
const isLoading = ref(false)
const test = ref(1)

export function useEditor(themes = ['test'], langs = []) {
    loadShiki(themes, langs)

    return {
        shiki,
        test
    }
}


async function loadShiki(themes = [], langs = []) {
    if (shiki.value) {
        return
    }

    isLoading.value = true

    shiki.value = await getHighlighter({
        themes,
        langs,
    })

    isLoading.value = true
}
