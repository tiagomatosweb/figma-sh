<template>
    <div class="flex w-screen h-screen">
        <div class="w-52 bg-white p-2">
            <div class="space-y-2">
                <div>
                    <label for="theme" class="block mb-1 text-xs font-semibold">Theme</label>
                    {{ theme }}
                    <select
                        id="theme"
                        v-model="theme"
                        class="block w-full rounded border-gray-300 py-2 pl-2.5 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs"
                    >
                        <option value="dark">Dark</option>
                        <option value="funky">Funky</option>
                        <option value="atom-dark">atom dark</option>
                        <option value="tomorrow">Tomorrow</option>
                    </select>
                </div>

                <div>
                    <label for="language" class="block mb-1 text-xs font-semibold">Language</label>
                    <select
                        id="language"
                        v-model="currentLanguage"
                        class="block w-full rounded-md border-gray-300 py-2 pl-2.5 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-xs"
                    >
                        <option v-for="language in languages" :key="language" :value="language">{{ language }}</option>
                    </select>
                </div>
            </div>

            <hr class="border-gray-200 my-4 -m-2">

            <button @click="submit" type="button" class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Run</button>
        </div>

        <div class="flex-1">
            <AceEditor ref="aceEditor" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// import Prismjs from './components/Prismjs.vue';
import { walkTree } from './utils/walkTree';
import { calculateRGB } from './utils/calculateRGB';
import { countNodeLength } from './utils/countNodeLength'
import { usePrism } from './composables/usePrism';
import AceEditor from './components/AceEditor.vue';

const { languages, currentLanguage, theme } = usePrism();
const primsjs = ref(null)
const aceEditor = ref(null)

function buildPayloadMessage() {
    const el = document.getElementsByClassName('ace_text-layer')[0]
    console.log('rootEl', el);
    // const newNodes = Array.from(el.childNodes).map(n => n.childNodes).flat()
    // console.log('newNodes', newNodes);
    const nodes = Array.from(el.childNodes)
        .reduce((total, node) => {
            if (node.childNodes.length) {
                // Remove nodes without classes (spaces)
                const children = Array.from(node.childNodes)
                // console.log(children[0].childNodes[0]);
                    .map(o => {
                        if (!o.classList.length || o.classList.contains('ace_indent-guide')) {
                            return o.childNodes[0]
                        }

                        return o
                        // o.classList.length ? o :
                        // console.log(o.childNodes[0]);
                        // console.log(window.getComputedStyle(o.childNodes).color);
                    })

                total = [...total, ...children]
            }

            return total
        }, [])
    console.log(nodes);
    // Check if the last item is <br>
    // Prims always adds <br> at the end
    // const lastNode = el.childNodes[el.childNodes.length - 1]
    // if (lastNode.nodeName === 'BR') {
    //     nodes.pop()
    // }

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
                console.log(node, node.length, pointer);
            } else {
                const nodeLength = countNodeLength(node)
                console.log(node, nodeLength, pointer, pointer + nodeLength);
                output.push({
                    length: nodeLength,
                    start: pointer,
                    end: pointer + nodeLength,
                    color: calculateRGB(window.getComputedStyle(node).color),
                })
            }
        }
    })
    // function submit() {\n    const pluginMessage

    console.table(output);

    return output
}

function submit() {
    const pluginMessage = {
        type: 'APPLY_THEME',
        code: aceEditor.value.aceEditor.getValue(),
        code_highlighted: buildPayloadMessage()
    }

    console.log(pluginMessage);

    parent.postMessage({ pluginMessage }, '*')
}
</script>
