<template>
  <div class="container px-sm-0 mt-4">
    <div class="box-condition-text">
      {{ $t('products.box_condition') }}

      <b-img
        v-b-tooltip.hover
        :src="require('~/assets/img/icons/info-dark-blue.svg')"
        :title="$t('products.message.box_condition_info')"
        class="ml-1"
      />
    </div>

    <div class="box-condition-btns d-none d-sm-flex">
      <b-button
        v-for="(condition, index) in conditions"
        :key="`box-condition-${index}`"
        variant="link"
        :class="{ active: value === condition.id }"
        class="m-0 condition"
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
  margin-left: -7.5px
  margin-right: -7.5px

  .box-condition-text
    font-weight: 600
    font-size: 14px
    text-align: center
    @media (min-width: 576px)
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
    display: flex
    justify-content: space-between

    .btn
      font-size: 15px
      font-weight: 500
      color: $color-gray-23
      margin-right: 6px

      &:first-child
        padding-left: 0
        margin-left: 0

      &.active
        color: $color-black-1
</style>
