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
      <b-row
        class="justify-content-md-between justify-content-center h-card-main mb-md-5 w-100 mx-0"
      >
        <b-col
          v-for="(item, index) in cardData"
          :key="index"
          md="3"
          class="d-flex justify-content-center d-lg-block px-0"
        >
          <FeatureCard
            :title="item.title"
            :description="item.description"
            :imageUrl="item.image"
          />
        </b-col>
      </b-row>
      <FeatureTitle>
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
        title: 'newest_features.payments_plans.feature_banner_title',
        description: 'newest_features.payments_plans.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/payment-plans/payment-plan-banner.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/payment-plans/paymentplansbannermobile.svg'),
      },
      shopNowBanner: {
        shopNowDescription:
          'newest_features.payments_plans.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.payments_plans.shop_now_banner.button_text',
        previousPage: 'newest_features.international_buying_and_selling.title',
        previousPageLink: '/features/international-buying-and-selling',
        nextPage: 'newest_features.international_languages.title',
        nextPageLink: '/features/international-languages',
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
        },
        {
          title: this.$t(
            'newest_features.payments_plans.benefits.second_benefit_title'
          ),
          description: this.$t(
            'newest_features.payments_plans.benefits.second_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/payment-plans/timer.svg'),
        },
        {
          title: this.$t(
            'newest_features.payments_plans.benefits.third_benefit_title'
          ),
          description: this.$t(
            'newest_features.payments_plans.benefits.third_benefit_desc'
          ),
          image: require('~/assets/img/features/newest-feature/payment-plans/using-phone.svg'),
        },
      ],
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

      .affirm-container
        background-image: url('~/assets/img/features/payment-plans/3-lines.svg')
        background-position: top right 50px, bottom 54px right 50px
        background-repeat: no-repeat, no-repeat

      .afterpay-container
        background-image: url('~/assets/img/icons/afterpay-logo.svg'), url('~/assets/img/icons/afterpay.svg')
        background-position: top 19px right 26px, bottom 36px right 43px
        background-repeat: no-repeat, no-repeat
        background-size: auto, 170px auto

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
      .affirm-container, .afterpay-container
            padding: 22px 46px 10px 14px  !important
            background-image: none !important
            border-radius: 12px !important
</style>
