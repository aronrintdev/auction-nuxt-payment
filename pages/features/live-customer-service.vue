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
        {{ $t('newest_features.live_customer_service.options') }}
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
        title: 'newest_features.live_customer_service.feature_banner_title',
        description:
          'newest_features.live_customer_service.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/live-customer-service/live-customer-service-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/live-customer-service/live-customer-service-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/24-hour-live.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/talk-to-a-real-person.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/live-customer-service/immediate-problem-solving.png'),
          benefitTitle:
            'newest_features.live_customer_service.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.live_customer_service.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.live_customer_service.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.live_customer_service.shop_now_banner.button_text',
        previousPage: 'newest_features.heat_check.title',
        previousPageLink: '/features/heat-check',
        nextPage: 'newest_features.rewards_program.title',
        nextPageLink: '/features/rewards-program',
      },
    }
  },
}
</script>
