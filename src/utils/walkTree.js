export const walkTree = function* (node) {
    yield node
    let children = node.childNodes
    if (children) {
        for (let i = 0; i < children.length; i++) {
            yield* walkTree(children[i])
        }
    }
}
