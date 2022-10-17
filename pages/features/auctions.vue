<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('features.auctions.title')"
      :description="$t('features.auctions.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2 d-md-inline-flex d-none" />

      <h3 class="benefit-title text-center text-md-left font-primary">
        {{ $tc('common.benefit', 2) }}
      </h3>

      <div class="vertical-cards d-flex flex-column">
        <FeatureBenefitItem
          :icon="
            require(`~/assets/img/features/newest-feature/auctions/rupixen.png`)
          "
          :heading="$t('features.auctions.flexibility')"
          :description="$t('features.auctions.flexibility_desc')"
          class="feature-item"
        />

        <FeatureBenefitItem
          :icon="
            require(`~/assets/img/features/newest-feature/auctions/deadstockexchange.png`)
          "
          :heading="$t('features.auctions.higher_revenues')"
          :description="$t('features.auctions.higher_revenues_desc')"
          class="feature-item"
        />

        <FeatureBenefitItem
          :icon="
            require(`~/assets/img/features/newest-feature/auctions/auctionsondeadstock.png`)
          "
          :heading="$t('features.auctions.certified_authentic_products')"
          :description="
            $t('features.auctions.certified_authentic_products_desc')
          "
          class="feature-item"
        />
      </div>

      <h3 class="title text-uppercase d-lg-block d-none">
        {{ $tc('common.type', 2) }}
      </h3>

      <FeatureTabs :options="options" class="feature-tabs">
        <template #bidding>
          <div class="bidding-container tab-container">
            <h4 class="heading font-primary">
              {{ $t('features.auctions.low_costs') }}
            </h4>
            <div class="description font-primary">
              {{ $t('features.auctions.low_costs_desc') }}
            </div>
            <h4 class="heading font-primary">
              {{ $t('features.auctions.authenticated_products') }}
            </h4>
            <div class="description font-primary">
              {{ $t('features.auctions.authenticated_products_desc') }}
            </div>
            <h4 class="heading font-primary">
              {{ $t('features.auctions.auto_bidding') }}
            </h4>
            <div class="description font-primary mb-0">
              {{ $t('features.auctions.auto_bidding_desc') }}
            </div>
          </div>
        </template>
        <template #selling>
          <div class="selling-container tab-container">
            <h4 class="heading font-primary">
              {{ $t('features.auctions.increased_visibility') }}
            </h4>
            <div class="description font-primary">
              {{ $t('features.auctions.increased_visibility_desc') }}
            </div>
            <h4 class="heading font-primary">
              {{ $t('features.auctions.starting_bid') }}
            </h4>
            <div class="description font-primary">
              {{ $t('features.auctions.starting_bid_desc') }}
            </div>
            <h4 class="heading font-primary">
              {{ $t('features.auctions.flexibility') }}
            </h4>
            <div class="description font-primary mb-0">
              {{ $t('features.auctions.flexibility_desc2') }}
            </div>
          </div>
        </template>
      </FeatureTabs>
    </div>
    <div class="shopnow-banner">
      <ShopNowBanner
        :previousPage="$t('newest_features.sell.title')"
        :previousPageLink="'/features/trading'"
        :nextPage="$t('newest_features.buy.title')"
        :nextPageLink="'/features/streetwear'"
      />
    </div>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureBenefitItem from '~/components/feature/BenefitItem'
import FeatureTabs from '~/components/feature/Tabs'
import FeatureBackButton from '~/components/feature/BackButton'
import ShopNowBanner from '~/components/feature/ShopNowBanner'

export default {
  components: {
    FeatureBanner,
    FeatureBenefitItem,
    FeatureTabs,
    ShopNowBanner,
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
.features-container::v-deep

  .content
    padding: 46px 111px
    max-width: 1440px
    .feature-tabs
      padding: 0px 100px
    .vertical-cards
      gap: 48px
    h3.title, .benefit-title
      @include heading-7
      color: $color-black-5
      text-transform: uppercase
      margin: 68px 0px
    .benefit-title
      margin: 9px 0px 38px 0px !important

      &.title-shop
        margin: 137px 0 49px 0

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



@media (max-width: 1000px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 768px)
  .features-container::v-deep
    .content
      padding: 37px 15px
      .benefit-title
        font-size: 16px !important
        font-weight: 600 !important
        font-size: 16px !important
        margin: 0px 0px 20px 0px !important
      .feature-tabs
        padding: 0px 0px
      .feature-item
        flex-direction: column
        align-items: center
      .vertical-cards
        gap: 40px !important
        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center

    .feature-tabs // Tabs section main Mobile
      margin-top: 40px
      .btns-wrapper
        gap: 24px !important
        margin-bottom: 14px !important
      .tab-panel
        border-radius: 12px !important
      .btn-feature-tab
        width: 74px !important
        height: 35px !important
        font-size: 12px !important
      .feature-item
        flex-direction: column
        align-items: center

        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center
      .btn-feature-tab
        border-radius: 12px !important
        margin: 0px !important
        &:active
          box-shadow: 0px 4px 4px rgb(0 0 0 / 25%) !important
        img
          width: 44px
          height: 17px
        &:first-child
          img
            margin-top: -4px !important
        &:last-child
          img
            height: 34px
            width: 60px !important
      .tab-container
        .heading
          font-size: 12px !important
          margin: 0px
          line-height: 19px !important
          width: 100%
          height: auto !important
          font-family: 'Montserrat'
        .description
          margin-right: 0
          font-size: 11px
          font-weight: 400
          font-family: 'Montserrat'
          line-height: 18px !important
          margin-bottom: 12px
      .bidding-container, .selling-container
            padding: 22px 46px 10px 14px  !important
            background-image: none !important
            border-radius: 12px !important
</style>
