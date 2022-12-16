<template>
  <vue-bottom-sheet
      ref="myBottomSheet"
      :is-full-screen="true"
      :max-height="height"
      :rounded="isRounded"
      :overlay="hasOverlay"
      :swipe-able="swipeable"
      class="mobile-bottom-sheet"
      @closed="$emit('closed')"
      @opened="$emit('opened')"
  >
    <div
      :style="headerStyle"
      :class="hasHeaderDivider && 'divider'"
      class="header-title w-100 d-flex flex-column align-items-center justify-content-center"
    >
      <span>{{ title }}</span>
      <slot name="subtitle"></slot>
    </div>
    <slot>

    </slot>
  </vue-bottom-sheet>
</template>

<script>
export default {
  name: 'MobileBottomSheet',
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    isRounded: {
      type: Boolean,
      default: true,
    },
    swipeable: {
      type: Boolean,
      default: true,
    },
    hasOverlay: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '60%'
    },
    headerStyle: {
      type: Object,
      default: () => {}
    },
    hasHeaderDivider: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    open(val) {
      if (val)
        this.$refs.myBottomSheet.open();
      else
        this.$refs.myBottomSheet.close();
    }
  },
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

::v-deep.mobile-bottom-sheet
  .bottom-sheet__card
    .bottom-sheet__content
      overflow-y: auto

    .bottom-sheet__pan
      height: 30px

.header-title
  @include body-17
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $bold
  letter-spacing: -0.02em
  color: $color-black-1
  padding-bottom: 17px

  &.divider
    border-bottom: 0.5px solid $color-gray-4

</style>
