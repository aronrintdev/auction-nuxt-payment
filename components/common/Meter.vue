<template>
  <div class="meter-wrapper">
    <div v-if="heading" class="text-fair">{{ $t('common.fair').toUpperCase() }}</div>
    <div class="meter mx-auto mt-1 user-select-none">
      <img
        :src="require('~/assets/img/product/meter-bg-overlay.png')"
        class="overlay-meter"
      />
      <img
        v-if="value !== null"
        ref="pointer"
        :src="require('~/assets/img/product/meter-pointer.png')"
        class="pointer"
        :style="{ left: pointerPos + 'px' }"
      />
      <div class="label-poor">{{ $t('common.poor') }}</div>
      <div class="label-excellent">{{ $t('common.excellent') }}</div>
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
      type: Boolean,
      default: true,
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

  .text-fair
    @include body-3-bold

  .meter
    background-image: url('~/assets/img/product/meter-bg.png')
    background-size: 100% 100%
    background-repeat: no-repeat
    width: 233px
    height: 24px
    position: relative

    .overlay-meter
      position: absolute
      left: 0
      top: 0
      height: 24px
      width: 116px

    .pointer
      position: absolute
      top: 18px
      left: 110px

    .label-poor, .label-excellent
      @include body-9-bold
      color: $color-white-1
      position: absolute

    .label-poor
      left: 6px
      top: 4px

    .label-excellent
      right: 6px
      top: 4px
@media (max-width: 320px)
  .meter-wrapper
    .meter
      width: 180px
      .overlay
        width: 90px

.owl-carousel .owl-item img::v-deep
  width: unset

</style>
