import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const contactManager = new ContactManager();

createApp({
    data() {
        return {
            contactManager
        };
    },
}).mount('#app');