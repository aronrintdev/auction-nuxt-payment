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
        {{ $t('newest_features.rewards_program.ways_to_earn') }}
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
        title: 'newest_features.rewards_program.feature_banner_title',
        description: 'newest_features.rewards_program.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/rewards-program/rewards-program-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/rewards-program/rewards-program-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/earn-points.png'),
          benefitTitle:
            'newest_features.rewards_program.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.rewards_program.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/redeem-for-free-items.png'),
          benefitTitle:
            'newest_features.rewards_program.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.rewards_program.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/track-rewards.png'),
          benefitTitle:
            'newest_features.rewards_program.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.rewards_program.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.rewards_program.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.rewards_program.shop_now_banner.button_text',
        previousPage: 'newest_features.live_customer_service.title',
        previousPageLink: '/features/live-customer-service',
        nextPage: 'newest_features.virtual_giftcards.title',
        nextPageLink: '/features/virtual-giftcards',
      },
    }
  },
}
</script>
