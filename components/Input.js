export default {
    props: ['block', 'placeholderValue', 'modelValue'],
    emits: ['update:modelValue'],
    template: /* html */ `
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="block + '__input'"
        :placeholder="placeholderValue"
    >
    `
}