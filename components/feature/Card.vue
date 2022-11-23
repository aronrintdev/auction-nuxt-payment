<template>
  <div
    class="feature-card d-flex flex-column align-items-md-baseline"
    @click="handleCardClick"
  >
    <img :src="imageUrl" class="w-100 d-md-block d-none" />
    <img :src="resImageUrl" class="w-100 d-md-none d-block" />
    <div class="feature-title fs-24 fw-5 font-primary">{{ title }}</div>
    <div class="feature-description fs-18 fw-4 font-primary">
      {{ description }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'FeatureCard',

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      required: true,
    },
    resImageUrl: {
      type: String,
      required: true,
    },

    to: {
      type: String,
      default: null,
    },
  },

  methods: {
    handleCardClick() {
      if (this.to) {
        this.$router.push(this.to)
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.feature-card
  color: $color-black-1
  cursor: pointer
  width: 100%

  .feature-title
    margin-top: 38px

  .feature-description
    margin-top: 13px
    line-height: 29px

@media (max-width: 768px)
  .feature-card ::v-deep
    .feature-title
      font-size: 16px
      font-weight: 600
      font-family: 'Montserrat'
      margin-top: 7px
      max-width: 343px
    .feature-description
      font-size: 14px
      font-weight: 400
      font-family: 'Montserrat'
      line-height: 22px
      margin: 8px 0px 0px 0px !important
      max-width: 343px
</style>
