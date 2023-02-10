<template>
    <codemirror
        v-model="code"
        placeholder="Code goes here..."
        :style="{ height: '400px', width: '300px' }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        @ready="handleReady"
    />

    <div id="shiki" v-html="html" />
</template>

<script>
import { computed, defineComponent, onMounted, ref, shallowRef, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { getHighlighter, setCDN } from 'shiki';

export default defineComponent({
    components: {
        Codemirror
    },
    setup() {
        let shiki = null
        onMounted(async () => {
            setCDN('https://figma-sh.vercel.app/')
            // setCDN('http://127.0.0.1:5173/')
            shiki = await getHighlighter({
                theme: 'material-palenight',
                lang: 'javascript',
            })
        });

        const html = ref()
        const code = ref(`console.log('Hello, world!')`)
        watch(code, () => {
            html.value = shiki.codeToHtml(`${code.value}`, {
                theme: 'material-palenight',
                lang: 'javascript',
            }) ;
        })

        // const html = computed(() => {
        //     console.log(shiki);
        //     if (!shiki) { return; }
        //     return shiki.codeToHtml(`${code.value}`) ;
        // })


        const extensions = [javascript()]

        // Codemirror EditorView instance ref
        const view = shallowRef()
        const handleReady = (payload) => {
            view.value = payload.view
            console.log(view.value);
        }

        // Status is available at all times via Codemirror EditorView
        const getCodemirrorStates = () => {
            const state = view.value.state
            const ranges = state.selection.ranges
            const selected = ranges.reduce((r, range) => r + range.to - range.from, 0)
            const cursor = ranges[0].anchor
            const length = state.doc.length
            const lines = state.doc.lines
            // more state info ...
            // return ...
        }

        return {
            code,
            extensions,
            handleReady,
            log: console.log,
            html
        }
    }
})
</script>
