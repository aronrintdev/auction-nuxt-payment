<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <FeatureContentWrapper
    :title="banner.title"
    :description="banner.description"
    :backgroundImage="banner.backgroundImage"
  >
    <FeatureTitle class="mb-6 text-center text-md-left">{{
      $tc('common.benefit', 2)
    }}</FeatureTitle>

    <HorizontalBenefitBox
      v-for="(benefit, index) in benefits"
      :key="index"
      :benefitImage="benefit.benefitImage"
      :benefitTitle="benefit.benefitTitle"
      :benefitDescription="benefit.benefitDescription"
    />
    <FeatureTitle class="mb-6 text-center text-md-left">{{
      $tc('newest_features.we_accept', 2)
    }}</FeatureTitle>
    <div class="coins-section my-5">
      <div class="coin bit-coin d-flex flex-column align-items-center gap-2">
        <img
          src="~/assets/img/features/newest-feature/crypto-payments/bit-coin.png"
          alt=""
          class="img-fluid"
        />
        <p class="fw-4">
          {{ $t('newest_features.crypto_payments.bitcoin') }}
        </p>
      </div>
      <div
        class="coin ethrium-coin d-flex flex-column align-items-center gap-2"
      >
        <img
          src="~/assets/img/features/newest-feature/crypto-payments/ethrium-coin.png"
          alt=""
          class="img-fluid"
        />
        <p class="fw-4">
          {{ $t('newest_features.crypto_payments.etherium') }}
        </p>
      </div>
      <div
        class="coin binance-coin d-flex flex-column align-items-center gap-2"
      >
        <img
          src="~/assets/img/features/newest-feature/crypto-payments/binance-coin.png"
          alt=""
          class="img-fluid"
        />
        <p class="fw-4">
          {{ $t('newest_features.crypto_payments.binance') }}
        </p>
      </div>
      <div
        class="coin vechain-coin d-flex flex-column align-items-center gap-2"
      >
        <img
          src="~/assets/img/features/newest-feature/crypto-payments/vechain-coin.png"
          alt=""
          class="img-fluid"
        />
        <p class="fw-4">
          {{ $t('newest_features.crypto_payments.vechain') }}
        </p>
      </div>
    </div>
    <ShopNowBanner
      :previousPage="shopNowBanner.previousPage"
      :previousPageLink="shopNowBanner.previousPageLink"
      :nextPage="shopNowBanner.nextPage"
      :nextPageLink="shopNowBanner.nextPageLink"
    />
  </FeatureContentWrapper>
</template>
<script>
import { FeatureContentWrapper, ShopNowBanner } from '~/components/feature'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    HorizontalBenefitBox,
    ShopNowBanner,
    FeatureContentWrapper,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.crypto_payments.title',
        description: 'newest_features.crypto_payments.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/crypto-payments/crypto-payments-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/crypto-payments/crypto-payments-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/crypto-payments/safe-and-secure-transactions.png'),
          benefitTitle:
            'newest_features.crypto_payments.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.crypto_payments.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/crypto-payments/enables-int-buying.png'),
          benefitTitle:
            'newest_features.crypto_payments.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.crypto_payments.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/crypto-payments/transactional-freedom.png'),
          benefitTitle:
            'newest_features.crypto_payments.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.crypto_payments.benefits.third_benefit_desc',
        },
      ],
      // weAccept: 'newest_features.we_accept',
      bitcoin: 'newest_features.crypto_payments.bitcoin',
      etherium: 'newest_features.crypto_payments.etherium',
      binance: 'newest_features.crypto_payments.binance',
      vechain: 'newest_features.crypto_payments.vechain',
      shopNowBanner: {
        shopNowDescription:
          'newest_features.crypto_payments.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.crypto_payments.shop_now_banner.button_text',
        previousPage: 'newest_features.streetwear.title',
        previousPageLink: '/features/streetwear',
        nextPage: 'newest_features.live_customer_service.title',
        nextPageLink: '/features/live-customer-service',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.coins-section
  display: grid
  width: 100%
  justify-content: center !important
  grid-template-columns: minmax(52px,140px)minmax(52px,140px)minmax(52px,140px)minmax(52px,140px)
  gap: 114px
  .coin
    img
      width: 150px
      height: auto
    p
    font-size: 28px
    line-height: 32px


@media (max-width: 768px)
  .coins-section
    width: 272px
    margin: 0 auto
    gap: 30px
    p
      font-size: 12px
      font-weight: 400
</style>
