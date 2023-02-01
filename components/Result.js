import Contact from "./Contact.js";

export default {
    props: ['block', 'contacts', 'contactManager', 'searchMode'],
    emits: ['contactDeleted'],
    components: {
        Contact
    },
    template: /* html */ `
    <div
        :class="block + '__result'"
    >
        <Contact
            v-for="contact in contacts"
            :block="block"
            :contact="contact"
            :contactManager="contactManager"
            :searchMode="this.searchMode"
            @contactDeleted="this.$emit('contactDeleted')"
        />
    </div>
    `
}