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
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.2fa_security.feature_banner_title',
        description: 'newest_features.2fa_security.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/2fa-security/2fa-security-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/2fa-security/2fa-security-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/2fa-security/increased-security.png'),
          benefitTitle:
            'newest_features.2fa_security.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.2fa_security.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/2fa-security/biometric-identification.png'),
          benefitTitle:
            'newest_features.2fa_security.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.2fa_security.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/2fa-security/ease-of-use.png'),
          benefitTitle:
            'newest_features.2fa_security.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.2fa_security.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription: 'newest_features.2fa_security.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.2fa_security.shop_now_banner.button_text',
        previousPage: 'newest_features.damaged_box_items.title',
        previousPageLink: '/features/damaged-box-items',
        nextPage: 'newest_features.deadstock_exchange.title',
        nextPageLink: '/features/deadstock-exchange',
      },
    }
  },
}
</script>
