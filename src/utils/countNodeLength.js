export const countNodeLength = (node) => {
    let lng = 0

    if (node.childNodes.length) {
        // Element node
        node.childNodes.forEach((n) => {
            lng = lng + countNodeLength(n)
        })
    } else {
        // Text node
        lng = lng + node.length
    }

    return lng
}
