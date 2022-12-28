<template>
  <div class="features_cards_wrapper">
    <div
      class="feature-card d-flex align-items-start flex-column mb-0 cursor-pointer"
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
          :src="imgSmUrl || require('~/assets/img/features/default.png')"
          width="100%"
          height="auto"
          class="d-block d-sm-none mobile-devices-image"
        />
      </div>

      <h6 class="feature-title text-black font-primary mb-0 fs-24 fw-5">
        {{ $t(title) }}
      </h6>
      <p
        class="feature-description text-black font-primary fs-14 fw-5 mb-0 d-none d-sm-block"
      >
        {{ $t(description) }}
      </p>
    </div>
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
    imgSmUrl: {
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
  max-height: 445px
  height: auto !important
  h6.feature-title
    margin-top: 17px
  .feature-description
    margin-top: 10px
  .feature-image
    width: 294px
    height: 294px
@media screen and (max-width: 577px)
  .feature-card
    width: 163px
    height: 186px
    .feature-image
      width: 163px
      height: 163px
    h6.feature-title
      font-size: 15px
      font-weight: 400
      margin-top: 5px
</style>
