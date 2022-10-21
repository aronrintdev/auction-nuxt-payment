<template>
  <div
    class="feature-card-hoverableV2 d-flex align-items-center flex-column justify-content-center"
    :class="`feature-card-hoverableV2-${variant}`"
  >
    <img
      :src="
        icon || require(`~/assets/img/features/newest-feature/buying/auth.png`)
      "
    />
    <div class="feature-title fs-24 fw-6 font-primary">{{ title }}</div>
    <div
      v-if="description || title2"
      class="feature-description text-center fs-16 fw-6 font-primary"
    >
      {{ description }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureCardHoverableV2',

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

.feature-card-hoverableV2
  border-radius: 24px
  box-shadow: 0 1px 4px 0 rgba($color-black-1, 0.25)
  padding: 22px
  color: $color-black-1
  transition: transform .2s
  height: 361px !important
  width: 361px !important

  cursor: help

  &.feature-card-hoverableV2-round
    border-radius: 50%
    max-width: 280px
    min-height: 280px
    width: 280px
    height: 280px
    padding: 0

  &:hover
    transform: scale(1.2)


  .feature-title
    @include heading-1
    font-weight: $medium
    color: $color-black-5
    margin-top: 38px

  .feature-description
    @include body-4-regular
    line-height: 26px
    margin-top: 22px

@media (max-width: 768px)
  .feature-card-hoverableV2
    min-width: 163px !important
    padding: 15px !important
    height: auto !important
    background: transparent !important
    box-shadow: none !important
    max-width: 240px
    &:hover
        transform: scale(1)
    img
      width: 56px
      height: 47px


    .feature-title
        counter-increment: css-counter 1
        font-size: 16px
        margin-top: 9px
        &::before
            content: counter(css-counter) ". "
    .feature-description
      font-size: 12px
      line-height: 20px
      margin-top: 7px
</style>
