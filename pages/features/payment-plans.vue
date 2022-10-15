<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('home.payment_plans')"
      :description="$t('features.payment_plans.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2 d-lg-inline-flex d-none" />

      <h3 class="benefit-title text-center text-lg-left font-primary">
        {{ $tc('common.benefit', 2) }}
      </h3>

      <b-row class="justify-content-between h-card-main">
        <b-col
          v-for="(item, index) in cardData"
          :key="index"
          lg="3"
          class="d-flex justify-content-center d-lg-block"
        >
          <FeatureCard
            :title="item.title"
            :description="item.description"
            :imageUrl="item.image"
          />
        </b-col>
      </b-row>
      <h3 class="title d-lg-block d-none">{{ $tc('common.option', 2) }}</h3>

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
    </div>
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureTabs from '~/components/feature/Tabs'
import FeatureBackButton from '~/components/feature/BackButton'
import FeatureCard from '~/components/feature/Card'

export default {
  components: {
    FeatureBanner,
    FeatureCard,
    FeatureTabs,
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

      cardData: [
        {
          title: 'Increased Affordability',
          description:
            'Use installment plans to divide your purchase into more affordable payments.',
          image: require('~/assets/img/features/newest-feature/payment-plans/newest-money.png'),
        },
        {
          title: 'Quick Approval',
          description:
            'Receive approval of your installment payment plan immeditely during your checkout. ',
          image: require('~/assets/img/features/newest-feature/payment-plans/timer.png'),
        },
        {
          title: 'Custom Plans',
          description:
            'Divide your plan into four seperate payments, or pay off your purchase whenever you’re ready.',
          image: require('~/assets/img/features/newest-feature/payment-plans/using-phone.png'),
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
    padding: 56px 116px
    max-width: 1440px
    .h-card-main // card section main desktop
      .feature-card
        width: 286px
    h3.title, .benefit-title
      @include heading-7
      color: $color-black-5
      text-transform: uppercase
      margin: 68px 0px
    .benefit-title
      margin: 9px 0px 38px 0px !important

      &.title-shop
        margin: 137px 0 49px 0

    .feature-item
      margin-bottom: 115px

    .feature-tabs::v-deep // Tabs section main desktop
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



@media (max-width: 1000px)
  .features-container
    .content
      padding: 80px 40px

@media (max-width: 768px)
  .features-container::v-deep

    .content
      padding: 40px 16px

      .benefit-title
        font-size: 16px !important
        font-weight: 600 !important
        font-size: 16px !important
        margin: 0px 0px 20px 0px !important


    .feature-tabs // Tabs section main Mobile
      margin-top: 40px
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
      .affirm-container, .afterpay-container
            padding: 22px 46px 10px 14px  !important
            background-image: none !important
            border-radius: 12px !important
</style>
