'use strict';

import { getJson } from '../assets/js/getJson';
import { getAspect } from '../assets/js/getAspect';
import { loadImage } from '../assets/js/loadImage';
import { loadIframe } from '../assets/js/loadIframe';
import { loadingIcon } from '../assets/js/loadingIcon';
import rikaaaIntersectionObserver from '../assets/js/rikaaa-IntersectionWatcher';
import onebang from '../assets/js/_Onebang';

import '../assets/js/String.prototype.padStart';


const _css = '${{{src/webcomponents/webcomponent.scss}}}';
const _style = `<style>${_css}</style>`;
const _shadowdomHTML = `
    ${_style}
    <div class="container-wrap">
    <div class="placeholder"v></div>
    <div class="container main-container">
        <p class="description"></p>
        <div class="loading-icon">
            <div class="container-wrap">
                <div class="placeholder"></div>
                <div class="container"></div>
            </div>
        </div>
    </div>
    </div>
`;
const template = document.createElement('template');
template.id = 'rikaaavimeo';
template.innerHTML = _shadowdomHTML;
if (window.ShadyCSS) ShadyCSS.prepareTemplate(template, 'rikaaa-vimeo');


export default class rikaaavimeo extends HTMLElement {
    constructor() {
        super();
        if (window.ShadyCSS) ShadyCSS.styleElement(this);
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));


        if (!window.IntersectionObserver && !window.WcRikaaaIntersectionObserver) {
            Object.defineProperty(window, 'WcRikaaaIntersectionObserver', {
                value: rikaaaIntersectionObserver
            });
        }
        

        this._vimeoId;
        this._size;
        this._loadtimeing = '200px 0px 200px 0px';
        this._query = '?autoplay=1&title=0&byline=0&portrait=0';
        this._dizolveDuration = 100;

        this._loadVimeo;
        this._thumnailClickFun;
        this._intersectionobserver = window.IntersectionObserver || window.WcRikaaaIntersectionObserver;
    }
    connectedCallback() {

        if (this._size) {
            rikaaavimeo.setAreaSize(this,this._size);
        }

        if (this._vimeoId && !this._loadVimeo) {
            rikaaavimeo.prepareLoad(this, {
                rootMargin: this._loadtimeing,
            });
        }

        this.dispatchEvent(new CustomEvent('load'));        
    }
    static get observedAttributes() {
        return [
            'vimeoid',
            'loadtiming',
            'size',
            'query',
        ]
    }
    attributeChangedCallback(attr, oldval, newval) {
        if (attr === 'vimeoid') this._vimeoId = newval;
        if (attr === 'size') this._size = newval.split('x');
        if (attr === 'loadtiming') this._loadtimeing = newval;
        if (attr === 'query') this._query = newval;
    }
    disconnectedCallback() {
        this._loadVimeo.unobserve(this);
        this._loadVimeo.disconnect();

        if (this._thumnailClickFun) this.shadowRoot.querySelector('.container-wrap').removeEventListener('click', this._thumnailClickFun);
        if (this._whenPlay) window.removeEventListener('message', this._whenPlay);
    }


    init(id) {
        this._loadVimeo.unobserve(this);
        this._loadVimeo.disconnect();

        const descriptionNode = this.shadowRoot.querySelector('.description');


        rikaaavimeo.getVimeoJson(id).then(json => {
            const data = json[0];

            
            const thumnailId = rikaaavimeo.parserThumbnailId(data.thumbnail_large)
            const thumnailUrl = rikaaavimeo.parserThumnailUrl(thumnailId, data.width)            
            const iframeUrl = rikaaavimeo.parserVimeoIframeUrl(id, this._query);
            const durationStr = rikaaavimeo.parseDuration(data.duration);

            
            descriptionNode.innerHTML = durationStr;
            descriptionNode.style.display = 'block';
            


            loadImage(thumnailUrl).then(imgNode => {
                rikaaavimeo.setAreaSize(this, [data.width, data.height]);
                rikaaavimeo.setVimeoThumbnail(this, imgNode);

                this._thumnailClickFun = rikaaavimeo.setVimeoIframe.bind(null, this, iframeUrl);

                if(!this._loadingIcon) this._loadingIcon = new loadingIcon(this.shadowRoot.querySelector('.loading-icon .container'));

                this.shadowRoot.querySelector('.container-wrap').addEventListener('click', this._thumnailClickFun, false);

                this.dispatchEvent(new CustomEvent('loadThumnail', {
                    detail: {
                        data: data,
                    }
                }));
            });
        });
    }
    setRoot(node) {
        rikaaavimeo.prepareLoad(this, {
            rootMargin: this._loadtimeing,
            root:node,
        });
    }


    static setAreaSize(host, sizeArray) {
        const placeholderNode = host.shadowRoot.querySelector('.placeholder');
        const aspect = getAspect(sizeArray[0], sizeArray[1]);
        const paddingTop = aspect.h / aspect.w * 100;

        placeholderNode.style.paddingTop = `${paddingTop}%`;
    }
    static setVimeoThumbnail(host, imgNode) {
        const parentNode = host.shadowRoot.querySelector('.container');

        imgNode.style.width = '100%';
        
        imgNode.classList.add('thumbnail-img');
        
        parentNode.appendChild(imgNode);
    }
    static setVimeoIframe(host, url) {
        const parentNode = host.shadowRoot.querySelector('.container');
        const loadingIcon = host._loadingIcon;


        const disolveDuration = host._dizolveDuration;
        const thumbnail = host.shadowRoot.querySelector('.thumbnail-img');
        const loadingIconNode = host.shadowRoot.querySelector('.loading-icon');
        const descriptionNode = host.shadowRoot.querySelector('.description');


        loadingIconNode.style.visibility = 'visible';
        

        loadingIcon.startLoadAnimation();
        host.shadowRoot.querySelector('.container-wrap').removeEventListener('click', host._thumnailClickFun);


        loadIframe(url, parentNode).then(iframeNode => {
            const isAutoplay = rikaaavimeo.isAutoplay(url);
           

            const transitionStyle = `all ${disolveDuration}ms ease-in`;

            iframeNode.style.transition = transitionStyle;
            thumbnail.style.transition = transitionStyle;
            loadingIconNode.style.transition = transitionStyle;
            descriptionNode.style.transition = transitionStyle;

            if (isAutoplay) {
                const contentWindow = iframeNode.contentWindow;


                iframeNode.style.visibility = '';
                iframeNode.style.opacity = '0';


                contentWindow.postMessage(JSON.stringify({ method: 'pause' }), url);
                contentWindow.postMessage(JSON.stringify({ method: 'play' }), url);

                host._whenPlay = event => {
                    if (JSON.parse(event.data).method === 'play') {
                        loadingIcon.stop();

                        iframeNode.style.opacity = '1';

                        thumbnail.style.opacity = '0';
                        thumbnail.style.visibility = 'hidden';
                        loadingIconNode.style.opacity = '0';
                        loadingIconNode.style.visibility = 'hidden';
                        descriptionNode.style.opacity = '0';
                        descriptionNode.style.visibility = 'hidden';


                        contentWindow.postMessage(JSON.stringify({
                            method: 'play'
                        }), url);

                        contentWindow.postMessage(JSON.stringify({ method: 'play' }), url);

                        window.removeEventListener('message', host._whenPlay);

                        host.dispatchEvent(new CustomEvent('loadIframe'));
                    }
                }

                window.addEventListener('message', host._whenPlay);
            } else {
                loadingIcon.stop();
                
                iframeNode.style.visibility = '';
                iframeNode.style.opacity = '1';

                thumbnail.style.opacity = '0';
                thumbnail.style.visibility = 'hidden';
                loadingIconNode.style.opacity = '0';
                loadingIconNode.style.visibility = 'hidden';
                descriptionNode.style.opacity = '0';
                descriptionNode.style.visibility = 'hidden';


                host.dispatchEvent(new CustomEvent('loadIframe'));
            }
        });
    }

    static parseDuration(sec) {
        const parser = time => time.toString().padStart(2, '0');

        let second = sec;

        const hour = parseInt(second / 3600);
        second = second % 3600;

        const minutes = parseInt(second / 60);
        second = second % 60;

        return `${parser(hour)}:${parser(minutes)}:${parser(second)}`;
    }
    static prepareLoad(host, option) {
        if (host._loadVimeo) {
            host._loadVimeo.unobserve(host);
            host._loadVimeo.disconnect();
        }

        const _option = option || {};

        const oneInit = onebang(host.init.bind(host));

        const callback = entries => {
            if (entries[0].isIntersecting) oneInit(host._vimeoId);
        }

        host._loadVimeo = new host._intersectionobserver(callback, _option);
        host._loadVimeo.observe(host);
    }
    static getVimeoJson(id) {
        return getJson(`https://vimeo.com/api/v2/video/${id}.json`).then(json => JSON.parse(json));
    }
    static parserVimeoIframeUrl(id, queryStr) {
        if (queryStr) {
            return `https://player.vimeo.com/video/${id}${queryStr}`;
        } else {
            return `https://player.vimeo.com/video/${id}`;
        }
    }
    static parserThumnailUrl(id,width) {
        return `https://i.vimeocdn.com/video/${id}_${width}.jpg`;
    }
    static isAutoplay(url) {        
        return (Number(url.match(/autoplay=\d/)[0].replace('autoplay=', '')) === 1) ? true : false;
    }
    static parserThumbnailId(thumbnailUrl) {
        return Number(thumbnailUrl.match(/\/\d+_/)[0].replace('\/', '').replace('_', ''));
    }
}