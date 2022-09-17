<template>
  <div class="d-flex align-items-center benefit-item-wrapper">
    <div class="img-wrapper">
      <img :src="icon" />
    </div>
    <div class="text-wrapper">
      <div class="heading">
        {{ heading }}
      </div>
      <div class="helper-text">
        {{ description }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureBenefitItem',

  props: {
    icon: {
      type: String,
      required: true,
    },
    heading: {
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
.heading
  width: 100%
.benefit-item-wrapper
  .img-wrapper
    min-width: 160px
    text-align: center
    margin-right: 79px

  .text-wrapper
    color: $color-black-1

    .heading
      @include heading-7
      font-weight: $bold

    .helper-text
      @include body-3-regular
      margin-top: 22px
</style>
