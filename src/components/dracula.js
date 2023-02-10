import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';

const config = {
    name: 'dracula',
    dark: true,
    background: '#282A36',
    foreground: '#F8F8F2',
    selection: '#44475A',
    cursor: '#F8F8F2',
    dropdownBackground: '#282A36',
    dropdownBorder: '#191A21',
    activeLine: '#44475A',
    matchingBracket: '#44475A',
    keyword: '#FF79C6',
    storage: '#FF79C6',
    variable: '#F8F8F2',
    parameter: '#F8F8F2',
    function: '#50FA7B',
    string: '#F1FA8C',
    constant: '#BD93F9',
    type: '#8BE9FD',
    class: '#8BE9FD',
    number: '#BD93F9',
    comment: '#6272A4',
    heading: '#BD93F9',
    invalid: '#FF5555',
    regexp: '#F1FA8C',
};
const draculaTheme = EditorView.theme({
    '&': {
        color: config.foreground,
        backgroundColor: config.background,
    },
    '.cm-content': { caretColor: config.cursor },
    '&.cm-focused .cm-cursor': { borderLeftColor: config.cursor },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, & ::selection': { backgroundColor: config.selection },
    '.cm-panels': { backgroundColor: config.dropdownBackground, color: config.foreground },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
    '.cm-searchMatch': {
        backgroundColor: config.dropdownBackground,
        outline: `1px solid ${config.dropdownBorder}`
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: config.selection
    },
    '.cm-activeLine': { backgroundColor: config.activeLine },
    '.cm-selectionMatch': { backgroundColor: config.selection },
    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: config.matchingBracket,
        outline: 'none'
    },
    '.cm-gutters': {
        backgroundColor: config.background,
        color: config.foreground,
        border: 'none'
    },
    '.cm-activeLineGutter': { backgroundColor: config.background },
    '.cm-foldPlaceholder': {
        backgroundColor: 'transparent',
        border: 'none',
        color: config.foreground
    },
    '.cm-tooltip': {
        border: `1px solid ${config.dropdownBorder}`,
        backgroundColor: config.dropdownBackground,
        color: config.foreground
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent'
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: config.foreground,
        borderBottomColor: config.foreground,
    },
    '.cm-tooltip.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
            background: config.selection,
            color: config.foreground
        }
    },
}, { dark: config.dark });
const draculaHighlightStyle = HighlightStyle.define([
    { tag: tags.keyword, color: config.keyword },
    { tag: [tags.name, tags.deleted, tags.character, tags.macroName], color: config.variable },
    { tag: [tags.propertyName], color: config.function },
    { tag: [tags.processingInstruction, tags.string, tags.inserted, tags.special(tags.string)], color: config.string },
    { tag: [tags.function(tags.variableName), tags.labelName], color: config.function },
    { tag: [tags.color, tags.constant(tags.name), tags.standard(tags.name)], color: config.constant },
    { tag: [tags.definition(tags.name), tags.separator], color: config.variable },
    { tag: [tags.className], color: config.class },
    { tag: [tags.number, tags.changed, tags.annotation, tags.modifier, tags.self, tags.namespace], color: config.number },
    { tag: [tags.typeName], color: config.type, fontStyle: config.type },
    { tag: [tags.operator, tags.operatorKeyword], color: config.keyword },
    { tag: [tags.url, tags.escape, tags.regexp, tags.link], color: config.regexp },
    { tag: [tags.meta, tags.comment], color: config.comment },
    { tag: tags.strong, fontWeight: 'bold' },
    { tag: tags.emphasis, fontStyle: 'italic' },
    { tag: tags.link, textDecoration: 'underline' },
    { tag: tags.heading, fontWeight: 'bold', color: config.heading },
    { tag: [tags.atom, tags.bool, tags.special(tags.variableName)], color: config.variable },
    { tag: tags.invalid, color: config.invalid },
    { tag: tags.strikethrough, textDecoration: 'line-through' },
]);
const dracula = [
    draculaTheme,
    syntaxHighlighting(draculaHighlightStyle),
];

export { config, dracula, draculaHighlightStyle, draculaTheme };
