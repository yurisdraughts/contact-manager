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
        type === 'align-right' ? block + this.name + '_align-right' : '',
        type === 'position-relative' ? block + this.name + '_position-relative' : ''
    ]">
        <slot></slot>
    </div>
    `
}