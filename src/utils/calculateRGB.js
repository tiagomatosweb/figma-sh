export const calculateRGB = (color) => {
    const rgbColor = color.match(/\d+/g);

    return {
        r: parseInt(rgbColor[0]) / 255,
        g: parseInt(rgbColor[1]) / 255,
        b: parseInt(rgbColor[2]) / 255,
    };
}
