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
                this.type === 'add-field'
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