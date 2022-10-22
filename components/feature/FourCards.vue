<template>
  <div
    class="feature-four-cards d-flex align-items-center flex-column justify-content-center"
    :class="`feature-four-cards-${variant}`"
  >
    <img
      :src="
        icon || require(`~/assets/img/features/newest-feature/buying/auth.png`)
      "
    />
    <div class="feature-title fs-24 fw-6 font-primary">{{ title }}</div>
    <div
      v-if="description"
      class="feature-description text-center fs-16 fw-6 font-primary"
    >
      {{ description }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureFourCards',

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
.feature-four-cards
    border-radius: 24px
    box-shadow: 0 1px 4px 0 rgba($color-black-1, 0.25)
    padding: 22px
    color: $color-black-1
    transition: transform .2s
    height: 300px !important
    width: 228px !important
    cursor: help
    min-height: 300px
    background-color: white

    &:hover
        transform: scale(1.1)


    .feature-title
        @include heading-1
        font-weight: $medium
        color: $color-black-5
        margin-top: 38px

    .feature-description
        @include body-4-regular
        line-height: 26px
        margin-top: 22px

@media (max-width: 1000px)
    .feature-four-cards
        width: 180px !important


@media (max-width: 768px)
    .feature-four-cards
        min-width: 168px !important
        padding: 10px !important
        height: 168px !important
        width: 231px !important

        img
            width: 56px
            height: 47px
        &:hover
            transform: scale(1)


        .feature-title
            font-size: 12px
            margin-top: 9px
        .feature-description
            font-size: 12px
            line-height: 20px
            margin-top: 7px
</style>
