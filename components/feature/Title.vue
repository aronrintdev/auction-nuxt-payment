<template>
  <h3
    class="title text-center text-md-left text-uppercase mb-6 d-flex justify-content-center align-items-center justify-content-md-start"
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
  gap: 10px
  .title-before, .title-after
    width: 100%
    background-color: $color-black-1
    height: 1px
    max-width: 55px
    min-width: 35px
  .title-before
    margin-right: 20px
  .title-after
    margin-left: 20px


@media (max-width: 768px)
  h3.title::v-deep
    font-size: 16px
    font-weight: 600
    width: 100%
    margin: 28px auto 30px auto
    line-height: 22px
</style>
