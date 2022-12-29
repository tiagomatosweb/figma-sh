import Prism from "prismjs";
import { ref, watch } from 'vue';
Prism.manual = true;

const languages = Object.keys(Prism.languages)
const currentLanguage = ref('javascript')
const theme = ref('tomorrow')

export const usePrism = () => {
    function highlighter (code) {
        return Prism.highlight(code, Prism.languages[currentLanguage.value], currentLanguage.value);
    }

    watch(theme, (vl) => {
        let file = document.createElement('link');
        file.rel = 'stylesheet';
        file.href = `/themes/prism-${vl}.css`
        document.head.appendChild(file)
    })

    return {
        highlighter,
        languages,
        theme,
        currentLanguage
    }
}
