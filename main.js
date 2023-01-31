import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { ContactManager } from './modules/ContactManager.js';

document.querySelector('.background').addEventListener('mousemove', function(event) {
    const mousePosition = Math.hypot(
        event.clientX / this.offsetWidth,
        event.clientY / this.offsetHeight
    );

    const basePercent = 25,
        percentRange = 50,
        adjustablePercent = percentRange * mousePosition;

    const gradientPercent = basePercent + adjustablePercent;

    this.style.setProperty('--middle-point', `${gradientPercent}%`);
});

const contactManager = new ContactManager();

createApp({
    data() {
        return {
            contactManager
        };
    },
}).mount('#app');