<template>
  <div
    class="custom-selectbox"
    :class="{ open: open, 'border-bottom': !bordered }"
    :tabindex="tabindex"
    @blur="open = false"
  >
    <div
      class="selected bg-white"
      :class="[open ? 'open' : '', bordered ? 'border' : '', inputClass]"
      @click="open = !open"
    >
      <label class="bg-white mr-2"
        ><img v-if="threelineIcon" src="~/assets/img/icons/feature.png"
      /></label>
      <span>{{ options[selected] }}</span>
    </div>
    <div 
      class="items bg-white" 
      :class="[
        !open ? 'selectHide' : '', 
        bordered ? 'border' : '', 
        dropdownClass
      ]"
    >
      <template v-for="(option, key) of options">
        <div v-if="key && !(key==='default' && selected==='default')" :key="key" @click="selectOption(key)">
          {{ option }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    bordered: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
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
    variant: {
      type: String,
      default: 'secondary',
    },
    threelineIcon: {
      type: Boolean,
      default: true
    },
    inputClass: {
      type: String,
      default: ''
    },
    dropdownClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : Object.keys(this.options).length > 0
          ? Object.keys(this.options)[0]
          : null,
      open: false,
    }
  },
  watch: {
    // Refreshing selected value
    default(newVal) {
      if (!newVal) {
        this.selected = ''
      }
    },
  },
  methods: {
    selectOption(key){
      this.selected = key
      this.open = false
      this.$emit('input', key)
    }
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
  
.custom-selectbox
  position: relative
  width: 100%
  text-align: left
  outline: none
  border-radius: 5px

  .selected
    color: $color-black-1
    padding: 12px 16px
    cursor: pointer
    user-select: none
    font-family: $font-montserrat
    font-size: 16px
    font-style: normal
    font-weight: $normal
    line-height: 20px
    height: 44px
    letter-spacing: 0em
    text-align: left
    box-shadow: none
    width: 100%
    background: $color-white-1
    border-radius: 5px
    label
      background-color: $color-white-5
    &.open
      border-color: transparent
      border-radius: 5px 5px 0px 0px
      &:after
        top: 8px
        content: url(../../assets/img/icons/arrow-up-black.svg)
    &:after
      position: absolute
      content: url(../../assets/img/icons/arrow-down-black.svg)
      top: 8px
      right: 30px
      width: 0
      height: 0
      border: 6px solid transparent
    @media screen and (max-width: 576px)
      width: 84%
    @media screen and (min-device-width: 567px) and (max-device-width: 640px)
      width: 84%
    @media screen and (min-device-width: 360px) and (max-device-width: 640px)
      width: 86% !important
  .selected-primary
    color: $color-black-1
    padding: 12px 16px
    cursor: pointer
    user-select: none
    font-family: $font-montserrat
    font-size: 16px
    font-style: normal
    font-weight: $normal
    line-height: 20px
    height: 44px
    letter-spacing: 0em
    text-align: left
    box-shadow: none
    width: 100%
    background: $color-white-1
    border-radius: 5px
    label
      background-color: $color-white-5
    &.open
      border: 1px solid transparent
      border-radius: 6px 6px 0px 0px
      &:after
        border-color: transparent transparent $color-black-1 transparent
        top: 12px
    &:after
      position: absolute
      content: ''
      top: 22px
      top: 18px
      right: 1em
      right: 10px
      width: 0
      height: 0
      border: 6px solid transparent
      border-color: $color-black-1 transparent transparent transparent
    @media screen and (max-width: 576px)
      width: 84%
    @media screen and (min-device-width: 567px) and (max-device-width: 640px)
      width: 84%
    @media screen and (min-device-width: 360px) and (max-device-width: 640px)
      width: 86% !important
  .selected-secondary
    color: $color-black-1
    padding: 12px 16px
    cursor: pointer
    user-select: none
    font-family: $font-montserrat
    font-size: 16px
    font-style: normal
    font-weight: $normal
    line-height: 20px
    height: 44px
    letter-spacing: 0em
    text-align: left
    box-shadow: none
    width: 100%
    background: $color-white-5
    label
      background-color: $color-white-5
    &.open
      border: 1px solid transparent
      border-radius: 6px 6px 0px 0px
      &:after
        border-color: transparent transparent $color-black-1 transparent
        top: 12px
    &:after
      position: absolute
      content: ""
      top: 22px
      top: 18px
      right: 1em
      right: 10px
      width: 0
      height: 0
      border: 6px solid transparent
      border-color: $color-black-1 transparent transparent transparent
    @media screen and (min-device-width: 768px) and (max-device-width: 1024px)
      width: 79% !important
    @media screen and (max-width: 576px)
      width: 84%
    @media screen and (min-device-width: 567px) and (max-device-width: 640px)
      width: 84%
    @media screen and (min-device-width: 360px) and (max-device-width: 640px)
      width: 86% !important
    @media screen and (min-device-width: 768px) and (max-device-width: 1024px)
      width: 78% !important
  .items
    color: $color-white-1
    border-radius: 0px 0px 6px 6px
    overflow: hidden
    border-right: 1px solid transparent
    border-left: 1px solid transparent
    border-bottom: 1px solid transparent
    position: absolute
    left: 0
    right: 0
    top: 100%
    background-color: $color-white-5
    z-index: 99
    overflow-y: auto
    height: auto

    div
      color: $color-black-1
      padding: 12px 16px
      border: 1px solid transparent
      border-color: transparent transparent $color-black-14 transparent
      cursor: pointer
      user-select: none
      font-family: $font-montserrat
      font-size: 16px
      font-style: normal
      font-weight: $normal
      line-height: 20px
      &:hover
        background-color: $color-black-14
  .items-primary
    color: $color-white-1
    border-radius: 0px 0px 6px 6px
    overflow: hidden
    border-right: 1px solid transparent
    border-left: 1px solid transparent
    border-bottom: 1px solid transparent
    position: absolute
    left: 0
    right: 0
    top: 100%
    z-index: 99
    overflow-y: auto
    max-height: 400px
    div
      color: $color-black-1
      padding: 12px 16px
      border: 1px solid transparent
      border-color: transparent transparent $color-black-14 transparent
      cursor: pointer
      user-select: none
      font-family: $font-montserrat
      font-size: 16px
      font-style: normal
      font-weight: $normal
      line-height: 20px
      &:hover
        background-color: $color-black-14
  .items-secondary
    color: $color-white-1
    border-radius: 0px 0px 6px 6px
    overflow: hidden
    border-right: 1px solid transparent
    border-left: 1px solid transparent
    border-bottom: 1px solid transparent
    position: absolute
    left: 0
    right: 0
    top: 100%
    z-index: 99
    div
      color: $color-black-1
      padding: 12px 16px
      border: 1px solid transparent
      border-color: transparent transparent $color-black-14 transparent
      cursor: pointer
      user-select: none
      font-family: $font-montserrat
      font-size: 16px
      font-style: normal
      font-weight: $normal
      line-height: 20px
      &:hover
        background-color: $color-white-1
  .selectHide
    display: none
  .items-primary
    background: $color-white-1
  .items-secondary
    background: $color-white-5

.custom-selectbox
  .purchase-input
    width: 100% !important
    height: 38px

</style>

<style lang="sass" scoped>
@media screen and (min-device-width: 768px) and (max-device-width: 1024px)
  .custom-selectbox
    .selected
      font-size: 13px
</style>
