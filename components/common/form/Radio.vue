<template>
  <div class="d-flex align-items-center deadstock-radio">
    <label
      :for="`radio-${uniqueKey}-${val}`"
      class="font-secondary fw-5 fs-14 text-dark mb-0 d-flex align-items-center w-100"
      :class="{ radioButton: button }"
    >
      <input
        :id="`radio-${uniqueKey}-${val}`"
        type="radio"
        class="mr-2"
        :checked="isChecked"
        :value="val"
        :name="name"
        :style="`--accent-color: ${color}`"
        @change="handleInput"
      />
      <div class="radio-title text-capitalize">
        {{ label }}
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'Radio',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    label: {
      type: String,
      default: null,
    },
    modelValue: {
      type: String,
      default: '',
    },
    val: {
      type: String,
      default: undefined,
    },
    name: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: '#000',
    },
    button: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uniqueKey: null,
    }
  },
  computed: {
    isChecked() {
      return this.modelValue === this.val
    },
  },
  mounted() {
    this.uniqueKey = Math.random().toString(36).substring(2)
  },
  methods: {
    handleInput(value) {
      this.$emit('change', value.target.value)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
input[type="radio"]
  width: 15px
  height: 15px
  accent-color: var(--accent-color)
.radioButton
  .radio-title
    border: 1px solid $color-gray-4
    padding: 14px 0
    border-radius: 3px
    color: $color-gray-4
    font-size: 14px
    font-weight: 500
    text-align: center
    width: 100%
  input
    display: none
    &:checked~.radio-title
      background: $color-gray-21
      border: 1px solid $color-black-1
      color: $color-black-1
</style>
