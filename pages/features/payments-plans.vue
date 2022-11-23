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
      <b-row class="justify-content-center h-card-main">
        <b-col
          v-for="(item, index) in cardData"
          :key="index"
          lg="3"
          class="d-flex justify-content-center d-lg-block h-card-column px-0"
        >
          <FeatureCard
            :title="item.title"
            :description="item.description"
            :imageUrl="item.image"
            :resImageUrl="item.responsiveImage"
          />
        </b-col>
      </b-row>
      <FeatureTitle class="feature-title-my">
        {{ $t('newest_features.payments_plans.options') }}
      </FeatureTitle>

      <FeatureTabs :options="options" class="feature-tabs">
        <template #affirm>
          <div class="affirm-container tab-container">
            <h4 class="heading font-primary">
              {{ $t('features.payment_plans.how_affirm_work') }}
            </h4>
            <div class="description">
              {{ $t('features.payment_plans.how_affirm_work_desc') }}
            </div>
            <h4 class="heading font-primary">
              {{ $t('features.payment_plans.apr_and_fees') }}
            </h4>
            <div class="description">
              {{ $t('features.payment_plans.apr_and_fees_desc') }}
            </div>
            <h4 class="heading font-primary">
              {{ $t('features.payment_plans.returns') }}
            </h4>
            <div class="description mb-0">
              {{ $t('features.payment_plans.returns_desc') }}
            </div>
          </div>
        </template>
        <template #afterpay>
          <div class="afterpay-container tab-container">
            <h4 class="heading font-primary">
              {{ $t('features.payment_plans.how_afterpay_work') }}
            </h4>
            <div class="description">
              {{ $t('features.payment_plans.how_afterpay_work_desc') }}
            </div>
            <h4 class="heading font-primary">
              {{ $t('features.payment_plans.apr_and_fees') }}
            </h4>
            <div class="description">
              {{ $t('features.payment_plans.afterpay_apr_and_fees_desc') }}
            </div>
            <h4 class="heading font-primary">
              {{ $t('features.payment_plans.returns') }}
            </h4>
            <div class="description mb-0">
              {{ $t('features.payment_plans.afterpay_returns_desc') }}
            </div>
          </div>
        </template>
      </FeatureTabs>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureTabs from '~/components/feature/Tabs'
import FeatureCard from '~/components/feature/Card'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    FeatureCard,
    FeatureTitle,
    FeatureTabs,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        backgroundImage: require('@/assets/img/features/newest-feature/payment-plans/payment-plans-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/payment-plans/payment-plans-banner-xs.png'),
      },
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

      cardData: [
        {
          title: this.$t(
            'newest_features.payments_plans.benefits.first_benefit_title'
          ),
          description: this.$t(
            'newest_features.payments_plans.benefits.first_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/payment-plans/newest-money.png'),
          responsiveImage: require('~/assets/img/features/newest-feature/payment-plans/mobile-money.png'),
        },
        {
          title: this.$t(
            'newest_features.payments_plans.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.payments_plans.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/payment-plans/timer.svg'),
          responsiveImage: require('~/assets/img/features/newest-feature/payment-plans/mobile-watch.png'),
        },
        {
          title: this.$t(
            'newest_features.payments_plans.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.payments_plans.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/payment-plans/using-phone.svg'),
          responsiveImage: require('~/assets/img/features/newest-feature/payment-plans/mobile-shoes.png'),
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/payment-plans/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/payment-plans/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.payments_plans.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.payments_plans.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/shop',
        bottomBannerButtonText:
          'newest_features.payments_plans.bottom_banner.button_text',
        previousPage:
          'newest_features.payments_plans.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.payments_plans.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/virtual-giftcards',
        nextPage:
          'newest_features.payments_plans.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.payments_plans.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/international-languages',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container
  .feature-content
    .feature-item
      margin-bottom: 115px

    .feature-tabs::v-deep
      margin-bottom: 117px
      .btn-feature-tab
        &:first-child
          img
            margin-top: -13px

        &:last-child
          img
            height: 34px

      .affirm-container
        background-image: url('~/assets/img/features/newest-feature/payment-plans/affrim.svg')
        background-position: bottom 56px right 58px, right 50px
        background-repeat: no-repeat, no-repeat

      .afterpay-container
        background-image: url('~/assets/img/features/newest-feature/payment-plans/Afterpay.svg')
        background-position: bottom 18px right 18px, right 50px
        background-repeat: no-repeat, no-repeat

      .tab-container
        color: $color-black-1
        padding: 43px

      h4.heading
        @include body-7-bold
        margin-bottom: 9px


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
          font-size: $font-size-12 !important
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
      .affirm-container, .afterpay-container
        padding: 22px 46px 10px 14px  !important
        background-image: none !important
        border-radius: 12px !important

@media screen and (max-width: 577px)
  .features-container::v-deep
    .feature-content
      .feature-title-my
        margin-top: 48px !important
        margin-bottom: 24px !important
      .feature-tabs
        margin-top: 0 !important
</style>
