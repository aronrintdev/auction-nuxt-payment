<template>
  <div>
    <FeatureContentWrapper
      :backgroundImage="banner.backgroundImage"
      :backgroundImageXS="banner.backgroundImageXS"
      :bottomBannerImage="bottomBanner.bottomBannerImage"
      :bottomBannerImageXS="bottomBanner.bottomBannerImageXS"
      :bottomBannerDescription="bottomBanner.bottomBannerDescription"
      :bottomBannerDescriptionXS="bottomBanner.bottomBannerDescriptionXS"
      :bottomBannerButtonLink="bottomBanner.bottomBannerButtonLink"
      :bottomBannerButtonText="bottomBanner.bottomBannerButtonText"
      :previousPage="bottomBanner.previousPage"
      :previousPageXS="bottomBanner.previousPageXS"
      :previousPageLink="bottomBanner.previousPageLink"
      :nextPage="bottomBanner.nextPage"
      :nextPageXS="bottomBanner.nextPageXS"
      :nextPageLink="bottomBanner.nextPageLink"
    >
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitImageXS="benefit.benefitImageXS"
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
        backgroundImage: require('@/assets/img/features/newest-feature/auctions/auctions-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/auctions/auctions-banner-xs.png'),
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
          benefitImageXS: require('@/assets/img/features/newest-feature/auctions/flexibility-xs.png'),
          benefitTitle: 'newest_features.auctions.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/auctions/higher-revenues.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/auctions/higher-revenues-xs.png'),
          benefitTitle:
            'newest_features.auctions.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/auctions/certified.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/auctions/certified-xs.png'),
          benefitTitle: 'newest_features.auctions.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/auctions/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/auctions/bottom-banner-xs.png'),
        bottomBannerDescription: 'newest_features.auctions.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.auctions.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/browse',
        bottomBannerButtonText:
          'newest_features.auctions.bottom_banner.button_text',
        previousPage:
          'newest_features.auctions.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.auctions.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/trading',
        nextPage: 'newest_features.auctions.bottom_banner.next_page_title',
        nextPageXS: 'newest_features.auctions.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/shop-by-style',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container
  .feature-content
    .feature-tabs
      padding: 0px 96px
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
        background-image: url('~/assets/img/features/newest-feature/auctions/dollar-black.svg')
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
      padding: 0px 16px !important
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
          font-size: $font-size-12 !important
          margin: 0px
          line-height: 19px !important
          width: 100%
          height: auto !important
          font-family: 'Montserrat'
        .description
          margin-right: 0
          font-size: 11px
          font-weight: $regular
          font-family: 'Montserrat'
          line-height: 18px !important
          margin-bottom: 12px
    .bidding-container
      background-image: none !important
      padding: 22px 46px 10px 14px  !important
      border-radius: 12px !important
    .selling-container
      background-image: url('~/assets/img/features/newest-feature/auctions/mobile-dollar.svg') !important
      background-position: bottom 9px right 7px !important
      background-size: auto !important
      padding: 22px 46px 10px 14px  !important
      border-radius: 12px !important
</style>
