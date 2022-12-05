<template>
    <div class="container">
      <div class="box-condition-text">
        {{ $t('shop_by_style.package_condition') }}
  
        <b-img
          v-b-tooltip.hover="{variant: 'light'}"
          :src="require('~/assets/img/icons/info-dark-blue.svg')"
          :title="$t('shop_by_style.box_condition_info')"
        />
      </div>
  
      <div class="box-condition-btns">
        <b-button
          v-for="(condition, index) in conditions"
          :key="`box-condition-${index}`"
          variant="link"
          :class="{ active: value === condition.id }"
          class="pl-0"
          @click="handleConditionSelect(condition)"
        >
          {{
            $t(`products.box_conditions.${getUnderscoreCased(condition.name)}`)
          }}
        </b-button>
      </div>
    </div>
  </template>
  <script>
  import { convertToUnderscoreCase } from '~/utils/string'
  
  export default {
    name: 'ProductBoxConditionPicker',
  
    props: {
      value: {
        type: Number,
        default: null,
      },
      conditions: {
        type: Array,
        default: () => [],
      },
    },
  
    methods: {
      handleConditionSelect(value) {
        this.$emit('change', value)
      },
  
      getUnderscoreCased(value) {
        return convertToUnderscoreCase(value)
      },
    },
  }
  </script>
  <style lang="sass" scoped>
  @import '~/assets/css/_variables'
  
  .container
    width: auto
  
    .box-condition-text
      @include body-8-normal
      color: $color-black-1
      text-transform: uppercase
      padding: 0
      margin: 24px 0 0
      position: relative
  
      img
        width: 13px
        height: 13px
        margin-top: -5px
        cursor: help
  
    .box-condition-btns
      margin-top: 8px
  
      .btn
        @include body-8-normal
        color: $color-gray-23
        margin-right: 6px
        padding: 6px 6px
  
        &:first-child
          padding-left: 0
          margin-left: 0
  
        &.active
          color: $color-black-1
  </style>
  