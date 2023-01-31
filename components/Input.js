export default {
    props: ['block', 'placeholderValue'],
    template: /* html */ `
    <input :class="block + '__input'" :placeholder="placeholderValue">
    `
}