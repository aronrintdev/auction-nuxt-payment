<template>
  <div class="meter-wrapper d-flex flex-column justify-content-center align-items-center">
    <div class="text-fair">{{$t(heading).toUpperCase()}} <sup><img :src="require('~/assets/img/trades/info-icon.svg')"></sup></div>
    <div class="meter mx-auto mt-1 user-select-none">
      <div class="label-excellent d-flex justify-content-center align-items-center">{{ $t('common.excellent') }}</div>
    </div>
  </div>
</template>
<script>
const START = -4
const MID = 110
const END = 226
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
  },

  computed: {
    // Calculate the position of pointer.
    pointerPos() {
      if (this.value === null) return null
      const pos =
        this.getPosition(this.lowest, this.fair, this.value, START, MID) || // value is between lowest and fair
        this.getPosition(this.fair, this.highest, this.value, MID, END) || // value is between fair and highest
        this.getPosition(this.lowest, this.highest, this.value, START, END) || // value is between lowest and highest
        MID // if nothing worked, we assumes it's MID (fair price)
      return pos
    },
  },

  methods: {
    getPosition(lowValue, highValue, value, startPos, endPos) {
      // if any of values is null, returns null;
      if (lowValue === null || highValue === null || value === null) {
        return null
      }
      // if value is not between lowValue and highValue, returns null;
      if (value > highValue || value < lowValue) {
        return null
      }

      // returns the position based on where value is placed between lowValue and highValue
      return (
        startPos +
        ((highValue - value) / (value - lowValue)) * (endPos - startPos)
      )
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

  .meter
    background: linear-gradient(90deg, $color-yellow-8 0%, $color-green-24 63.02%)
    border: 0.5px solid $color-gray-23
    box-shadow: inset 0 2px 3px $color-gray-84
    width: 249px
    height: 24px
    position: relative

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

</style>
