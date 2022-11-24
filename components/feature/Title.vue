<template>
  <h3
    class="title text-center text-md-left text-uppercase mt-5 mt-sm-0 mb-6 d-flex justify-content-center align-items-center justify-content-md-start"
  >
    <div class="title-before d-md-none d-block"></div>
    <slot></slot>
    <div class="title-after d-md-none d-block"></div>
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
  gap: 34px
  .title-before, .title-after
    width: 61px
    background-color: $color-black-1
    height: 1px
    max-width: 61px
    min-width: 35px


@media (max-width: 768px)
  .title
    font-size: 16px !important
    font-weight: 600 !important
    font-size: 16px !important
    margin: 20px 0px 20px 0px !important
    width: 272px
    margin: 20px auto !important
    line-height: 22px !important
</style>
