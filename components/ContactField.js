import FormButton from "./Button.js";

export default {
    props: ['block', 'contact', 'fieldIndex', 'fieldType', 'searchMode'],
    components: {
        FormButton
    },
    methods: {
        deleteField() {
            this.contact.deleteField(this.contact.fields[this.fieldIndex].value);
        }
    },
    template: /* html */ `
    <div
        :class="block + '__contact-field'"
    >
        <div :class="block + '__contact-field-class'">
            <i v-if="fieldType === 'Address'" class="fa-solid fa-location-dot"></i>
            <i v-else-if="fieldType === 'Phone'" class="fa-solid fa-phone"></i>
            <i v-else-if="fieldType === 'Email'" class="fa-solid fa-envelope"></i>
            <i v-else-if="fieldType === 'Telegram'" class="fa-brands fa-telegram"></i>
            <i v-else-if="fieldType === 'VK'" class="fa-brands fa-vk"></i>
            <i v-else class="fa-solid fa-question"></i>
            <FormButton
                v-if="!this.searchMode"
                :block="block"
                title="Удалить поле"
                type="delete-field"
                value="<i class='fa-solid fa-trash'></i>"
                @click="deleteField"
            />
        </div>
        <div v-if="fieldType === 'Phone'" :class="block + '__contact-field-value'">
            <a :href="'tel:' + contact.fields[fieldIndex].value">позвонить</a>
        </div>
        <div v-else-if="fieldType === 'Email'" :class="block + '__contact-field-value'">
            <a :href="'mailto:' + contact.fields[fieldIndex].value">написать письмо</a>
        </div>
        <div v-else-if="contact.fields[fieldIndex].hasLink" :class="block + '__contact-field-value'">
            <a :href="contact.fields[fieldIndex].fullLink">ссылка</a>
        </div>
        <div v-else :class="block + '__contact-field-value'">
            {{contact.fields[fieldIndex].value}}
        </div>

    </div>
    `
}