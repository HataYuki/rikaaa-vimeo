const getJson = (url) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', url, true);
    xhr.send();
    
    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            resolve(xhr.response);
        }
        xhr.onerror = () => {
            reject(xhr.statusText);
        }

        
        
    });
}

export { getJson };

