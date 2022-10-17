<template>
  <div
    :id="`search-input-${id}`"
    :class="`search-input-wrapper ${
      pill && 'search-pill'
    } search-${size} search-${variant} ${bordered && 'bordered'} ${
      searchResultShow && $slots.default && 'opened'
    }`"
    :style="containerStyle"
  >
    <div class="position-relative w-100 d-flex align-items-center">
      <img
        :src="require('~/assets/img/icons/search.svg')"
        class="icon-search"
        :style="iconStyle"
      />

      <b-form-input
        :id="`search-textbox-${id}`"
        ref="searchInput"
        type="text"
        :value="value"
        :placeholder="placeholder || $t('common.search')"
        :debounce="debounce"
        autocomplete="off"
        :class="'search-input'"
        :style="{ height: this.inputHeight, ...this.inputStyle }"
        :autofocus="autofocus"
        @input="handleTextInput"
        @keydown.enter="handleEnterKeyDown"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <Icon
        v-if="value"
        src="close-gray.svg"
        hover-src="close.svg"
        width="15"
        height="15"
        class="btn-clear"
        @click="handleClearClick"
      />
    </div>

    <b-popover
      v-if="!pill"
      ref="popover"
      :target="`search-textbox-${id}`"
      triggers="focus"
      placement="bottom"
      :container="`search-input-${id}`"
      :custom-class="`search-results search-${size} search-${variant} ${
        bordered && 'bordered'
      }`"
      :show.sync="searchResultShow"
      :boundary-padding="0"
    >
      <!-- Need any dom element to show popover when slot is empty -->
      <span></span>
      <slot />
    </b-popover>
  </div>
</template>

<script>
import { Icon } from '~/components/common'

export default {
  name: 'SearchInput',

  components: { Icon },

  props: {
    id: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    debounce: {
      type: [Number, String],
      default: 300,
    },
    pill: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md', // 'lg', 'sm'
    },
    variant: {
      type: String,
      default: 'primary', // 'secondary', 'light'
    },
    bordered: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    inputHeight: {
      type: String,
      default: 'unset',
    },
    inputStyle: {
      type: Object,
      default: () => {}
    },
    iconStyle: {
      type: String,
      default: ''
    },
    containerStyle: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      searchResultShow: false,
    }
  },
  watch: {
    searchResultShow(newVal, oldVal) {
      if (newVal !== oldVal) {
        // Emit event to parent when search popover dropdown is toggled
        this.$emit('update:resultShow', newVal)
      }
    },
  },
  methods: {
    handleTextInput(value) {
      this.$emit('change', value)
      this.$emit('input', value)
      this.searchResultShow = !!value
    },

    handleEnterKeyDown(event) {
      if (event) event.preventDefault()
      this.$emit('enterKeydown')
    },

    handleClearClick() {
      this.handleTextInput('')
      this.$refs.searchInput.focus()
      this.$emit('clear')
    },

    handleFocus(e) {
      this.$emit('focus', e)
    },

    handleBlur(e) {
      this.$emit('blur', e)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.search-input-wrapper
  position: relative

  &.search-pill
    input.search-input
      border-radius: 40px !important

  &.search-lg
    input.search-input
      @include body-4-normal
      height: 60px
      border-radius: 10px

  &.search-md
    input.search-input
      @include body-4-regular
      height: 46px
      border-radius: 8px

  &.search-sm
    input.search-input
      @include body-5-regular
      height: 36px
      border-radius: 5px

  &.search-primary
    input.search-input
      background-color: $color-white-1

    &.bordered
      input.search-input
        border: 1px solid $color-gray-4

  &.show-results
    &.bordered
      input.search-input
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0

  &.search-secondary
    input.search-input
      background-color: $color-gray-3

  &.search-light
    input.search-input
      background-color: $color-white-5

  &.opened
    input.search-input
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0

  img.icon-search
    z-index: 1
    margin-left: 12px

  .btn-clear
    position: absolute
    z-index: 1
    right: 20px

  input.search-input
    width: 100%
    background-color: $color-gray-3
    color: $color-black-1
    padding-left: 44px
    margin-left: -33px

.search-results::v-deep
  background-color: transparent
  width: 100%
  max-width: 100%
  margin: 0
  border: none
  box-shadow: none

  .arrow
    display: none

  .popover-body
    padding: 0

    >div
      color: $color-black-1
      border-radius: 0
      padding: 0 20px

  &.search-sm
    .popover-body >div
      @include body-5-regular
      height: 36px

      &:last-child
        border-bottom-left-radius: 5px
        border-bottom-right-radius: 5px

  &.search-md
    .popover-body >div
      @include body-4-regular
      height: 46px

      &:last-child
        border-bottom-left-radius: 8px
        border-bottom-right-radius: 8px

  &.search-lg
    .popover-body >div
      @include body-4-normal
      height: 60px

      &:last-child
        border-bottom-left-radius: 10px
        border-bottom-right-radius: 10px

  &.search-primary
    .popover-body >div
      background-color: $color-white-1

    &.bordered
      .popover-body >div
        border-bottom: 1px solid $color-gray-4
        border-left: 1px solid $color-gray-4
        border-right: 1px solid $color-gray-4

  &.search-secondary
    .popover-body >div
      background-color: $color-gray-3
</style>
