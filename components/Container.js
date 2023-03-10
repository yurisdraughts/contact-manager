export default {
    data() {
        return {
            name: '__element-container'
        }
    },
    props: ['block', 'type'],
    template: /* html */ `
    <div :class="[
        block + this.name,
        type === 'position-relative' ? block + this.name + '_position-relative' : '',
        type === 'buttons' ? block + this.name + '_buttons' : ''
    ]">
        <slot></slot>
    </div>
    `
}