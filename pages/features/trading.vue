<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.trading.title')"
      :description="$t('features.trading.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title text-uppercase">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/trading/trophy.png`)"
        :heading="$t('features.trading.first_of_its_kind')"
        :description="$t('features.trading.first_of_its_kind_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/trading/meter.svg`)"
        :heading="$t('features.trading.value_meter')"
        :description="$t('features.trading.value_meter_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/buying/certified-authentic.svg`)"
        :heading="$t('features.trading.certified_authentic_products')"
        :description="$t('features.trading.certified_authentic_products_desc')"
        class="feature-item"
      />

      <h3 class="title text-uppercase">
        {{ $t('features.trading.new_features') }}
      </h3>

      <div class="text-center new-features">
        <img :src="require('~/assets/img/features/trading/new-features.svg')" />
      </div>

      <h3 class="title title-shop text-uppercase">{{ $t('common.trade') }}</h3>

      <div class="d-flex align-items-center shop-section">
        <img
          :src="require('~/assets/img/features/trading/trade.svg')"
          class="cart-img"
        />

        <div class="flex-grow-1">
          <div>
            {{ $t('features.trading.trade_desc') }}
          </div>

          <!-- todo: add link to trade browse page -->
          <Button to="#" variant="info" pill class="flex-shrink-0">{{
            $t('vendor_purchase.browse')
          }}</Button>
        </div>
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
      margin-bottom: 68px

      &.title-shop
        margin: 137px 0 49px 0

    .feature-item
      margin-bottom: 115px

    .new-features
      img
        max-width: 100%

    .shop-section
      img.cart-img
        margin-right: 86px

      > div
        @include body-3-regular
        line-height: 29px
        padding: 0 80px 0 0
        color: $color-black-1

      button
        width: 190px
        margin-top: 20px

@media (max-width: 1200px)
  .features-container
    .content
      .shop-section
        > div
          padding: 0

@media (max-width: 1000px)
  .features-container
    .content
      padding: 80px 40px

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
        flex-direction: column
        align-items: center

        img.cart-img
          margin: 0 0 20px 0

        > div
          margin-top: 20px
          text-align: center

        button
          margin-top: 20px
</style>
