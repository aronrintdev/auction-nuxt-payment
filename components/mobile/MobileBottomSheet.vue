<template>
  <vue-bottom-sheet
    ref="myBottomSheet"
    :is-full-screen="true"
    class="mobile-bottom-sheet"
    max-height="60%"
    @closed="$emit('closed')"
    @opened="$emit('opened')"
  >
    <div class="header-title w-100 d-flex flex-column align-items-center justify-content-center">
      <span v-if="!showCancel">{{ title }}</span>

      <div v-if="showCancel" class="w-100 d-flex justify-content-between">
        <span class="ml-3">{{ title }}</span>
        <span
          class="header-title-bottom-sheet-cancel mr-3"
          role="button"
          @click="$emit('closed')"
        >{{ $t('common.cancel') }}</span>
      </div>
    </div>
    <slot></slot>
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
    title: {
      type: String,
      required: true,
    },
    showCancel: {
      type: Boolean,
      default: false,
    },
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
  border-bottom: 0.5px solid $color-gray-4
.mobile-bottom-sheet::v-deep
  .header-title-bottom-sheet-cancel
    height: 20px
    top: 573px
    font-family: $font-sp-pro
    font-style: normal
    @include body-17-medium
    color: $color-blue-20
</style>
