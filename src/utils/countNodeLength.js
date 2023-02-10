export const countNodeLength = (node) => {
    let lng = 0

    if (node.childNodes.length) {
        // Element node
        node.childNodes.forEach((n) => {
            lng = lng + countNodeLength(n)
        })
    } else {
        // Text node
        lng = lng + (node.length || 1) // when the node is empty means empty line, so we add 1 character
    }
    return lng
}
