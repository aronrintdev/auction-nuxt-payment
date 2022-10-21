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
        {{ $t('newest_features.blockchain_authentication_ledger.process') }}
      </FeatureTitle>
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
        title:
          'newest_features.blockchain_authentication_ledger.feature_banner_title',
        description:
          'newest_features.blockchain_authentication_ledger.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/blockchain-authentication-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/blockchain-authentication-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/each-item-bought.png'),
          benefitTitle:
            'newest_features.blockchain_authentication_ledger.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.blockchain_authentication_ledger.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/each-nfc-scan.png'),
          benefitTitle:
            'newest_features.blockchain_authentication_ledger.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.blockchain_authentication_ledger.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/blockchain-authentication-ledger/scan-nfc.png'),
          benefitTitle:
            'newest_features.blockchain_authentication_ledger.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.blockchain_authentication_ledger.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.blockchain_authentication_ledger.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.blockchain_authentication_ledger.shop_now_banner.button_text',
        previousPage: 'newest_features.deadstock_exchange.title',
        previousPageLink: '/features/deadstock-exchange',
        nextPage: 'newest_features.in_app_notifications.title',
        nextPageLink: '/features/in-app-notifications',
      },
    }
  },
}
</script>
