<template>

  <div class="style-image-carousel-wrapper">
    <client-only>
      <Carousel
        ref="carousel"
        :loop="true"
        :nav="false"
        :center="true"
        :margin="0"
        :items="1"
        :mouse-drag="false"
        :dots="false"
        class="carousel d-flex align-items-center"
        @changed="handleCarouselChanged"
      >

        <template #default>
          <div
            v-for="(image, index) in images"
            :key="`style-image-carousel-${index}`"
            :class="[mainImage ? 'style-image': '']"
          >
            <img :src="image" class="w-100" />
          </div>
        </template>

        <template #prev>
          <div class="owl-nav owl-prev">
            <img :src="require('~/assets/img/home/arrow-left.svg')" />
          </div>
        </template>

        <template #next>
          <div class="owl-nav owl-next">
            <img :src="require('~/assets/img/home/arrow-right.svg')" />
          </div>
        </template>
      </Carousel>
    </client-only>
  </div>
</template>
<script>
export default {
  name: 'ShopByStyleImageCarousel',

  props: {
    images: {
      type: Array,
      required: true,
    },
    mainImage: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      position: 1,
    }
  },

  methods: {
    handleCarouselChanged(event) {
      this.position = event.item.index - 1
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.style-image-carousel-wrapper
  .pages
    @include body-4-medium
    color: $color-gray-5

  .carousel::v-deep
    padding: 0 79px

    .owl-nav
      width: auto
      cursor: pointer

      [class*='owl-']
        background: none

      &.owl-next
        float: right
        margin-right: -79px !important

      &.owl-prev
        float: left
        margin-left: -79px !important
@media(min-width: 576px)
  .style-image
    width: 305px
    margin-left: 240px
</style>
