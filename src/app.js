'use strict';
import ready from './assets/js/_Domready';



ready(() => {
    console.log('aaaa');
    
    var vimeo1 = document.getElementById('148239556');

    vimeo1.addEventListener('loadThumnail', function (event) {
        console.log('load thumnail');
        console.log(event.detail.data);
    });

    vimeo1.addEventListener('loadIframe', function () {
        console.log('load iframe');
    })

    // var vimeo2 = document.getElementById('145706303');
    
    // vimeo2.setRoot(document.querySelector('.article-wrap'));
    


});