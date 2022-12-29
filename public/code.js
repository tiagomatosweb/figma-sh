figma.showUI(__html__, { width: 800, height: 600, title: 'Figma Syntax Highlighter' });

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'APPLY_THEME') {
        await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })
        const text = figma.createText()
        text.characters = msg.code

        // Set the general color
        text.setRangeFills(0, text.characters.length, [
            {
                blendMode: 'NORMAL',
                color: {
                    r: 1, g: 1, b: 1,
                },
                opacity: 1,
                type: 'SOLID',
                visible: true,
            }
        ])

        // Set color by range
        msg.code_highlighted.forEach((node) => {
            text.setRangeFills(node.start, node.end, [
                {
                    blendMode: 'NORMAL',
                    color: node.color,
                    opacity: 1,
                    type: 'SOLID',
                    visible: true,
                }
            ])
        })
    }

    figma.closePlugin();
};
