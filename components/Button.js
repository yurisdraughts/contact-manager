export default {
    data() {
        return {
            name: '__button'
        }
    },
    props: ['block', 'type', 'value'],
    template: /* html */ `
    <button :class="[
        block + this.name,
        type === 'margin-right' ? block + this.name + '_margin-right' : '',
        type === 'position-absolute' ? block + this.name + '_position-absolute' : ''
    ]">{{value}}</button>
    `
};