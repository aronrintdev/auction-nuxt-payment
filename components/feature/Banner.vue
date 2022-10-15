<template>
  <div
    class="banner-wrapper w-100 d-flex align-items-center justify-content-center justify-content-sm-start align-items-sm-start"
  >
    <div class="feature-title-container mt-5 ml-5 d-none d-sm-block">
      <h1
        class="font-primary fs-40 fw-7 text-capitalize text-black"
        v-html="title"
      ></h1>
      <p class="font-primary fs-16 fw-4 text-black">{{ description }}</p>
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
  height: 440px
  background-image: url('~/assets/img/features/feature-banner.png')
  background-position: center
  background-size: cover
  background-repeat: no-repeat
  .feature-title-container
    background-color: rgba($color-white-1, 0.56)
    padding: 24px 40px
    width: 399px
    height: 212px
    backdrop-filter: blur(24px)
    -webkit-backdrop-filter: blur(24px)
    h1
      letter-spacing: -0.02em
    p
      letter-spacing: -0.02em

@media screen and (max-width: 426px)
  .banner-wrapper
    height: 208px
</style>
