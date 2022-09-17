<template>
  <b-dropdown
      :id="id"
      class="multi-select-dropdown"
      menu-class="w-100"
      @hidden="shown = false"
      @shown="shown = true"
  >
    <template #button-content>
      <slot name="button-content">
        <div class="d-flex align-items-center justify-content-between mx-2">
          {{ label }}
          <img :class="{'reverse': shown}" :src="arrowDownBlack">
        </div>
      </slot>
    </template>
    <slot></slot>
  </b-dropdown>
</template>

<script>
import arrowDownBlack from '~/assets/img/icons/arrow-down-black.svg'

export default {
  name: 'WhiteDropDown',
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      shown: false,
      arrowDownBlack
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.multi-select-dropdown::v-deep
  .dropdown-menu
    border: none
    box-shadow: none
    margin-top: -0.5px
    border-radius: 0 0 8px 8px

  button
    border-radius: 8px
    height: 44px
    @include body-13
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $normal
    color: $color-black-1
    background-color: $color-white-1
    border: none
    min-width: 230px

    &:after
      display: none

    &.dropdown-toggle
      background-color: $color-white-1
      border: none
      color: $color-black-1
      border-bottom-right-radius: 0
      border-bottom-left-radius: 0

  .reverse
    transform: rotate(180deg)

</style>