<template>
  <div>
    <FeatureContentWrapper
      :title="banner.title"
      :description="banner.description"
      :backgroundImage="banner.backgroundImage"
      :backgroundImageSm="banner.backgroundImageSm"
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
        {{ $t('newest_features.social_signin.refer_a_friend') }}
      </FeatureTitle>
      <InviteFriend />
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'
import InviteFriend from '~/components/feature/InviteFriend'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    InviteFriend,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.social_signin.feature_banner_title',
        description: 'newest_features.social_signin.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/social-signin/social-signin-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/social-signin/social-signin-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/social-signin/simplify-registration.png'),
          benefitTitle:
            'newest_features.social_signin.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.social_signin.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/social-signin/quickly-signup.png'),
          benefitTitle:
            'newest_features.social_signin.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.social_signin.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/social-signin/easier-to-share.png'),
          benefitTitle:
            'newest_features.social_signin.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.social_signin.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        previousPage: 'newest_features.in_app_notifications.title',
        previousPageLink: '/features/in-app-notifications',
        nextPage: 'newest_features.instant_shipping.title',
        nextPageLink: '/features/instant-shipping',
      },
    }
  },
}
</script>
