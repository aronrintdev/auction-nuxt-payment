<template>
  <div>
    <FeatureContentWrapper
      :backgroundImage="banner.backgroundImage"
      :backgroundImageXS="banner.backgroundImageXS"
      :previousPage="previousPage"
      :previousPageXS="previousPageXS"
      :previousPageLink="previousPageLink"
      :nextPage="nextPage"
      :nextPageXS="nextPageXS"
      :nextPageLink="nextPageLink"
    >
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitImageXS="benefit.benefitImageXS"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle>
        {{ $t('newest_features.social_signin.refer_a_friend') }}
      </FeatureTitle>
      <InviteFriend :inviteBannerImage="inviteBannerImage" />
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
        backgroundImage: require('@/assets/img/features/newest-feature/social-signin/social-signin-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/social-signin/social-signin-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/social-signin/simplify-registration.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/social-signin/simplify-registration-xs.png'),
          benefitTitle:
            'newest_features.social_signin.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.social_signin.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/social-signin/quickly-signup.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/social-signin/quickly-signup-xs.png'),
          benefitTitle:
            'newest_features.social_signin.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.social_signin.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/social-signin/easier-to-share.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/social-signin/easier-to-share-xs.png'),
          benefitTitle:
            'newest_features.social_signin.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.social_signin.benefits.third_benefit_desc',
        },
      ],
      inviteBannerImage: require('@/assets/img/features/newest-feature/social-signin/invite-banner.png'),
      previousPage: 'newest_features.social_signin.previous_page_title',
      previousPageXS: 'newest_features.social_signin.previous_page_xs_title',
      previousPageLink: '/features/in-app-notifications',
      nextPage: 'newest_features.social_signin.next_page_title',
      nextPageXS: 'newest_features.social_signin.next_page_xs_title',
      nextPageLink: '/features/instant-shipping',
    }
  },
}
</script>
