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
        {{ $t('newest_features.auctions.types') }}
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
        title: 'newest_features.auctions.feature_banner_title',
        description: 'newest_features.auctions.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/auctions/auctions-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/auctions/auctions-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/auctions/flexibility.png'),
          benefitTitle: 'newest_features.auctions.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/auctions/higher-revenues.png'),
          benefitTitle:
            'newest_features.auctions.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/auctions/certified.png'),
          benefitTitle: 'newest_features.auctions.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.auctions.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription: 'newest_features.auctions.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.auctions.shop_now_banner.button_text',
        previousPage: 'newest_features.trading.title',
        previousPageLink: '/features/trading',
        nextPage: 'newest_features.streetwear.title',
        nextPageLink: '/features/streetwear',
      },
    }
  },
}
</script>
