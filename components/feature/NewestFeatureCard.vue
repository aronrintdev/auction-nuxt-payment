<template>
  <div
    class="feature-card d-flex align-items-start flex-column mb-0 mb-sm-5"
    @click="handleCardClick"
  >
    <div class="feature-image">
      <img
        :src="imageUrl || require('~/assets/img/features/default.png')"
        width="100%"
        height="auto"
        class="d-none d-sm-block large-devices-image"
      />
      <img
        :src="responsiveImage || require('~/assets/img/features/default.png')"
        width="100%"
        height="auto"
        class="d-block d-sm-none mobile-devices-image"
      />
    </div>

    <h6 class="feature-title text-black font-primary fs-24 fw-5 mt-2 mb-0">
      {{ title }}
    </h6>
    <p
      class="feature-description text-black font-primary fs-14 fw-5 mt-1 mb-0 d-none d-sm-block"
    >
      {{ description }}
    </p>
  </div>
</template>
<script>
export default {
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
    responsiveImage: {
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
  width: 294px
  height: 445px
  .feature-image
    width: 294px
    height: 294px
@media screen and (max-width: 426px)
  .feature-card
    width: 163px
    height: 270px
    .feature-image
      width: 163px
      height: 209px
    h6.feature-title
      font-size: 15px
      font-weight: 400
</style>
