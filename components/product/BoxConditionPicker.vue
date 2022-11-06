<template>
  <div class="container">
    <div class="box-condition-text d-flex align-items-center">
      <span >{{ $t('products.box_condition') }}</span>

      <b-img
        v-b-tooltip.hover
        :src="require('~/assets/img/icons/info-dark-blue.svg')"
        :title="$t('products.message.box_condition_info')"
      />
    </div>

    <div class="box-condition-btns d-flex justify-content-between">
      <b-button
        v-for="(condition, index) in conditions"
        :key="`box-condition-${index}`"
        variant="link"
        :class="{ 'active': value === condition[valueField] }"
        @click="handleConditionSelect(condition)"
      >
        {{
          $t(`products.box_conditions.${getUnderscoreCased(condition[labelField])}`)
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
    valueField: {
      type: String,
      default: 'id'
    },
    labelField: {
      type: String,
      default: 'name'
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
      margin-left: 5px
      width: 13px
      height: 13px
      cursor: help

  .box-condition-btns
    margin-top: 8px

    .btn
      @include body-8-normal
      color: $color-gray-23

      &:first-child
        padding-left: 0
        margin-left: 0

      &.active
        color: $color-black-1
</style>
