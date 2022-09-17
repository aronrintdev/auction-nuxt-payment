<template>
  <div>
    <div class="text-center pt-5 my-4 heading-4-bold">{{ $t('promotions.what_it_feels_like_to_win') }}</div>
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
export default {
  name: 'PromotionsVideoCarousel',
};
</script>
