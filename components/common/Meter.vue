<template>
  <div class="meter-wrapper d-flex flex-column justify-content-center align-items-center">
    <div class="text-fair" :class="headingClass">{{$t(heading).toUpperCase()}} <sup><img :src="require('~/assets/img/trades/info-icon.svg')"></sup></div>
    <div class="meter mx-auto mt-1 user-select-none" :class="{'empty-meter': pointerPos == null}">
      <div v-if="pointerPos === fairVal" class="d-flex justify-content-center align-items-center"  :class="{'fair-meter' : pointerPos === fairVal}">{{ $t('common.fair') }}</div>
      <div v-else-if="pointerPos === poorVal" class="d-flex justify-content-center align-items-center" :class="{'poor-meter': pointerPos === poorVal }">{{ $t('common.poor') }}</div>
      <div v-else-if="pointerPos === execellent" class="label-excellent d-flex justify-content-center align-items-center" :class="{'excellent-meter': pointerPos === execellent}">{{ $t('common.excellent') }}</div>
    </div>
  </div>
</template>
<script>
import {FILTER_CONDITION_EXCELLENT, FILTER_CONDITION_FAIR, FILTER_CONDITION_POOR} from '~/static/constants/trades';

export default {
  name: 'Meter',

  props: {
    value: {
      type: Number,
      default: null,
    },
    lowest: {
      type: Number,
      default: null,
    },
    highest: {
      type: Number,
      default: null,
    },
    fair: {
      type: Number,
      default: null,
    },
    heading: {
      type: String,
      default:  'common.fair',
    },
    headingClass: {
      type: String,
      default: ''
    }
  },
  data(){
    return{
      execellent: FILTER_CONDITION_EXCELLENT,
      fairVal: FILTER_CONDITION_FAIR,
      poorVal: FILTER_CONDITION_POOR
    }
  },
  computed: {
    // Calculate the position of pointer.
    pointerPos() {
      if (this.value === null) return null
      if(this.value >= this.highest){
        return this.execellent
      }
      else if(this.value >= this.fair ){
        return this.fairVal
      }
      else if(this.value === 0){
        return null
      }
      else{
        return this.poorVal
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.meter-wrapper
  text-align: center
  width: 336px
  height: 92px
  background: $color-white-4
  .text-fair
    @include body-8-normal
    font-family: $font-family-montserrat
    font-style: normal
    color: $color-black-1

  .my-header
    @include body-10-normal
    width: 183px
    text-align: left
    display: flex
    align-items: center
    justify-content: space-between
    padding-right: 15px
    margin-bottom: 4px

  .meter
    border: 0.5px solid $color-gray-23
    box-shadow: inset 0 2px 3px $color-gray-85
    width: 249px
    height: 24px
    position: relative
    @media (max-width: 320px)
      width: 183px

    .label-poor, .label-excellent
      font-family: $font-family-sf-pro-display
      font-style: normal
      @include body-8-bold
      letter-spacing: 0.02em
      color: $color-white-1
      height: 24px

@media (max-width: 320px)
  .meter-wrapper
    .meter
      width: 180px
      .overlay
        width: 90px

.owl-carousel .owl-item img::v-deep
  width: unset
.excellent-meter
  background: linear-gradient(90deg, $color-yellow-8 0%, $color-green-27 63.02%)
.fair-meter
  background: linear-gradient(90deg, $color-orange-24 0%, $color-yellow-11 100%, $color-yellow-12 100%)
  box-shadow: inset 0 2px 3px $color-gray-92
  height: 24px
  width: 139px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-8-bold
.poor-meter
  background: linear-gradient(90deg, $color-red-31 0%, $color-yellow-13 100%)
  box-shadow: inset 0px 2px 3px $color-gray-92
  width: 99px
  height: 24px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-8-bold
.empty-meter
  background: $color-white-5
  box-shadow: inset 0px 2px 3px $color-gray-92

</style>
