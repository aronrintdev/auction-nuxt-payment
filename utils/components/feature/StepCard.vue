<template>
  <div
    class="feature-step-card d-flex align-items-center position-relative"
    :class="`feature-step-card-${variant}`"
  >
    <div class="img-wrapper">
      <img :src="icon" />
    </div>

    <div>
      <div v-if="title" class="title">{{ title }}</div>
      <div v-if="description" class="mt-3 desc">{{ description }}</div>
    </div>

    <div v-if="step" class="position-absolute step-text">
      {{ step }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureStepCard',

  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      required: true,
    },
    step: {
      type: String,
      default: null,
    },
    variant: {
      type: String,
      default: 'normal', // 'large', 'normal'
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.feature-step-card
  padding: 52px 15px
  color: $color-black-1
  max-width: 567px
  min-height: 208px
  box-shadow: 0 1px 4px 0 rgba($color-black-1, 0.25)
  border-radius: 24px
  flex: 1 1 0px

  &.feature-step-card-large
    max-width: 450px
    min-height: 320px
    flex-direction: column
    padding-top: 96px

    .step-text
      @include body-1-bold
      top: 39px
      left: 40px
      color: $color-black-1

    .desc, .title
      margin-top: 15px

  .title
    @include body-1-medium

  .desc
    @include body-3-regular

  .step-text
    @include heading-4
    font-weight: $medium
    color: $color-gray-4
    left: 24px
    top: 10px

  .img-wrapper
    min-width: 180px
    text-align: center
</style>
