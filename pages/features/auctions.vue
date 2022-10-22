<template>
  <div>
    <FeatureContentWrapper
      :title="banner.title"
      :description="banner.description"
      :backgroundImage="banner.backgroundImage"
      :backgroundImageSm="banner.backgroundImageSm"
      :shopNowDescription="shopNowBanner.shopNowDescription"
      :shopNowButtonText="shopNowBanner.shopNowButtonText"
      :previousPage="shopNowBanner.previousPage"
      :previousPageLink="shopNowBanner.previousPageLink"
      :nextPage="shopNowBanner.nextPage"
      :nextPageLink="shopNowBanner.nextPageLink"
    >
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle>
        {{ $t('newest_features.auctions.types') }}
      </FeatureTitle>
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
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'
import FeatureTabs from '~/components/feature/Tabs'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    FeatureTabs,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.auctions.feature_banner_title',
        description: 'newest_features.auctions.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/auctions/auctions-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/auctions/auctions-banner-sm.png'),
      },
      options: [
        {
          id: 'bidding',
          label: 'BIDDING',
        },
        {
          id: 'selling',
          label: 'SELLING',
        },
      ],
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/auctions/flexibility.png'),
          benefitTitle: 'newest_features.auctions.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/auctions/higher-revenues.png'),
          benefitTitle:
            'newest_features.auctions.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/auctions/certified.png'),
          benefitTitle: 'newest_features.auctions.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription: 'newest_features.auctions.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.auctions.shop_now_banner.button_text',
        previousPage: 'newest_features.trading.title',
        previousPageLink: '/features/trading',
        nextPage: 'newest_features.streetwear.title',
        nextPageLink: '/features/streetwear',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container
  .feature-content
    .h-card-main // card section main desktop
      .feature-card
        width: 286px

    .feature-item
      margin-bottom: 115px

    .feature-tabs::v-deep // Tabs section main desktop
      margin-bottom: 117px
      .btn-feature-tab
        &:first-child
          img
            margin-top: -13px

        &:last-child
          img
            height: 34px

      .bidding-container
        background-image: url('~/assets/img/features/auctions/circled-one.svg')
        background-position: bottom 80px right 90px
        background-repeat: no-repeat, no-repeat
        background-size: 80px auto

      .selling-container
        background-image: url('~/assets/img/features/auctions/dollar.svg')
        background-position: bottom 80px right 90px
        background-repeat: no-repeat, no-repeat
        background-size: 80px auto

      .tab-container
        color: $color-black-1
        padding: 43px
        background-color: white
        border-radius: 20px

      h4.heading
        @include body-7-bold
        margin-bottom: 9px
        width: 100%


      .description
        @include body-4-regular
        margin-bottom: 67px
        max-width: 797px
        margin-right: 175px
        line-height: 26px !important

@media (max-width: 768px)
  .features-container::v-deep
    .feature-tabs // Tabs section main Mobile
      margin: 40px 0px !important
      padding: 0px 16px
      .btns-wrapper
        gap: 24px !important
        margin-bottom: 14px !important
      .tab-panel
        border-radius: 12px !important
      .btn-feature-tab
        width: 74px
        height: 35px

      .feature-item
        flex-direction: column
        align-items: center
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
