export default {
    data() {
        return {
            name: '__button'
        }
    },
    computed: {
        className() {
            if (
                this.type === 'margin-right' ||
                this.type === 'position-absolute' ||
                this.type === 'delete-contact' ||
                this.type === 'delete-field' ||
                this.type === 'add-field' ||
                this.type === 'add-field_address' ||
                this.type === 'add-field_phone' ||
                this.type === 'add-field_email' ||
                this.type === 'add-field_telegram' ||
                this.type === 'add-field_vk' ||
                this.type === 'add-field_close' ||
                this.type === 'add-field_close_small' ||
                this.type === 'add-field_small'
            ) {
                return `${this.block}${this.name}_${this.type}`;
            }
            return '';
        }
    },
    props: ['block', 'type', 'value'],
    template: /* html */ `
    <button
        :class="[
            block + this.name,
            className
        ]"
        v-html="value"
    ></button>
    `
};