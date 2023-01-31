import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { ContactManager } from './modules/ContactManager.js';
import FormButton from './components/Button.js';
import Container from './components/Container.js';

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
            contactManager,
            styleObject: {}
        };
    },
    components: {
        FormButton,
        Container
    },
    template: /* html */ `
    <form class="form">
        <container>
            <form-button value="В начало"></form-button>
        </container>
        <container>
            <form-button value="Искать"></form-button>
            <form-button value="Посмотреть все"></form-button>
        </container>
        <container>
            <input class="form__input" placeholder="Введите имя">
            <form-button value="Добавить"></form-button>
        </container>
    </form>
    `
}).mount('#app');