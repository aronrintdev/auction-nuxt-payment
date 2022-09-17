<template>
  <div class="section-wrapper">
    <HomeSectionHeader
      :title="$t('home.newest_features')"
      :description="$t('home.newest_features_desc')"
      :button-label="$t('home.view_more_features')"
      :button-target="'/features'"
      class="section-header"
    />
    <div class="section-cards">
      <b-row>
        <b-col md="4" class="feature-card">
          <b-img :src="require('~/assets/img/home/in-app-games.png')" />
          <div>{{ $t('home.heatcheck') }}</div>
        </b-col>
        <b-col md="4" class="feature-card">
          <b-img :src="require('~/assets/img/home/release-calendar.png')" />
          <div>{{ $t('home.unboxing_game') }}</div>
        </b-col>
        <b-col md="4" class="feature-card">
          <b-img :src="require('~/assets/img/home/ambassador-hub.png')" />
          <div>{{ $t('home.payment_plans') }}</div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import HomeSectionHeader from '~/components/homepage/section/Header.vue'

export default {
  name: 'HomeNewestFeatures',

  components: { HomeSectionHeader },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.section-wrapper
  padding: 0

  .section-header
    margin-top: 70px

  .section-cards
    max-width: 1145px
    margin-left: auto
    margin-right: auto

    .row
      margin-left: -25px
      margin-right: -25px

      .feature-card
        margin-top: 40px
        padding: 0 25px

        img
          width: 100%

        >div
          @include body-3-medium
          color: $color-black-1
          padding: 17px
          text-align: center
          background-color: $color-white-5
</style>
