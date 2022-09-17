<template>
  <div class="container">
    <div class="box-condition-text">
      {{ $t('products.box_condition') }}

      <b-img
        v-b-tooltip.hover
        :src="require('~/assets/img/icons/info-dark-blue.svg')"
        :title="$t('products.message.box_condition_info')"
      />
    </div>

    <div class="box-condition-btns">
      <b-button
        v-for="(condition, index) in conditions"
        :key="`box-condition-${index}`"
        variant="link"
        :class="{ active: value === condition.id }"
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
    text-decoration: underline
    padding: 0
    margin: 0
    margin-top: 24px
    text-align: center
    position: relative

    img
      width: 10px
      height: 10px
      margin-top: -15px
      cursor: help

  .box-condition-btns
    margin-top: 8px
    text-align: center

    .btn
      @include body-8-medium
      color: $color-gray-23
      margin-right: 6px

      &.active
        color: $color-black-1
</style>
