<template>
  <div
    v-if="options && options.length"
    v-click-outside="hideMenu"
    class="position-relative border-0 accordion-filter-item"
    :class="{ 'collapsed': !menuVisible }"
    :style="{ width: `${width}px` }"
  >
    <div class="d-flex align-center justify-between m-0 accordion-filter-header">
      <div role="button" class="position-relative d-flex align-items-center p-0 w-100 border-0 background-transparent accordion-filter-button" @click="menuVisible = !menuVisible">
        {{ title }}
      </div>
    </div>

    <div v-show="menuVisible" class="position-absolute m-0 w-100 accordion-filter-body">
      <div class="mr-2">
        <div v-for="(item, index) in options" :key="index" class="form-check">
          <input
            :id="`${title}-flexCheckDefault-${index}`"
            :checked="value && value.includes(item.value)"
            class="form-check-input"
            type="checkbox"
            @click="updateFilter(item.value)"
          />
          <label
            :for="`${title}-flexCheckDefault-${index}`"
            class="form-check-label"
          >
            {{ capitalizeFirstLetter(item.label) }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'MultiSelectDropdown',
  directives: {
    ClickOutside
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    width: {
      type: [Number, String],
      default: null,
    }
  },
  data: () => {
    return {
      menuVisible: false,
    }
  },
  mounted() {
    if (this.value && this.value.length > 0) {
      this.$root.$emit('bv::toggle::collapse', `collapse-${this.collapseKey}`)
    }
  },

  methods: {
    capitalizeFirstLetter(string) {
      return string[0].toUpperCase() + string.slice(1)
    },

    updateFilter(value) {
      if (this.value?.includes(value)) {
        this.$emit('input', this.removeItem(this.value, value))
      } else if (this.value) {
        this.$emit('input', [...this.value, value])
      } else {
        this.$emit('input', [value])
      }
    },

    removeItem(arr, value) {
      return arr?.filter((i) => i !== value)
    },

    hideMenu() {
      this.menuVisible = false
    }
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.accordion-filter-item
  background: $color-white-5
  border-radius: 8px
  padding: 12px 14px 12px 20px
  width: max-content

  &:not(.collapsed)
    border-bottom-left-radius: 0
    border-bottom-right-radius: 0

    .accordion-filter-button
      &::after
        transform: rotate(-180deg)

  .accordion-filter-button
    @include body-4-normal
    font-family: $font-sp-pro
    color: $color-black-1
    overflow-anchor: none
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease

    @media (prefers-reduced-motion: reduce)
      transition: none

    &::after
      flex-shrink: 0
      width: 20px
      height: 20px
      margin-left: auto
      content: ''
      background-image: url('~/assets/img/icons/arrow-down-black.svg')
      background-repeat: no-repeat
      background-size: 20px
      transition: transform 0.2s ease-in-out
      transform: rotate(0deg)

    @media (prefers-reduced-motion: reduce)
      &::after
        transition: none

    &:hover
      z-index: 2

    &:focus
      z-index: 3
      border-color: $color-blue-14
      outline: 0
      box-shadow: 0 0 0 0.25rem $color-blue-15

    &:focus
      box-shadow: none

  .accordion-filter-body
    position: absolute
    z-index: 1000
    left: 0
    top: 100%
    background: $color-white-5
    border-bottom-left-radius: 8px
    border-bottom-right-radius: 8px
    padding-bottom: 10px

    & > div
      max-height: 150px
      overflow: auto
      scroll-behavior: smooth
      padding-left: 20px
      padding-right: 8px

    .form-check
      margin-bottom: 7px

      & > *
        cursor: pointer !important

      .form-check-input
        border: none
        box-shadow: none

        &::after
          content: ' '
          background-color: $color-white-1
          position: absolute
          left: 0
          top: 50%
          width: 16px
          height: 16px
          transform: translateY(-7px)
          border-radius: 2px

        &:checked
          &::after
            background-color: $color-blue-20
            border-color: $color-blue-20
            background-image: url('~/assets/img/icons/checkmark-thick.svg')
            background-repeat: no-repeat
            background-size: 10px
            box-shadow: none
            background-position: center

      label
        @include body-5-normal
        text-align: left
        color: $color-gray-41
        padding-left: 6px
        width: 100%

  ::-webkit-scrollbar
    width: 6px !important

  ::-webkit-scrollbar-thumb
    background-color: $color-blue-2
    border: none !important

  ::-webkit-scrollbar-track
    background-color: $color-gray-3
</style>
