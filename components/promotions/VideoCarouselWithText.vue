<template>
  <div class="what-feels-like-to-be-winner my-5 p-5 d-flex">
    <div class="text-col">
      <div class="heading-4-bold mb-4">{{ $t('promotions.what_it_feels_like_to_be_winner') }}</div>
      <div class="body-4-regular">{{ $t('promotions.what_it_feels_like_to_be_winner_content') }}</div>
    </div>
    <div class="flex-grow-1 overflow-hidden">
      <carousel
          ref="carousel"
          :center="true"
          :dots="false"
          :items="1"
          :loop="true"
          :margin="30"
          :mouse-drag="false"
          :nav="false"
          class="carousel video-carousel slide-fade"
      >
        <template #default>
          <div>
            <video controls height="auto" width="100%">
              <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4">
            </video>
          </div>
          <div>
            <video controls height="auto" width="100%">
              <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4">
            </video>
          </div>
          <div>
            <video controls height="auto" width="100%">
              <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" type="video/mp4">
            </video>
          </div>
        </template>
        <template #prev>
          <div class="owl-nav owl-prev" role="button">
            <img :src="require('~/assets/img/icons/arrow-left-gray.svg')"/>
          </div>
        </template>

        <template #next>
          <div class="owl-nav owl-next" role="button">
            <img :src="require('~/assets/img/icons/arrow-right-gray.svg')"/>
          </div>
        </template>
      </carousel>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PromotionsVideoCarouselWithText',
};
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.what-feels-like-to-be-winner
  background: $color-ui-light

  .text-col
    width: 320px
    min-width: 320px
    margin-right: 120px

    .heading-4-bold
      line-height: 44px

    .body-4-regular
      line-height: 150%

  .video-carousel
    width: 100%

    .owl-nav
      position: absolute
      top: 50%
      z-index: 100
      transform: translateY(-50%)

      img
        width: 40px

      &.owl-next
        right: 0

      &.owl-prev
        left: 0
</style>
