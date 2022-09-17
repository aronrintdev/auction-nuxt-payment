<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.rewards_program.title')"
      :description="$t('features.rewards_program.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/rewards-program/cart.svg`)"
        :heading="$t('features.rewards_program.earn_points')"
        :description="$t('features.rewards_program.earn_points_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/rewards-program/gift.svg`)"
        :heading="$t('features.rewards_program.redeem')"
        :description="$t('features.rewards_program.redeem_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/rewards-program/phone.svg`)"
        :heading="$t('features.rewards_program.track_rewards')"
        :description="$t('features.rewards_program.track_rewards_desc')"
        class="feature-item"
      />

      <h3 class="title">
        {{ $t('features.rewards_program.ways_to_earn') }}
      </h3>

      <div class="d-flex cards-wrapper">
        <FeatureCardHoverable
          :icon="require('~/assets/img/features/rewards-program/bag.svg')"
          :title="$t('features.rewards_program.buying')"
          :description="$t('features.rewards_program.buying_desc')"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/rewards-program/trading.svg')"
          :title="$t('features.rewards_program.trading')"
          :description="$t('features.rewards_program.trading_desc')"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/rewards-program/auctions.svg')"
          :title="$t('features.rewards_program.auctions')"
          :description="$t('features.rewards_program.auctions_desc')"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/rewards-program/dollar.svg')"
          :title="$t('features.rewards_program.selling')"
          :description="$t('features.rewards_program.selling_desc')"
        />
      </div>

      <h3 class="title title-shop">
        {{ $t('features.rewards_program.view_rewards') }}
      </h3>

      <div class="d-flex align-items-center shop-section">
        <div class="d-flex flex-grow-1 align-items-center">
          <img
            :src="require('~/assets/img/features/rewards-program/trophy.svg')"
            class="cart-img"
          />

          <div class="flex-grow-1">
            {{ $t('features.rewards_program.view_rewards_desc') }}
          </div>
        </div>

        <Button to="/shop" variant="info" pill class="flex-shrink-0">{{
          $t('features.rewards_program.view_rewards')
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
import FeatureCardHoverable from '~/components/feature/CardHoverable'

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    Button,
    FeatureBackButton,
    FeatureCardHoverable,
  },

  layout: 'IndexLayout',

  data() {
    return {
      options: [
        {
          id: 'affirm',
          icon: require('~/assets/img/icons/affirm-black.svg'),
        },
        {
          id: 'afterpay',
          icon: require('~/assets/img/icons/afterpay.svg'),
        },
      ],
    }
  },
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
      text-transform: uppercase
      margin-bottom: 68px

      &.title-shop
        margin: 137px 0 49px 0

    .feature-item
      margin-bottom: 115px
      align-items: center

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

    .cards-wrapper
      > div::v-deep
        min-height: 300px
        justify-content: flex-start !important

        img
          min-height: 100px

@media (max-width: 1200px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 1000px)
  .features-container
    .content
      .cards-wrapper
        flex-direction: column
        align-items: center

        > div
          width: 100%

        > div:not(:last-child)
          margin: 0 0 40px 0

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
