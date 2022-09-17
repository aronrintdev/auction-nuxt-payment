<template>
  <div class="form-checkbox-group-wrapper">
    <b-form-group :label="label" class="form-group">
      <b-form-checkbox-group
        :value="value"
        :options="options"
        :stacked="stacked"
        @input="handleInput"
      ></b-form-checkbox-group>
    </b-form-group>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    handleInput(value) {
      this.$emit('input', value)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.form-checkbox-group-wrapper
  font-family: SF Pro Display

  .form-group::v-deep
    margin: 0
    position: relative

    > legend.col-form-label
      @include body-4-bold
      color: $color-black-1
      margin: 0 0 21px 0
      padding: 0

    .custom-checkbox
      margin: 0 16px 21px 0
      min-height: auto
      height: 20px
      padding: 0 0 0 32px

      &.custom-control-inline
        margin-right: 32px

      & > *
        cursor: pointer !important

      > input.custom-control-input
        border: none
        box-shadow: none
        opacity: 1
        height: 20px
        -webkit-appearance: none

        &::after
          content: ' '
          background-color: $color-gray-3
          position: absolute
          left: 0
          top: 50%
          width: 16px
          height: 16px
          transform: translateY(-8px)
          border-radius: 2px

        &:checked
          &::after
            background-color: $color-blue-2
            border-color: $color-blue-2
            box-shadow: none

      > label.custom-control-label
        @include body-4-normal
        color: $color-black-1

        &::before
          content: none

        &::after
          content: none

  ::-webkit-scrollbar
    width: 4px !important

  ::-webkit-scrollbar-thumb
    border: none !important
</style>
