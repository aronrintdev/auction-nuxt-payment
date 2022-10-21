<template>
  <div
    class="feature-card-hoverable-round d-flex align-items-center flex-column justify-content-center"
    :class="`feature-card-hoverable-round-${variant}`"
  >
    <img
      :src="
        icon || require(`~/assets/img/features/newest-feature/buying/auth.png`)
      "
    />
    <div class="feature-title fs-24 fw-6 font-primary">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'FeatureCardHoverableRound',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      required: true,
    },
    iconWidth: {
      type: String,
      required: true,
    },

    variant: {
      type: String,
      default: 'normal', // 'normal', 'round'
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.feature-card-hoverable-round
  border-radius: 50%
  max-width: 280px !important
  max-height: 280px !important
  min-width: 94px !important
  min-height: 94px !important
  width: 280px
  height: 280px
  padding: 0
  box-shadow: 0 1px 4px 0 rgba($color-black-1, 0.25)

.feature-card-hoverable-round
  img
   width: 94px

  &:hover
    transform: scale(1.1)

  .feature-title
    @include heading-1
    font-weight: $medium
    color: $color-black-5
    margin-top: 38px
@media (max-width: 1000px)
  .feature-card-hoverable-round
    width: 160px
    height: 160px
    img
      width: 60px
      height: 60px
    .feature-title
      font-size: 18px
      margin-top: 10px

@media (max-width: 768px)
  .feature-card-hoverable-round
    width: 94px
    height: 94px
    padding: 10px !important
    img
      width: 40px
      height: 40px
    .feature-title
      font-size: 12px
      margin-top: 0px !important
</style>
