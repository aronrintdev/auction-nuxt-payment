<template>
  <div
    class="feature-card d-flex flex-column text-lg-left text-center align-items-center"
    @click="handleCardClick"
  >
    <img
      :src="imageUrl || require('~/assets/img/features/default.png')"
      class="w-100"
    />
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
      default: null,
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
      margin-top: 22px
      max-width: 272px
    .feature-description
      font-size: 14px
      font-weight: 400
      font-family: 'Montserrat'
      line-height: 22px
      margin: 8px 0px 40px 0px !important
      max-width: 272px
</style>
