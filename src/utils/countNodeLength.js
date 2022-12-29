export const countNodeLength = (node) => {
    let lng = 0

    if (node.childNodes.length) {
        // Element node
        node.childNodes.forEach((n) => {
            lng = lng + countNodeLength(n, 'child')
        })
    } else {
        // Text node
        lng = lng + node.length
    }

    return lng
}
