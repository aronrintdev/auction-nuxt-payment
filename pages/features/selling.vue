<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.selling.title')"
      :description="$t('features.selling.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/selling/payout.svg`)"
        :heading="$t('features.selling.immediate_payout')"
        :description="$t('features.selling.immediate_payout_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/selling/low-fees.svg`)"
        :heading="$t('features.selling.low_fees')"
        :description="$t('features.selling.low_fees_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/selling/shipping.svg`)"
        :heading="$t('features.selling.fast_shipping')"
        :description="$t('features.selling.fast_shipping_desc')"
        class="feature-item"
      />

      <h3 class="title">{{ $t('footer.process') }}</h3>

      <div class="d-flex justify-content-around cards-wrapper mb-5">
        <FeatureCardHoverable
          :icon="require('~/assets/img/features/selling/create-listing.svg')"
          :title="$t('features.selling.create_listing')"
          :description="$t('features.selling.create_listing_desc')"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/selling/sell-items.svg')"
          :title="$t('features.selling.sell_items')"
          :description="$t('features.selling.sell_items_desc')"
        />
      </div>

      <div class="d-flex justify-content-around cards-wrapper">
        <FeatureCardHoverable
          :icon="require('~/assets/img/features/selling/ship-items.svg')"
          :title="$t('features.selling.ship_items')"
          :description="$t('features.selling.ship_items_desc')"
        />

        <FeatureCardHoverable
          :icon="require('~/assets/img/features/selling/earn-commission.svg')"
          :title="$t('features.selling.earn_commission')"
          :description="$t('features.selling.earn_commission_desc')"
        />
      </div>

      <h3 class="title title-shop">{{ $t('vendor_purchase.sell') }}</h3>

      <div class="d-flex align-items-center shop-section">
        <img
          :src="require('~/assets/img/features/selling/dollar.svg')"
          class="cart-img"
        />
        <div class="flex-grow-1">
          <div>
            {{ $t('features.selling.sell_desc') }}
          </div>

          <Button to="/shop" variant="info" pill class="flex-shrink-0">{{
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

    .cards-wrapper
      > div
        max-width: 361px
        min-height: 320px

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
        flex-direction: column
        align-items: center

        > div
          margin-top: 20px
          align-items: center
          padding: 0

        button
          margin-top: 20px

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
        img.cart-img
          margin: 0 0 20px 0

        > div
          flex-direction: column
          align-items: center
          padding: 0
          text-align: center

      .cards-wrapper
        flex-direction: column
        align-items: center

        > div:not(:last-child)
          margin: 0 0 40px 0
</style>
