import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { ContactManager } from './modules/ContactManager.js';
import FormButton from './components/Button.js';
import Container from './components/Container.js';
import Result from './components/Result.js';
import FormInput from './components/Input.js';

document.querySelector('.background').addEventListener('mousemove', function (event) {
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
            blockName: 'contact-manager',
            state: {
                initial: true,
                search: false,
                result: false
            }
        };
    },

    components: {
        FormButton,
        Container,
        Result,
        FormInput
    },

    methods: {
        gotoInitial() {
            this.state = {
                initial: true,
                search: false,
                result: false
            };
        },
        gotoSearch() {
            this.state = {
                initial: false,
                search: true,
                result: false
            }
        },
        showAll() {
            this.state = {
                initial: false,
                search: false,
                result: true
            }
        }
    },

    template: /* html */ `
    <form :class="this.blockName">
        <container
            v-if="!this.state.initial"
            :block="this.blockName"
            type="align-right"
        >
            <form-button
                value="В начало"
                :block="this.blockName"
                @click.prevent="gotoInitial"
            ></form-button>
        </container>
        <container
            v-if="this.state.initial"
            :block="this.blockName"
        >
            <form-button
                value="Искать"
                :block="this.blockName"
                type="margin-right"
                @click.prevent="gotoSearch"
            ></form-button>
            <form-button
                value="Посмотреть все"
                :block="this.blockName"
                @click.prevent="showAll"
            ></form-button>
        </container>
        <container
            v-if="this.state.search"
            :block="this.blockName"
            type="position-relative"
        >
            <form-input
                placeholderValue="Введите имя"
                :block="this.blockName"
            ></form-input>
            <form-button
                value="Добавить"
                :block="this.blockName"
                type="position-absolute"
            ></form-button>
        </container>
        </form>
    <result
        v-if="this.state.result"
        :block="this.blockName"
    ></result>
    `
}).mount('#app');