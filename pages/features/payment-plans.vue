<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div class="features-container">
    <FeatureBanner
      :title="$t('home.payment_plans')"
      :description="$t('features.payment_plans.desc')"
    />

    <div class="content mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title">{{ $tc('common.benefit', 2) }}</h3>

      <FeatureBenefitItem
        :icon="
          require(`~/assets/img/features/payment-plans/increased-affordability.svg`)
        "
        :heading="$t('features.payment_plans.increased_affordability')"
        :description="$t('features.payment_plans.increased_affordability_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="
          require(`~/assets/img/features/payment-plans/quick-approval.svg`)
        "
        :heading="$t('features.payment_plans.quick_approval')"
        :description="$t('features.payment_plans.quick_approval_desc')"
        class="feature-item"
      />

      <FeatureBenefitItem
        :icon="require(`~/assets/img/features/payment-plans/custom-plans.svg`)"
        :heading="$t('features.payment_plans.custom_plans')"
        :description="$t('features.payment_plans.custom_plans_desc')"
        class="feature-item"
      />

      <h3 class="title">{{ $tc('common.option', 2) }}</h3>

      <FeatureTabs :options="options" class="feature-tabs">
        <template #affirm>
          <div class="affirm-container tab-container">
            <h4 class="heading">
              {{ $t('features.payment_plans.how_affirm_work') }}
            </h4>
            <div class="description">
              {{ $t('features.payment_plans.how_affirm_work_desc') }}
            </div>
            <h4 class="heading">
              {{ $t('features.payment_plans.apr_and_fees') }}
            </h4>
            <div class="description">
              {{ $t('features.payment_plans.apr_and_fees_desc') }}
            </div>
            <h4 class="heading">
              {{ $t('features.payment_plans.returns') }}
            </h4>
            <div class="description mb-0">
              {{ $t('features.payment_plans.returns_desc') }}
            </div>
          </div>
        </template>
        <template #afterpay>
          <div class="afterpay-container tab-container">
            <h4 class="heading">
              {{ $t('features.payment_plans.how_afterpay_work') }}
            </h4>
            <div class="description">
              {{ $t('features.payment_plans.how_afterpay_work_desc') }}
            </div>
            <h4 class="heading">
              {{ $t('features.payment_plans.apr_and_fees') }}
            </h4>
            <div class="description">
              {{ $t('features.payment_plans.afterpay_apr_and_fees_desc') }}
            </div>
            <h4 class="heading">
              {{ $t('features.payment_plans.returns') }}
            </h4>
            <div class="description mb-0">
              {{ $t('features.payment_plans.afterpay_returns_desc') }}
            </div>
          </div>
        </template>
      </FeatureTabs>

      <h3 class="title title-shop">{{ $t('common.shop') }}</h3>

      <div class="d-flex align-items-center shop-section">
        <div class="d-flex flex-grow-1">
          <img
            :src="require('~/assets/img/icons/shopping-cart.svg')"
            class="cart-img"
          />
          <div class="flex-grow-1">
            {{ $t('features.payment_plans.shop_desc1') }}
            <img
              :src="require('~/assets/img/icons/affirm2.svg')"
              class="affirm-img"
            />
            {{ $t('common.or') }}
            <img
              :src="require('~/assets/img/icons/afterpay.svg')"
              class="afterpay-img"
            />
            {{ $t('features.payment_plans.shop_desc2') }}
          </div>
        </div>
        <Button to="/shop" variant="info" pill class="flex-shrink-0">{{
          $t('vendor_purchase.browse')
        }}</Button>
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

    .feature-tabs::v-deep
      .btn-feature-tab
        &:first-child
          img
            margin-top: -13px

        &:last-child
          img
            height: 34px

    .affirm-container
      background-image: url('~/assets/img/features/payment-plans/3-lines.svg'), url('~/assets/img/icons/affirm2.svg')
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
        max-width: 642px
        margin-right: 175px

    .shop-section
      > div
        @include body-3-regular
        line-height: 29px
        padding: 0 80px 0 0
        color: $color-black-1

        > div
          min-width: 200px

        img.cart-img
          margin-right: 86px

        img.affirm-img
          height: 25px
          margin: -13px 3px 0 3px

        img.afterpay-img
          height: 19px
          margin: 0 3px

      button
        width: 190px

@media (max-width: 1200px)
  .features-container
    .content
      .shop-section
        flex-direction: column
        align-items: center

        > div
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

      .feature-tabs::v-deep
        .btns-wrapper
          flex-direction: column

      .tab-container
        .description
          margin-right: 0

      .affirm-container, .afterpay-container
        padding-top: 120px
        padding-bottom: 120px

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
