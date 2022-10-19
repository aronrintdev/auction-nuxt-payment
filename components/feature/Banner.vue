<template>
  <div
    class="banner-wrapper w-100 d-flex justify-content-sm-start align-items-sm-start"
    :style="`--image: url(${backgroundImage}); --imageSm: url(${backgroundImageSm})`"
  >
    <div class="feature-title-container mt-5 ml-5 d-none d-sm-block">
      <h1
        class="font-primary fs-40 fw-7 text-capitalize text-black"
        v-html="$t(title)"
      ></h1>
      <p class="font-primary fs-16 fw-4 text-black">{{ $t(description) }}</p>
    </div>
    <div
      v-if="$route.path != '/features'"
      class="d-flex align-items-end justify-content-start ml-3 custom-margin-bottom"
    >
      <div
        class="feature-title-mobile d-flex align-items-center justify-content-center d-sm-none font-ternary fs-22 fw-7 text-center text-uppercase w-100"
      >
        {{ $t(title) }}
      </div>
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
    backgroundImage: {
      type: String,
      required: true,
    },
    backgroundImageSm: {
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
    background-image: var(--imageSm)
    width: 375px
    height: 180px

  .feature-title-container
    background-color: rgba($color-white-1, 0.56)
    padding: 24px 40px
    width: 399px
    height: 212px
    backdrop-filter: blur(12px)
    --webkit-backdrop-filter: blur(12px)
    --moz-backdrop-filter: blur(12px)
    h1
      letter-spacing: -0.02em
    p
      letter-spacing: -0.02em

@media screen and (max-width: 577px)
  .banner-wrapper
    .custom-margin-bottom
      margin-bottom: 2.2rem
      .feature-title-mobile
        background-color: rgba(171, 171, 171, 0.6)
        padding: 0px 9px
        max-width: 270px
        height: 45px
        max-height: 103px
        line-height: 29px
        letter-spacing: -0.08em
        color: $color-white-1
</style>
