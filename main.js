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

contactManager.addContact('Борис');
contactManager.addContact('Аня');
contactManager.addContact('Елена');
contactManager.getContact('Борис').addField('+333333333', 'phone');
contactManager.getContact('Борис').addField('sbjknb', 'telegram');
// contactManager.getContact('Boris').deleteField('sbjknb');
contactManager.getContact('Аня').addField('kjvsvnsldkvn', 'vk');
contactManager.getContact('Елена').addField('hjhvkv@kjvhvhv.kh', 'email');
contactManager.getContact('Елена').addField('пр. Седова, д. 1/1', 'address');

createApp({
    data() {
        return {
            contactManager,
            blockName: 'contact-manager',
            state: {
                initial: true,
                search: false,
                result: false
            },
            searchQuery: ''
        };
    },

    computed: {
        filteredContacts() {
            return this.contactManager.allContacts.filter(contact => {
                return contact.name.toLowerCase()
                    .includes(this.searchQuery.toLowerCase());
            });
        },
        canAddContact() {
            const names = this.filteredContacts.map(contact => contact.name)
            return this.searchQuery && (
                !this.filteredContacts.length ||
                !names.includes(this.searchQuery)
                )
        }
    },

    watch: {
        searchQuery() {
            if (this.state.search) {
                this.state.result = !!this.searchQuery
                    && !!this.filteredContacts.length;
            }
        }
    },

    components: {
        FormButton,
        Container,
        Result,
        FormInput
    },

    methods: {
        gotoInitial() {
            Object.assign(this.state, {
                initial: true,
                search: false,
                result: false
            });
        },
        searchContacts() {
            Object.assign(this.state, {
                initial: false,
                search: true,
                result: false
            });
        },
        showAll() {
            Object.assign(this.state, {
                initial: false,
                search: false,
                result: true && !!this.contactManager.allContacts.length
            });
        },
        addContact(name, event = null) {
            if (!event || event.key === 'Enter') {
                if (event?.key === 'Enter') event.preventDefault();
                this.searchQuery = '';
                this.contactManager.addContact(name);
                this.showAll();
            }
        }
    },

    template: /* html */ `
    <form :class="this.blockName">
        <container
        :block="this.blockName"
        >
            <form-button
                v-if="!this.state.search"
                :value="this.state.initial ? 'Искать или добавить' : 'Искать'"
                :block="this.blockName"
                type="margin-right"
                @click.prevent="searchContacts"
            />
            <form-button
                v-if="!this.state.result"
                value="Посмотреть все"
                :block="this.blockName"
                type="margin-right"
                @click.prevent="showAll"
            />
            <form-button
                v-if="!this.state.initial"
                value="<i class='fa-solid fa-arrow-left'></i>&nbsp;В начало"
                :block="this.blockName"
                @click.prevent="gotoInitial"
            />
        </container>
        <container
            v-if="this.state.search"
            :block="this.blockName"
            type="position-relative"
        >
            <form-input
                placeholderValue="Введите имя"
                :block="this.blockName"
                :modelValue="searchQuery"
                @update:modelValue="newValue => searchQuery = newValue"
                @keydown="addContact(searchQuery, $event)"
            />
            <form-button
                v-if="canAddContact"
                value="Добавить"
                :block="this.blockName"
                type="position-absolute"
                @click.prevent="addContact(searchQuery)"
            />
        </container>
        </form>
    <result
        v-if="this.state.result"
        :block="this.blockName"
        :contacts="filteredContacts"
        :contactManager="contactManager"
        @contactDeleted="showAll"
    />
    `
}).mount('#app');