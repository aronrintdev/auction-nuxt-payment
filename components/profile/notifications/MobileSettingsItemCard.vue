<template>
  <div class="mobile-card w-100 p-3">
    <div class="title">
      {{ title }}
    </div>
    <div v-if="description" class="desc mt-2">
      {{ description }}
    </div>
    <slot name="body">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'MobileSettingsItemCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: [String, null],
      default: null
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.mobile-card
  border: 1px solid $color-gray-23
  background: $color-white-1
  box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
  border-radius: 10px

  .title
    @include body-13
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $medium
    color: $color-black-1

  .desc
    @include body-13
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $regular
    color: $color-gray-5

</style>
