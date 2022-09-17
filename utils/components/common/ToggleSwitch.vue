<template>
  <div class="checkbox-switch d-flex align-items-center">
    <span :class="{ active: value, label: true }">{{ value ? labelOn : labelOff }}</span>
    <b-form-checkbox
      :checked="value"
      name="check-button"
      switch
      size="lg"
      @input="toggle"
      @change="onChange"
    />
  </div>
</template>
<script>
export default {
  name: 'ToggleSwitch',

  props: {
    value: {
      type: Boolean,
      required: true,
    },
    labelOn: {
      type: String,
      default: '',
    },
    labelOff: {
      type: String,
      default: '',
    },
  },

  methods: {
    toggle() {
      this.$emit('input', !this.value)
    },

    onChange(checked) {
      this.$emit('change', checked)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'

.checkbox-switch span
    font-family: $font-family-montserrat
    font-style: normal
    font-weight: $normal
    font-size: 20px
    line-height: 24px

:deep(.custom-control-input:checked ~ .custom-control-label::before)
  color: $color-white-1
  border-color: $color-green-16
  background-color: $color-green-16
  box-shadow: none
</style>
