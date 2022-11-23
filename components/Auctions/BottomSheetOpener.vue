<template>
  <div class="auction-bottom-sheet-opener">
    <div class="d-flex align-items-center justify-content-between auction-bottom-sheet-opener-btn" @click="openBottomFilter">
      {{ title }}
      <img src="~/assets/img/icons/down-arrow.svg" />
    </div>
    <vue-bottom-sheet ref="auctionFiltersSheet">
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ title }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <slot></slot>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
/*
 * Auction Bottom Sheet
 */
export default {
  name: 'AuctionBottomSheetOpener',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    openBottomFilter() {
      this.$refs.auctionFiltersSheet.open();
    },
  }
}
</script>

<style lang="sass" scoped>
  @import '~/assets/css/_typography'
  @import '~/assets/css/_variables'
    
  .auction-bottom-sheet-opener
    &-btn
      @include body-5
      box-shadow: 0px -0.1px 2px rgba($black, 0.15), 0px 1px 2px rgba($black, 0.15)
      border-radius: 8px
      font-weight: $medium
      padding: 20px
      img
        width: 18px

  .filters-sheet
    label
      @include body-5
      font-family: $font-sp-pro
      font-weight: $normal
      color: $color-black-9
      margin-bottom: 15px
      &:last-child
        margin-bottom: 0
    &-title
      @include body-17
      font-family: $font-sp-pro
      font-weight: $bold
      letter-spacing: -0.02em
      color: $black
      border-bottom: 0.5px solid $color-gray-4
      padding-bottom: 18px
    &-content
      padding: 20px 20px 0
</style>