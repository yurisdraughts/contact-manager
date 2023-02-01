import ContactField from "./ContactField.js";
import FormButton from "./Button.js";

export default {
    data() {
        return {
            chooseFieldTypeMode: false,
            newFieldInputMode: false,
            newFieldType: '',
            inputValue: ''
        };
    },

    props: ['block', 'contact', 'contactManager', 'searchMode'],
    emits: ['contactDeleted'],

    components: {
        ContactField,
        FormButton
    },

    methods: {
        deleteContact() {
            this.contactManager.deleteContact(this.contact.name);
            this.$emit('contactDeleted');
        },
        addField(event = null) {
            if (!event.key || event.key === 'Enter') {
                if (event?.key === 'Enter') event.preventDefault();
                this.contact.addField(this.inputValue, this.newFieldType.toLowerCase());
                this.inputValue = '';
                this.newFieldInputMode = false;
                this.chooseFieldTypeMode = false;
            }
        },
        getFontAwesomeHTML(className) {
            return `<i class="${className}"></i>`;
        },
        toggleChooseFieldType() {
            this.chooseFieldTypeMode = !this.chooseFieldTypeMode;
        },
        closeInput() {
            this.inputValue = '';
            this.newFieldInputMode = false;
            this.chooseFieldTypeMode = false;
        },
        getButtonTitleValue(fieldType) {
            switch (fieldType) {
                case 'Address':
                    return 'Добавить адрес';
                case 'Phone':
                    return 'Добавить номер телефона';
                case 'Email':
                    return 'Добавить email';
                case 'Telegram':
                    return 'Добавить ссылку на Telegram';
                case 'VK':
                    return 'Добавить ссылку на страницу VK';
            }
        },
    },

    computed: {
        inputClass() {
            return [this.block + '__input', this.block + '__input_add-field'];
        },
        inputPlaceholderValue() {
            switch (this.newFieldType) {
                case 'Address':
                    return 'Введите адрес:';
                case 'Phone':
                    return 'Введите номер телефона:';
                case 'Email':
                    return 'Введите email:';
                case 'Telegram':
                    return 'Введите имя пользователя Telegram:';
                case 'VK':
                    return 'Введите адрес страницы VK без vk.com/:';
            }
        },
        addFieldSmallButtonDisplay() {
            return this.newFieldInputMode && this.inputValue !== '' && !this.searchMode;
        },
        fieldTypeButtonsDisplay() {
            return this.chooseFieldTypeMode && !this.newFieldInputMode && !this.searchMode;
        },
        addFieldButtonDisplay() {
            return !this.newFieldInputMode && !this.searchMode;
        }
    },

    template: /* html */ `
    <div
    :class="block + '__contact'"
    >
        <div :class="block + '__contact-name'">
            <span>{{contact.name}}</span>
            <FormButton
                v-if="!this.searchMode"
                :block="block"
                title="Удалить контакт"
                type="delete-contact"
                value="<i class='fa-solid fa-trash'></i>"
                @click="deleteContact"
            />
        </div>
        <div :class="block + '__contact-field-list'">
            <ContactField
            v-for="(field, index) of contact.fields"
            :block="block"
            :contact="contact"
            :fieldIndex="index"
            :fieldType="field.constructor.name"
            :searchMode="this.searchMode"
            />
            <div :class="block + '__contact-add-field-buttons-container'">
                <input
                    v-if="this.newFieldInputMode"
                    :class="inputClass"
                    v-model="inputValue"
                    :placeholder="inputPlaceholderValue"
                    @keydown="addField($event)"
                />
                <FormButton
                    v-if="addFieldSmallButtonDisplay"
                    :block="block"
                    title="Добавить новое поле"
                    type="add-field_small"
                    :value="getFontAwesomeHTML('fa-solid fa-plus')"
                    @click.prevent="addField"
                />
                <FormButton
                    v-if="this.newFieldInputMode"
                    :block="block"
                    title="Закрыть"
                    type="add-field_close_small"
                    :value="getFontAwesomeHTML('fa-solid fa-xmark')"
                    @click.prevent="closeInput"
                />
                <FormButton
                    v-if="fieldTypeButtonsDisplay"
                    v-for="(fieldValue, fieldType) in {
                        Address: 'fa-solid fa-location-dot',
                        Phone: 'fa-solid fa-phone',
                        Email: 'fa-solid fa-envelope',
                        Telegram: 'fa-brands fa-telegram',
                        VK: 'fa-brands fa-vk'
                    }"
                    :block="block"
                    :title="getButtonTitleValue(fieldType)"
                    :type="'add-field_' + fieldType.toLowerCase()"
                    :value="getFontAwesomeHTML(fieldValue)"
                    @click.prevent="
                        this.newFieldInputMode = !this.newFieldInputMode;
                        this.newFieldType = fieldType;
                    "
                />
                <FormButton
                    v-if="addFieldButtonDisplay"
                    :block="block"
                    :title="!this.chooseFieldTypeMode ? 'Добавить новое поле' : 'Закрыть'"
                    :type="!this.chooseFieldTypeMode ? 'add-field' : 'add-field_close'"
                    :value="
                        !this.chooseFieldTypeMode
                            ? getFontAwesomeHTML('fa-solid fa-plus')
                            : getFontAwesomeHTML('fa-solid fa-xmark')
                    "
                    @click.prevent="toggleChooseFieldType"
                />
            </div>
        </div>
    </div>
    `
}