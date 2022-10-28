<template>
  <h3 class="title text-uppercase text-center text-md-left mt-5 mt-sm-0 mb-6">
    <slot></slot>
  </h3>
</template>
<script>
export default {
  name: 'FeatureTitle',
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

h3.title
  @include heading-7
  color: $color-black-5

@media (max-width: 768px)
  .title
    font-size: 16px !important
    font-weight: 600 !important
    font-size: 16px !important
    margin: 20px 0px 20px 0px !important
</style>
