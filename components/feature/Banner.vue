<template>
  <div class="banner-wrapper">
    <div class="title-container">
      <h1 v-html="title"></h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureBanner',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.banner-wrapper
  background-image: url('~/assets/img/features/banner.png')
  width: 100%
  height: 407px
  background-color: $color-purple-7
  background-position: center
  background-size: cover
  position: relative
  padding: 46px 59px

  @media (max-width: 552px)
    padding: 40px 35px

  .title-container
    background-color: rgba($color-white-1, 0.56)
    padding: 24px 40px
    max-width: 399px
    min-height: 212px
    backdrop-filter: blur(24px)

    h1
      @include heading-5
      color: $color-black-1
      font-weight: $bold
      line-height: 120%

    p
      @include body-4-regular
      color: $color-black-1
</style>
