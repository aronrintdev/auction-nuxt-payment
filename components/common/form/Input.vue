<template>
  <div class="form-input-wrapper">
    <div v-if="label" class="input-label" :class="labelClass">
      {{ label }}{{ required ? '*' : '' }}
    </div>
    <b-form-input
      :value="currentValue"
      :placeholder="placeholder"
      class="form-input "
      :disabled="disabled"
      :class="`${pill && 'rounded-pill'} ${bordered && 'bordered'} ${backgroundColor}`"
      :number="number && !prefix"
      @input="handleValueChange"
    ></b-form-input>
  </div>
</template>
<script>
export default {
  name: 'FormInput',

  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: null,
    },
    number: {
      type: Boolean,
      default: false,
    },
    integer: {
      type: Boolean,
      default: false,
    },
    maxFractionDigits: {
      type: Number,
      default: 2,
    },
    // To switch between rounded and normal border
    pill: {
      type: Boolean,
      default: true,
    },
    // To Change the border color
    bordered: {
      type: Boolean,
      default: true,
    },
    // To switch background color between white/ muted.
    backgroundColor: {
      type: String,
      default: 'bg-white',
    },
    labelClass: {
      type: String,
      default: 'ml-2',
    },
  },

  data() {
    return {
      currentValue: this.prefixedValue(this.value),
    }
  },

  watch: {
    value(newVal) {
      this.currentValue = this.prefixedValue(newVal)
    },
  },

  methods: {
    prefixedValue(value) {
      return (value === 0 || value) && this.prefix ? this.prefix + value : value
    },

    handleValueChange(value) {
      let res
      if (this.prefix && value.length > 1) {
        res = value.substr(this.prefix.length) || ''
      } else if (value === this.prefix) {
        res = ''
      } else {
        res = value
      }
      if (this.number) {
        // Allows '-' and '13.'
        // Disallows all other non numeric strings like 12a and convert it
        if (`${Number(res)}.` !== res && isNaN(res) && res !== '-') {
          res = Number(res) || 0
        }
        // if input has more fraction digits than maxFractionDigits we should cut off
        else if (res?.split('.')[1]?.length > this.maxFractionDigits) {
          res = Number(res).toFixed(this.maxFractionDigits)
        }
      }
      if (this.integer) {
        res = Math.ceil(Number(res) || 0)
      }
      this.currentValue = ''
      this.$nextTick(() => {
        this.currentValue = this.prefixedValue(res)
        this.$emit('input', res)
      })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.form-input-wrapper
  .input-label
    @include body-3-regular
    color: $color-black-1

  .form-input
    @include body-4-regular

    color: $color-black-1
    padding: 0 14px
    display: flex
    align-items: center
    height: 32px

    &.bordered
      border: 1px solid $color-gray-4

    &.background-muted
      background-color: $color-white-5

    &::-webkit-input-placeholder
      color: $color-gray-4

    &:-moz-placeholder
      color: $color-gray-4

    &::-moz-placeholder
      color: $color-gray-4

    &:-ms-input-placeholder
      color: $color-gray-4

    &::-ms-input-placeholder
      color: $color-gray-4

    &::placeholder
      color: $color-gray-4
    &.bg-white
      border: none
</style>
