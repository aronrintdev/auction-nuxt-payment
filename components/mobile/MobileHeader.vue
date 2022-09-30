<template>
  <div :class="{
          'bottom-border': hasBottomBorder
       }"
       class="mobile-header d-flex flex-column w-100 px-4">
    <div class="header-content d-flex align-items-center justify-content-between">
      <div role="button" @click="$emit('back')">
        <back-svg/>
      </div>
      <div class="title flex-grow-1 d-flex justify-content-around">
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <div class="actions">
        <slot name="actions">
        </slot>
      </div>
    </div>

    <slot name="expanded-content">

    </slot>
  </div>
</template>

<script>
import backSvg from '~/assets/img/icons/back.svg?inline'

export default {
  name: 'MobileHeader',
  components: {backSvg},
  props: {
    title: {
      type: String,
      required: true
    },
    hasBottomBorder: {
      type: Boolean,
      default: true
    },
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.mobile-header
  background-color: $color-white-1

  &.bottom-border
    border-bottom: 0.5px solid $color-gray-23

.header-content
  height: 46px

.title
  @include body-3
  font-family: $font-montserrat
  font-style: normal
  font-weight: $bold
  color: $color-black-1
</style>
