<template>
  <div
    class="feature-step-card d-flex flex-row align-items-center position-relative font-primary"
    :class="`feature-step-card-${variant}`"
  >
    <div class="img-wrapper">
      <img :src="icon" />
    </div>

    <div>
      <div v-if="title" class="title text-left">{{ title }}</div>
      <div v-if="description" class="mt-2 desc text-left">
        {{ description }}
      </div>
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
@media (max-width: 768px)
  .feature-step-card
    min-height: 138px
    padding: 22px 15px
    gap: 25px
    .img-wrapper
      min-width: 120px
      text-align: right !important
      img
        width: 60px
    .title
      font-size: 18px
      font-weight: 600
      line-height: 22px
    .desc
      font-size: 14px
      font-weight: 400
      line-height: 23px
</style>
