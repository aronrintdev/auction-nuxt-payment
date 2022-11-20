<template>
  <div
    class="feature-card-hoverable d-flex align-items-center flex-column justify-content-center position-relative mb-80"
    :class="`feature-card-hoverable-${variant}`"
  >
    <slot>
      <img
        :src="
          icon ||
          require(`~/assets/img/features/newest-feature/buying/auth.png`)
        "
      />
      <div class="feature-title fs-24 fw-6 font-primary">{{ title }}</div>
      <div
        v-if="description"
        class="feature-description text-center fs-16 fw-6 font-primary"
      >
        {{ description
        }}<span class="feature-title d-md-none d-block">{{ title2 }}</span>
      </div>
      <div v-if="step" class="position-absolute step-text d-md-block d-none">
        {{ step }}
      </div></slot
    >
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
    title2: {
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
    step: {
      type: String,
      default: null,
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
  height: 376px !important
  width: 376px !important

  background-color: $color-white-1
  &:hover
    cursor: pointer
    transform: scale(1.1)

  .step-text
    @include heading-1
    font-weight: $medium
    color: $color-black-1
    left: 40px
    top: 39px


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
  .feature-card-hoverable
    min-width: 163px !important
    padding: 10px !important
    height: auto !important

    img
      width: 56px
      height: 47px
    &:hover
      transform: scale(1)


    .feature-title
      font-size: $font-size-12
      margin-top: 9px
    .feature-description
      font-size: $font-size-12
      line-height: 20px
      margin-top: 7px
</style>
