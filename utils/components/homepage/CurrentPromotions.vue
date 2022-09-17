<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.current_promotions')"
      :description="$t('home.current_promotions_desc')"
      :button-label="$t('home.view_more_promotions')"
      :button-target="'/promotions'"
      class="section-header"
    />
    <div class="text-promo">{{ $t('home.promo_text') }}</div>
    <div class="section-carousel">
      <client-only>
        <Carousel
          :loop="true"
          :nav="false"
          :center="true"
          :margin="10"
          :responsive="{
            0: { items: 1, nav: false, center: true },
          }"
          :mouse-drag="false"
          :dots="true"
          :autoplay="true"
          :autoplay-timeout="3000"
          class="carousel"
        >
          <template #default>
            <b-img :src="require('~/assets/img/home/promo-car.png')" />
          </template>
        </Carousel>
      </client-only>
    </div>
  </div>
</template>
<script>
import HomeSectionHeader from '~/components/homepage/section/Header.vue'

export default {
  name: 'HomeCurrentPromotions',

  components: { HomeSectionHeader },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.section-wrapper
  padding: 0

  .section-header
    margin-top: 70px

  .text-promo
    @include body-1-medium
    color: $color-orange-4
    margin-top: 95px
    text-align: center
    text-transform: uppercase
    letter-spacing: 0.26rem

  .section-carousel
    margin-top: 40px
    max-width: 756px
    margin-left: auto
    margin-right: auto
</style>
