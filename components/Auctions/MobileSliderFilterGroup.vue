<template>
  <div class="filter-group">
    <div class="d-flex align-items-center justify-content-between filter-group-main" :class="{ 'collapsed': isCollapsed }" @click="toggleDetails" >
      <span class="filter-group-title">{{ title }}</span>
      <span v-if="labelVisible" class="flex-grow-1 text-right text-capitalize filter-group-values">{{ labelsOfSelected }}</span>
      <img src="~/assets/img/icons/arrow-down-black.svg" role="button"/>
    </div>
    <div v-if="!isCollapsed" class="d-flex flex-wrap justify-content-start filter-group-body">
      <vue-slider
        :key="`vue-slider-${name}`"
        :value="values"
        :drag-on-click="false"
        :enable-cross="false"
        :max="maxValue"
        :min="minValue"
        :min-range="step"
        tooltip="none"
        :height="6"
        :dotStyle="{ background: '#667799', border: '1px solid #F7F7F7' }"
        :railStyle="{ background: '#E8E8E8', borderRadius: '2px' }"
        :processStyle="{ background: '#667799' }"
        class="w-100 px-3 vue-slider-ltr-browse"
        @change="onSliderChange"
      ></vue-slider>
    </div>
  </div>
</template>

<script>
/*
 * Auction Mobile Filter Group
 */
export default {
  name: 'AuctionMobileSliderFilterGroup',
  props: {
    title: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 0,
    },
    step: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isCollapsed: true,
      values: [],
      labelVisible: false,
    }
  },
  computed: {
    labelsOfSelected() {
      return `$${this.values[0]} - $${this.values[1]}`
    }
  },
  mounted() {
    this.values = [this.minValue, this.maxValue]
  },
  methods: {
    toggleDetails() {
      this.isCollapsed = !this.isCollapsed
    },
    onSliderChange(value) {
      this.labelVisible = true
      this.values = value
      this.$emit('change', this.values)
    },
  }
}
</script>

<style lang="sass" scoped>
  @import '~/assets/css/_variables'

  .filter-group
    border-bottom: 1px solid $color-gray-62
    &-title
      font-weight: $medium
      font-size: 16px
      line-height: 19px
      color: $color-blue-20
      font-family: $font-sp-pro
    &-values
      margin-right: 20px
      font-weight: $normal
      font-size: 16px
      line-height: 19px
      font-family: $font-sp-pro
      color: $black
    &-main
      padding: 20px 0
      img
        width: 16px
        transition: transform 0.3s ease
      &.collapsed
        img
          transform: rotate(180deg)
    &-body
      margin: 0 -10px
      padding-bottom: 20px

</style>