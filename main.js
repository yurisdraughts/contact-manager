import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { ContactManager } from './modules/ContactManager.js';
import FormButton from './components/Button.js';
import Container from './components/Container.js';
import Result from './components/Result.js';
import MainInput from './components/MainInput.js';

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

contactManager.addContact('борис');
contactManager.addContact('Аня');
contactManager.addContact('ЕЛЕНА');
contactManager.getContact('борис')?.addField('+333333333', 'phone');
contactManager.getContact('борис')?.addField('sbjknb', 'telegram');
contactManager.getContact('Аня')?.addField('kjvsvnsldkvn', 'vk');
contactManager.getContact('ЕЛЕНА')?.addField('hjhvkv@kjvhvhv.kh', 'email');
contactManager.getContact('ЕЛЕНА')?.addField('пр. Седова, д. 1/1', 'address');

createApp({
    data() {
        return {
            contactManager,
            blockName: 'contact-manager',
            state: {
                initial: true,
                search: false,
                result: false,
                edit: false
            },
            searchQuery: '',
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
        MainInput
    },

    methods: {
        gotoInitial() {
            Object.assign(this.state, {
                initial: true,
                search: false,
                result: false,
                edit: false
            });

            this.searchQuery = '';
        },
        searchContacts() {
            Object.assign(this.state, {
                initial: false,
                search: true,
                result: false,
                edit: false
            });
        },
        showAll() {
            Object.assign(this.state, {
                initial: false,
                search: false,
                result: true && !!this.contactManager.allContacts.length,
                edit: false
            });

            this.searchQuery = '';
        },
        edit() {
            Object.assign(this.state, {
                initial: false,
                search: false,
                result: true && !!this.contactManager.allContacts.length,
                edit: true
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
        type="buttons"
        >
            <form-button
                v-if="!this.state.search"
                value="Искать или добавить"
                :block="this.blockName"
                type="margin-right"
                @click.prevent="searchContacts"
            />
            <form-button
                v-if="!this.state.result || this.state.search || this.state.edit"
                value="Посмотреть все"
                :block="this.blockName"
                type="margin-right"
                @click.prevent="showAll"
            />
            <form-button
                v-if="this.state.result && !this.state.edit"
                value="Редактировать"
                :block="this.blockName"
                type="margin-right"
                @click.prevent="edit"
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
            <main-input
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
        :searchMode="this.state.result && !this.state.edit"
        @contactDeleted="showAll"
    />
    `
}).mount('#app');