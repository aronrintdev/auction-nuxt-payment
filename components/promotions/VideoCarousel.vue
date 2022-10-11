<template>
  <div>
    <div class="text-center pt-2 my-3 heading-4-bold">
      <span v-if="!isScreenXS">{{ $t('promotions.what_it_feels_like_to_win') }}</span>
      <span v-else class="header-text">{{ $t('promotions.past_winner') }}</span>
    </div>
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
</template>
<script>
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'PromotionsVideoCarousel',
  mixins: [screenSize]
};
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.header-text
  @include body-17
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-black-1
</style>
