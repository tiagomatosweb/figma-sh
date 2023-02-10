<template>
    <div class="flex w-screen h-screen">
        <div class="shrink-0 w-52 bg-white border-r border-gray-300 p-4">
            <div class="space-y-2">
                <div>
                    <label
                        for="theme"
                        class="block mb-1 text-xs font-medium"
                    >Theme</label>
                    <select
                        id="theme"
                        v-model="currentTheme"
                        class="block w-full rounded border-gray-300 py-2 pl-2.5 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs"
                    >
                        <option
                            v-for="theme in [...BUNDLED_THEMES, 'material-theme']"
                            :key="theme"
                            :value="theme"
                        >
                            {{ theme }}
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        for="language"
                        class="block mb-1 text-xs font-medium"
                    >Language</label>
                    <select
                        id="language"
                        v-model="currentLanguage"
                        class="block w-full rounded-md border-gray-300 py-2 pl-2.5 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs"
                    >
                        <option
                            v-for="lang in BUNDLED_LANGUAGES"
                            :key="lang.id"
                            :value="lang.id"
                        >
                            {{ lang.id }}
                        </option>
                    </select>
                </div>
            </div>

            <hr class="border-gray-200 my-4 -m-4">

            <button
                @click="submit"
                type="button"
                class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >Run
            </button>
        </div>

        <CodeEditor
            ref="codeEditor"
        />
    </div>
</template>


<script setup>
import { ref } from 'vue';
import CodeEditor from './components/CodeEditorMirror.vue';
import { walkTree } from './utils/walkTree';
import { calculateRGB } from './utils/calculateRGB';
import { countNodeLength } from './utils/countNodeLength'
import { BUNDLED_THEMES, BUNDLED_LANGUAGES } from 'shiki'
const currentTheme = ref('material-theme')
const currentLanguage = ref('php')
const codeEditor = ref(null)

function buildPayloadMessage() {
    const el = document.getElementById('shiki').querySelector('code')
    const nodes = Array.from(el.childNodes);

    // Build node range
    let output = []
    let pointer = 0
    nodes.forEach((node) => {
        let walker = walkTree(node)
        let res
        while (!(res = walker.next()).done) {
            let node = res.value
            if (node.data) {
                pointer = pointer + node.length
            } else {
                const nodeLength = countNodeLength(node)
                output.push({
                    length: nodeLength,
                    start: pointer,
                    end: pointer + nodeLength,
                    color: calculateRGB(window.getComputedStyle(node).color),
                })
            }
        }
    })

    console.table(output);
    return output
}
function submit() {
    const pluginMessage = {
        type: 'APPLY_THEME',
        code: codeEditor.value.code,
        code_highlighted: buildPayloadMessage()
    }
    parent.postMessage({ pluginMessage }, '*')
}

// function copyCode() {
//     const codeContent = document.getElementById('codeContent');
//     codeContent.select();
//     codeContent.setSelectionRange(0, 99999);
//     navigator.clipboard.writeText(codeContent.value);
// }
</script>

