<template>
  <!-- todo: refactor code. refer to virtual-giftcards -->
  <div>
    <FeatureBanner
      :title="banner.title"
      :description="banner.description"
      :backgroundImage="banner.backgroundImage"
    />

    <div class="main-content-section mx-auto">
      <FeatureBackButton class="mb-2" />

      <h3 class="title text-uppercase">{{ $tc('common.benefit', 2) }}</h3>

      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />

      <h3
        class="we-accept font-primary fs-32 fw-6 text-black text-uppercase text-center text-sm-left mb-0"
      >
        {{ $t(weAccept) }}
      </h3>
    </div>
    <ShopNowBanner
      :previousPage="shopNowBanner.previousPage"
      :previousPageLink="shopNowBanner.previousPageLink"
      :nextPage="shopNowBanner.nextPage"
      :nextPageLink="shopNowBanner.nextPageLink"
    />
  </div>
</template>
<script>
import FeatureBanner from '~/components/feature/Banner'
import FeatureBackButton from '~/components/feature/BackButton'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import ShopNowBanner from '~/components/feature/ShopNowBanner'

export default {
  components: {
    FeatureBanner,
    FeatureBackButton,
    HorizontalBenefitBox,
    ShopNowBanner,
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
      banner: {
        title: 'features.crypto_payments.title',
        description: 'features.crypto_payments.desc',
        backgroundImage: require('@/assets/img/features/newest-feature/crypto-payments/crypto-payments-banner.png'),
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
      weAccept: 'newest_features.we_accept',
      bitcoin: 'newest_features.crypto_payments.bitcoin',
      etherium: 'newest_features.crypto_payments.etherium',
      binance: 'newest_features.crypto_payments.binance',
      vechain: 'newest_features.crypto_payments.vechain',
      shopNowBanner: {
        previousPage: 'newest_features.streetwear.title',
        previousPageLink: '/streetwear',
        nextPage: 'newest_features.live_customer_service.title',
        nextPageLink: '/live-customer-service',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.main-content-section
  width: 1207px
</style>
