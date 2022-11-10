<template>
  <div class="custom-selectbox" :tabindex="tabindex" @blur="open = false">
    <div
      class="selected bg-white"
      :class="{ open: open }"
      @click="open = !open"
    >
      <span
        :class="updateFilters.length ? 'text-dark' : 'text-muted'"
        >{{ title }}</span
      >
    </div>
    <div class="items bg-white" :class="{ selectHide: !open }">
      <div class="item-wrapper">
        <div v-for="(option, key) in options" :key="key" class="p-0" @click="checked(option)">
          <div class="p-3 d-flex">
            <b-form-checkbox
              v-if="option.value"
              class="border-0 p-0 ml-4 text-normal"
              :value="option.value"
              :checked="getVal(option)"
              @change="checked(option)"
            />
            {{ option.text }}
          </div>
        </div>
      </div>
      <div class="filter-select-count p-3 text-center">
        <span class="text-white"
          >{{ $tc('common.filter', 1) }} ({{ updateFilters.length }})
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectWithCheckbox',
  props: {
    title: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    updateFilters: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      open: false,
      status: '',
    }
  },

  methods: {
    // Update the checked filter values
    checked(option) {
      const arr = this.updateFilters
      if (arr.includes(option)) {
        arr.splice(arr.indexOf(option), 1)
      } else {
        arr.push(option)
      }
      this.$emit('filters', { array: this.updateFilters, value: option.value })
    },

    removeItem(arr, value) {
      return arr.filter((i) => i.value !== value)
    },

    getVal(option) {
      if (this.updateFilters.includes(option)) {
        return option.value
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.custom-selectbox
  position: relative
  width: 100%
  text-align: left
  outline: none
  height: 42px
  line-height: 47px
  border: 1px solid $white-2
  border-radius: 0.25rem

  .selected
    @include body-4-normal
    color: $color-black-1
    padding: 12px 16px
    cursor: pointer
    user-select: none
    font-style: normal
    line-height: 18px
    background-color: $color-white-5
    height: 40px
    letter-spacing: 0em
    text-align: left
    box-shadow: none
    width: 100%
    border-radius: 5px

    label
      background-color: $color-white-5

    &.open
      border: 1px solid transparent
      border-radius: 6px 6px 0px 0px

      &:after
        top: 5px
        content: url(../../assets/img/icons/arrow-up-black.svg)

    &:after
      position: absolute
      content: url(../../assets/img/icons/arrow-down-black.svg)
      top: 5px
      right: 30px
      width: 0
      height: 0
      border: 6px solid transparent


    @media screen and (max-width: 576px)
      width: 84%

    @media screen and (min-device-width: 567px) and (max-device-width: 640px)
      width: 84%

    @media screen and (min-device-width: 360px) and (max-device-width: 640px)
      width: 86%

  .items
    color: $color-white-1
    border-radius: 0px 0px 6px 6px
    overflow: scroll //for scroll
    max-height: 400px  //for scroll
    border-right: 1px solid transparent
    border-left: 1px solid transparent
    border-bottom: 1px solid transparent
    position: absolute
    left: 0
    right: 0
    top: 100%
    background-color: $color-white-5
    z-index: 99

    div
      @include body-4-normal
      color: $color-black-1
      border: 1px solid transparent
      border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent
      cursor: pointer
      user-select: none
      font-style: normal

      &:hover
        background-color: rgba(0, 0, 0, 0.1)

  .selectHide
    display: none

  .customselect-checkbox input
    margin-top: 0
    margin-left: 0
    position: inherit

  .filter-select-count
    background: $color-blue-2
@media screen and (min-device-width: 768px) and (max-device-width: 1024px)
  .custom-selectbox
    .selected
      font-size: 13px
</style>
