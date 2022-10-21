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
        {{ $t('newest_features.in_app_notifications.methods') }}
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
        title: 'newest_features.in_app_notifications.feature_banner_title',
        description: 'newest_features.in_app_notifications.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/in-app-notifications/in-app-notifications-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/in-app-notifications/in-app-notifications-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/get-notified.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/live-updates.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/in-app-notifications/live-notifications.png'),
          benefitTitle:
            'newest_features.in_app_notifications.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.in_app_notifications.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.in_app_notifications.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.in_app_notifications.shop_now_banner.button_text',
        previousPage: 'newest_features.blockchain_authentication_ledger.title',
        previousPageLink: '/features/blockchain-authentication-ledger',
        nextPage: 'newest_features.social_signin.title',
        nextPageLink: '/features/social-signin',
      },
    }
  },
}
</script>
