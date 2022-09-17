<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.auctions.title')"
      :description="$t('features.auctions.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title text-uppercase">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/payment-plans/custom-plans.svg`)"
        :heading="$t('features.auctions.flexibility')"
        :description="$t('features.auctions.flexibility_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/selling/sell-items.svg`)"
        :heading="$t('features.auctions.higher_revenues')"
        :description="$t('features.auctions.higher_revenues_desc')"
        class="feature-item higher-revenues"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/buying/certified-authentic.svg`)"
        :heading="$t('features.auctions.certified_authentic_products')"
        :description="$t('features.auctions.certified_authentic_products_desc')"
        class="feature-item"
      />

      <h3 class="title text-uppercase">{{ $tc('common.type', 2) }}</h3>

      <FeatureTabs :options="options" class="feature-tabs">
        <template #bidding>
          <div class="bidding-container tab-container">
            <h4 class="heading">
              {{ $t('features.auctions.low_costs') }}
            </h4>
            <div class="description">
              {{ $t('features.auctions.low_costs_desc') }}
            </div>
            <h4 class="heading">
              {{ $t('features.auctions.authenticated_products') }}
            </h4>
            <div class="description">
              {{ $t('features.auctions.authenticated_products_desc') }}
            </div>
            <h4 class="heading">
              {{ $t('features.auctions.auto_bidding') }}
            </h4>
            <div class="description mb-0">
              {{ $t('features.auctions.auto_bidding_desc') }}
            </div>
          </div>
        </template>
        <template #selling>
          <div class="selling-container tab-container">
            <h4 class="heading">
              {{ $t('features.auctions.increased_visibility') }}
            </h4>
            <div class="description">
              {{ $t('features.auctions.increased_visibility_desc') }}
            </div>
            <h4 class="heading">
              {{ $t('features.auctions.starting_bid') }}
            </h4>
            <div class="description">
              {{ $t('features.auctions.starting_bid_desc') }}
            </div>
            <h4 class="heading">
              {{ $t('features.auctions.flexibility') }}
            </h4>
            <div class="description mb-0">
              {{ $t('features.auctions.flexibility_desc2') }}
            </div>
          </div>
        </template>
      </FeatureTabs>

      <h3 class="title title-shop text-uppercase">
        {{ $t('features.auctions.explore') }}
      </h3>

      <div class="d-flex align-items-center shop-section">
        <img
          :src="require('~/assets/img/features/auctions/auction.svg')"
          class="cart-img"
        />

        <div class="flex-grow-1">
          <div>
            {{ $t('features.auctions.explore_desc') }}
          </div>

          <!-- todo: add link to auction browse page -->
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
import FeatureTabs from '~/components/feature/Tabs'
import FeatureBackButton from '~/components/feature/BackButton'

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    FeatureTabs,
    Button,
    FeatureBackButton,
  },

  layout: 'IndexLayout',

  data() {
    return {
      options: [
        {
          id: 'bidding',
          label: this.$t('features.auctions.bidding'),
        },
        {
          id: 'selling',
          label: this.$t('features.auctions.selling'),
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

      &.higher-revenues::v-deep
        img
          width: 115px
          height: 115px

    .bidding-container
      background-image: url('~/assets/img/features/auctions/circled-one.svg')
      background-position: bottom 53px right 90px
      background-repeat: no-repeat

    .selling-container
      background-image: url('~/assets/img/features/auctions/dollar.svg')
      background-position: bottom 82px right 92px
      background-repeat: no-repeat

    .tab-container
      color: $color-black-1
      padding: 43px

      h4.heading
        @include body-7-bold
        margin-bottom: 9px

      .description
        @include body-4-regular
        margin-bottom: 67px
        max-width: 642px
        margin-right: 175px

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
          padding: 0
          text-align: center

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

      .feature-tabs::v-deep
        .btns-wrapper
          flex-direction: column

      .tab-container
        .description
          margin-right: 0

      .selling-container, .bidding-container
        padding-bottom: 180px

      .shop-section
        img.cart-img
          margin: 0 0 20px 0
</style>
