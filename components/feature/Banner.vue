<template>
  <div
    class="banner-wrapper w-100 d-flex justify-content-sm-start align-items-sm-start"
    :style="`--image: url(${backgroundImage}); --imageXS: url(${backgroundImageXS})`"
  ></div>
</template>
<script>
export default {
  name: 'FeatureBanner',

  props: {
    backgroundImage: {
      type: String,
      required: true,
    },
    backgroundImageXS: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.banner-wrapper
  height: 440px
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  background-image: var(--image)
  @media (max-width: 577px)
    background-image: var(--imageXS)
    width: 375px
    height: 180px

@media screen and (max-width: 577px)
  .banner-wrapper
    .custom-margin-bottom
      margin-bottom: 2.2rem
</style>
