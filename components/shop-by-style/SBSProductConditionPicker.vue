<template>
  <div class="container px-sm-0 mt-4 w-100 mw-100 mx-0">
    <div class="box-condition-text text-center text-md-left">
      {{ $t('products.box_condition') }}

      <b-img
        :src="require('~/assets/img/icons/info-dark-blue.svg')"
        class="ml-1"
        @click="openConditionInfo"
      />
    </div>

    <div class="box-condition-btns d-none d-sm-flex justify-content-between">
      <b-button
        v-for="(c, index) in conditions"
        :key="`box-condition-${index}`"
        variant="link"
        :class="{ active: (condition && condition.id) === c.id }"
        class="m-0 condition px-md-0 px-lg-0 px-xl-0"
        @click="handleConditionSelect(c)"
      >
        {{ $t(`products.box_conditions.${getUnderscoreCased(c.name)}`) }}
      </b-button>
    </div>

    <div class="dropdown-wrapper d-sm-none">
      <CustomDropdown
        v-model="condition"
        :label="
          condition
            ? $t(
                `products.box_conditions.${getUnderscoreCased(condition.name)}`
              )
            : ''
        "
        :options="conditionsOptions"
        type="single-select"
        optionsWidth="custom"
        dropDownHeight="38px"
        variant="white"
        paddingX="14px"
        :inputStyle="{
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid black',
        }"
        :dropdownStyle="{
          border: '1px solid #000',
          borderTop: 0,
          zIndex: 9999,
        }"
        :optionsStyle="{
          fontWeight: '500',
          fontSize: '14px',
          color: '#667799',
          borderBottom: '1px solid #000',
        }"
        labelStyle="font-family: Montserrat; font-style: normal; font-weight: 500; font-size: 14px; color: #667799;"
        arrowStyle="color: #667799; width: 14px; height: 16px; position: absolute; right: 15px; top: -3px;"
        @change="handleConditionSelect"
      />
    </div>
    <!-- bottom sheet for all sizes  -->
    <MobileBottomSheet
      :height="'35%'"
      :open="isOpen"
      :headerStyle="{ display: 'none !important' }"
      @closed="closed"
    >
      <div class="font-sf-pro">
        <div class="header">
          <div>{{ $t('products.box_condition') }}</div>
        </div>
        <div class="mt-4 d-flex bx-condition">
          <b-img
            :src="require('~/assets/img/icons/info-dark-blue.svg')"
            class="info-img"
          />
          <p class="w-100 fw-4 fs-13">
            {{ $t('shop_by_style.box_condition_detail') }}
          </p>
        </div>
      </div>
    </MobileBottomSheet>
  </div>
</template>
<script>
import { convertToUnderscoreCase } from '~/utils/string'
import CustomDropdown from '~/components/common/CustomDropdown'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'

export default {
  name: 'ProductBoxConditionPicker',

  components: {
    CustomDropdown,
    MobileBottomSheet,
  },

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

  data() {
    return {
      isOpen: false,
      condition: this.conditions.find((c) => c.id === this.value),
      conditionsOptions: this.conditions.map((item) => ({
        text: item.name,
        value: item.id,
      })),
    }
  },

  methods: {
    handleConditionSelect(value) {
      if (!value.id) {
        value = this.conditions.find((c) => c.id === value)
      }
      this.condition = value
      this.$emit('change', value)
    },

    getUnderscoreCased(value) {
      return convertToUnderscoreCase(value)
    },

    openConditionInfo() {
      this.isOpen = true
    },
    closed() {
      this.isOpen = false
      this.$emit('closed')
    },
  },
}
</script>
<style lang="sass" scoped>
  @import '~/assets/css/_variables'

.info-img
    width: 12px
    margin-left: 35px
.font-sf-pro
  font-family: $font-family-sf-pro-display

.label
  @include body-5-medium
  color: $color-gray-5

.value
  @include body-5-regular
  color: $color-black-1

.header
  @include body-17-medium
  color: $color-black-1
  text-align: center
  border-bottom: 0.5px solid $color-gray-47
  padding-bottom: 22px
  ::v-deep.custom-tooltip
    .tooltip-inner
      background: $white
      color: $black
      border-radius: 16px
      border: 1px solid $color-gray-23
      border-bottom: none
      box-shadow: 0 4px 14px $color-gray-23

    .arrow::before
      border-top-color: $white

  .container
    width: auto
    margin-left: -7.5px
    margin-right: -7.5px

    .box-condition-text
      @include body-5-medium
      @media (min-width: 576px)
        @include body-8-normal
        color: $color-black-1
        text-transform: uppercase
        padding: 0
        margin: 2px 0 0
        position: relative

      img
        width: 13px
        height: 13px
        margin-top: -5px
        cursor: help

    .box-condition-btns
      margin-top: 12px

      .btn
        @include body-8-normal
        color: $color-gray-23
        margin-right: 6px

        &:first-child
          padding-left: 0
          margin-left: 0

        &.active
          color: $color-black-1

  .dropdown-wrapper
    padding: 15px 30px 0 30px
.bx-condition
  align-items: baseline
  gap: .6875rem
  p
      color: $color-black-18
</style>
