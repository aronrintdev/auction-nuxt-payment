<template>
  <div>

  <div

    class="style-card-wrapper position-relative user-select-none"
    @click="handleClick"
  >
    <img :src="imageUrl" class=""/>
    <div class="overlay position-absolute w-100 h-100"></div>
  </div>

  </div>
</template>
<script>
export default {
  name: 'ShopByStyleCard',

  props: {
    styleId: {
      type: [Number, String],
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleClick() {
      this.$router.push(`/shop-by-style/${this.styleId}`)
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.style-card-wrapper
  cursor: pointer

  &:hover
    .view-style
      display: block

  img
    width: 100%
    height: 372px
    object-fit: contain

  .overlay
    top: 0px
    left: 0px
    background: $color-black-1
    visibility: hidden
    opacity: 0
    transition: visibility 0s, opacity 0.5s ease

  .view-style
    @include body-4-regular
    left: 21px
    bottom: 24px
    color: $color-white-1
    display: none
    transform: rotateY(180deg)

    img
      width: 54px
      height: 40px
@media(max-width: 460px)
  .style-card-wrapper
    img
      width: 120px
      height: auto
</style>
