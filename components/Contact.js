import ContactField from "./ContactField.js";
import FormButton from "./Button.js";

export default {
    props: ['block', 'contact', 'contactManager'],
    emits: ['contactDeleted'],
    components: {
        ContactField,
        FormButton
    },
    methods: {
        deleteContact() {
            this.contactManager.deleteContact(this.contact.name);
            this.$emit('contactDeleted');
        }
    },
    template: /* html */ `
    <div
    :class="block + '__contact'"
    >
        <div :class="block + '__contact-name'">
            <span>{{contact.name}}</span>
            <FormButton
                :block="block"
                title="Удалить контакт"
                type="delete-contact"
                value="<i class='fa-solid fa-trash'></i>"
                @click="deleteContact"
            />
        </div>
        <div :class="block + '__contact-field-list'">
            <ContactField
            v-for="key of Object.keys(contact.fields)"
            :block="block"
            :contact="contact"
            :fieldKey="key"
            />
            <FormButton
                :block="block"
                title="Добавить новое поле"
                type="add-field"
                value="<i class='fa-solid fa-plus'></i>"
            />
        </div>
    </div>
    `
}