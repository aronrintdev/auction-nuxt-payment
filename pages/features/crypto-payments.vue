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
        {{ $t('newest_features.crypto_payments.we_accept') }}
      </FeatureTitle>
      <div class="my-check-class"></div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.crypto_payments.feature_banner_title',
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
