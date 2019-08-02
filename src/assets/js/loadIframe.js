const loadIframe = (url,parent) => {
    return new Promise((resolve, reject) => {
        const iframe = document.createElement('iframe');

        iframe.setAttribute('webkitallowfullscreen', true);
        iframe.setAttribute('mozallowfullscreen', true);
        iframe.setAttribute('allowfullscreen', true);
        iframe.setAttribute('allow', 'autoplay');

        iframe.src = url;
        
        parent.appendChild(iframe);
        

        iframe.style.visibility = 'hidden';

        iframe.onload = event => resolve(iframe);
    });
}

export { loadIframe };
