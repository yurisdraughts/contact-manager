import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { ContactManager } from './modules/ContactManager.js';

const contactManager = new ContactManager();

createApp({
    data() {
        return {
            contactManager
        };
    },
}).mount('#app');