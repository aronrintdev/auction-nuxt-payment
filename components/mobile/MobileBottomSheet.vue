<template>
  <vue-bottom-sheet
      ref="myBottomSheet"
      :is-full-screen="true"
      :max-height="height"
      class="mobile-bottom-sheet"
      @closed="$emit('closed')"
      @opened="$emit('opened')">
    <div :class="borderBottom && 'border-bottom'"
         class="header-title w-100 d-flex flex-column align-items-center justify-content-center">
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
      default: false
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '60%'
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
  methods: {}
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

  &.border-bottom
    border-bottom: 0.5px solid $color-gray-4

</style>
