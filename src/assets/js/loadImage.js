const loadImage = (urlOrPath) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', event => resolve(img));
        img.src = urlOrPath;
    });
}

export { loadImage };