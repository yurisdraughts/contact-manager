import FormButton from "./Button.js";

export default {
    props: ['block', 'contact', 'fieldKey'],
    components: {
        FormButton
    },
    methods: {
        deleteField() {
            this.contact.deleteField(this.contact.fields[this.fieldKey].value);
        }
    },
    template: /* html */ `
    <div
        :class="block + '__contact-field'"
    >
        <div :class="block + '__contact-field-class'">
            <i v-if="fieldKey === 'Address'" class="fa-solid fa-location-dot"></i>
            <i v-else-if="fieldKey === 'Phone'" class="fa-solid fa-phone"></i>
            <i v-else-if="fieldKey === 'Email'" class="fa-solid fa-envelope"></i>
            <i v-else-if="fieldKey === 'Telegram'" class="fa-brands fa-telegram"></i>
            <i v-else-if="fieldKey === 'VK'" class="fa-brands fa-vk"></i>
            <i v-else class="fa-solid fa-question"></i>
            <FormButton
                :block="block"
                title="Удалить поле"
                type="delete-field"
                value="<i class='fa-solid fa-trash'></i>"
                @click="deleteField"
            />
        </div>
        <div v-if="fieldKey === 'Phone'" :class="block + '__contact-field-value'">
            <a :href="'tel:' + contact.fields[fieldKey].value">позвонить</a>
        </div>
        <div v-else-if="fieldKey === 'Email'" :class="block + '__contact-field-value'">
            <a :href="'mailto:' + contact.fields[fieldKey].value">написать письмо</a>
        </div>
        <div v-else-if="contact.fields[fieldKey].hasLink" :class="block + '__contact-field-value'">
            <a :href="contact.fields[fieldKey].fullLink">ссылка</a>
        </div>
        <div v-else :class="block + '__contact-field-value'">
            {{contact.fields[fieldKey].value}}
        </div>

    </div>
    `
}