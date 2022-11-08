<template>
  <div
    :id="`search-input-${id}`"
    class="h-100"
    :class="`search-input-wrapper ${
      pill && 'search-pill'
    } search-${size} search-${variant} ${bordered && 'bordered'} ${
      searchResultShow && $slots.default && 'opened'
    }`"
  >
    <div :id="styles">
      <img
        :src="require('~/assets/img/icons/search.svg')"
        class="icon-search"
      />

      <b-form-input
        :id="`search-textbox-${id}`"
        ref="searchInput"
        type="text"
        :value="value"
        placeholder="Search"
        :debounce="debounce"
        autocomplete="off"
        class="search-input"
        :style="{ height: inputHeight }"
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
import debounce from 'lodash.debounce'
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
    styles: {
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
      this.showSearchResult(value)
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

    showSearchResult: debounce(function (value) {
      this.$emit('search', value)
    }, 300),
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.search-input
    width: 303px
    background: $color-white-5
    border-radius: 8px
    padding-left: 2.2rem
.icon-search
  position: absolute
  margin-top: 9px
  margin-left: 10px

</style>
