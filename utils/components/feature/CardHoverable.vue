<template>
  <div
    class="feature-card-hoverable d-flex align-items-center flex-column justify-content-center"
    :class="`feature-card-hoverable-${variant}`"
  >
    <img :src="icon" />
    <div class="feature-title">{{ title }}</div>
    <div v-if="description" class="feature-description text-center">
      {{ description }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureCardHoverable',

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
    variant: {
      type: String,
      default: 'normal', // 'normal', 'round'
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.feature-card-hoverable
  border-radius: 24px
  box-shadow: 0 1px 4px 0 rgba($color-black-1, 0.25)
  padding: 22px
  color: $color-black-1
  transition: transform .2s
  min-height: 404px
  max-width: 404px
  flex: 1 1 0px
  cursor: help

  &.feature-card-hoverable-round
    border-radius: 50%
    max-width: 280px
    min-height: 280px
    width: 280px
    height: 280px
    padding: 0

  &:hover
    transform: scale(1.1)

  &:not(:last-of-type)
    margin-right: 40px

  .feature-title
    @include heading-1
    font-weight: $medium
    color: $color-black-5
    margin-top: 30px

  .feature-description
    @include body-4-regular
    line-height: 26px
    margin-top: 22px
</style>
