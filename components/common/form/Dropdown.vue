<template>
  <div class="form-dropdown-wrapper">
    <div v-if="label" class="input-label ml-2">
      {{ label }}{{ required ? '*' : '' }}
    </div>
    <div
      :id="`dropdown-container-${id}`"
      :class="`${label && 'mt-2'} position-relative`"
    >
      <Button
        :id="`btn-dropdown-${id}`"
        variant="link"
        :class="`d-flex justify-content-between btn-dropdown ${
          dropdownShow && 'opened'
        } ${value !== null && 'active'}`"
        block
      >
        <img v-if="icon && !value" :src="icon" class="mr-2 icon-main" />
        <div
          :class="`${
            !noArrow && 'mr-2'
          } flex-grow-1 fw-5 font-secondary text-${labelAlignmet}`"
        >
          {{ buttonLabel }}
        </div>
        <Icon
          v-if="value && canClear"
          :src="iconClear"
          :hoverSrc="iconClearHover"
          class="icon-clear"
          tabindex="-1"
          @click="handleClearClick"
        />
        <img v-else-if="!noArrow" :src="iconArrowDown" class="icon-arrow" />
      </Button>

      <b-popover
        ref="popover"
        :target="`btn-dropdown-${id}`"
        triggers="focus"
        placement="bottom"
        :container="`dropdown-container-${id}`"
        :custom-class="`search-results`"
        :show.sync="dropdownShow"
        :delay="0"
        :boundary-padding="0"
      >
        <div class="dropdown_wrapper">
          <slot name="body">
            <div
              v-for="item in filteredItems"
              :key="`dropdown-item-${item.value}`"
              :class="`dropdownItem d-flex align-items-center ${
                item.value === value && 'active'
              }`"
              @click="onSelect(item)"
            >
              {{ item.label }}
            </div>
          </slot>
        </div>
      </b-popover>
    </div>
  </div>
</template>
<script>
import { Button, Icon } from '~/components/common'
export default {
  name: 'FormDropdown',
  components: { Button, Icon },
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: null,
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
    valueFiltered: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    iconArrowDown: {
      type: String,
      default: require('~/assets/img/icons/arrow-down-gray.svg'),
    },
    noArrow: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconClear: {
      type: String,
      default: require('~/assets/img/icons/close-gray.svg'),
    },
    iconClearHover: {
      type: String,
      default: require('~/assets/img/icons/close.svg'),
    },
    canClear: {
      type: Boolean,
      default: false,
    },
    labelAlignmet: {
      type: String,
      default: 'left',
    },
  },

  data() {
    return {
      dropdownShow: false,
    }
  },

  computed: {
    buttonLabel() {
      if (this.value === null) {
        return this.placeholder
      } else {
        return this.items.find((i) => i.value === this.value)?.label
      }
    },
    filteredItems() {
      return this.valueFiltered
        ? this.items.filter((a) => a.value !== this.value)
        : this.items
    },
  },
  methods: {
    onSelect(item) {
      if (item) {
        this.$emit('select', item)
        this.$emit('input', item.value)
        this.dropdownShow = false
      }
    },
    hideDropdown() {
      this.dropdownShow = false
    },
    handleClearClick(event) {
      event.preventDefault()
      this.$emit('select', null)
      this.$emit('input', null)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.form-dropdown-wrapper
  .input-label
    @include body-3-regular
    color: $color-black-1
  .btn-dropdown
    @include body-4-regular
    background-color: $color-white-1
    border: 1px solid $color-gray-4
    border-radius: 20px
    color: $color-gray-4
    padding: 0 14px
    height: 32px
    .icon-arrow
      transition: transform 0.2s ease-in-out
    &.opened
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
      .icon-arrow
        transform: rotate(-180deg)
    &.active
      color: $color-black-1
  .icon-clear
    position: absolute
    right: 10px

.search-results::v-deep
  background-color: transparent
  width: 100%
  max-width: 100%
  margin: 0
  margin-left: 1px
  border: none
  box-shadow: none
  .arrow
    display: none
  .popover-body
    padding: 0
    border-radius: 5px
    overflow: hidden
    .dropdown_wrapper
      max-height: 272px
      overflow: clip
      padding: 0 20px
      background-color: $color-white-4
    .dropdownItem
      font-weight: $regular
      font-size: 16px
      font-family: $font-sp-pro
      color: $color-gray-5
      border-radius: 0
      padding: 0 14px
      height: 32px
      border-top: 1px solid $color-gray-23
      background-color: $color-white-1
      cursor: pointer
      margin: 0 -20px
      &.active
        color: $color-black-1
      &:hover
        color: $color-black-1
      &:last-child
        border-bottom-left-radius: 20px
        border-bottom-right-radius: 20px
</style>
