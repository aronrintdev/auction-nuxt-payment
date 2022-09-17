<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.inapp_game.title')"
      :description="$t('features.inapp_game.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title text-uppercase">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/in-app-game/star.svg`)"
        :heading="$t('features.inapp_game.earn_points')"
        :description="$t('features.inapp_game.earn_points_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/in-app-game/prize.svg`)"
        :heading="$t('features.inapp_game.win_prizes')"
        :description="$t('features.inapp_game.win_prizes_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/in-app-game/share-friends.svg`)"
        :heading="$t('features.inapp_game.share')"
        :description="$t('features.inapp_game.share_desc')"
        class="feature-item"
      />

      <h3 class="title title-shop text-uppercase">
        {{ $t('features.inapp_game.play') }}
      </h3>

      <div class="d-flex align-items-center shop-section">
        <div class="d-flex flex-grow-1 align-items-center">
          <img
            :src="
              require('~/assets/img/features/in-app-game/remote-control.svg')
            "
            class="cart-img"
          />

          <div class="flex-grow-1">
            {{ $t('features.inapp_game.play_desc') }}
          </div>
        </div>

        <!-- todo: add url -->
        <Button to="#" variant="info" pill class="flex-shrink-0">{{
          $t('features.inapp_game.play_game')
        }}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from '~/components/common'
import FeatureBanner from '~/components/feature/Banner'
import FeatureBenefitItem from '~/components/feature/BenefitItem'
import FeatureBackButton from '~/components/feature/BackButton'

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    Button,
    FeatureBackButton,
  },

  layout: 'IndexLayout',
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.features-container
  .content
    padding: 80px 200px
    max-width: 1440px

    h3.title
      @include heading-7
      color: $color-black-5
      margin-bottom: 68px

      &.title-shop
        margin: 137px 0 49px 0

    .feature-item::v-deep
      margin-bottom: 115px

      .img-wrapper
        min-width: 217px

    .shop-section
      > div
        @include body-3-regular
        line-height: 29px
        padding: 0 80px 0 0
        color: $color-black-1

        > div
          min-width: 200px

          a
            color: $color-black-1
            text-decoration: underline

        img.cart-img
          margin-right: 86px

      button
        width: 190px

@media (max-width: 1200px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 900px)
  .features-container
    .content
      .shop-section
        flex-direction: column
        align-items: center

        > div
          align-items: center
          padding: 0

        button
          margin-top: 20px

@media (max-width: 576px)
  .features-container
    .content
      padding: 40px 30px

      .feature-item::v-deep
        flex-direction: column
        align-items: center

        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center

      .shop-section
        > div
          flex-direction: column
          align-items: center
          padding: 0

          img.cart-img
            margin: 0 0 20px 0

          > div
            text-align: center
</style>
