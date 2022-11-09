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
      <InviteFriend />
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import InviteFriend from '~/components/feature/InviteFriend'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    InviteFriend,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.instant_shipping.feature_banner_title',
        description: 'newest_features.instant_shipping.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/instant-shipping/instant-shipping-banner.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/instant-shipping/instant-shipping-banner-sm.svg'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/instant-shipping/ships-quickly.png'),
          benefitTitle:
            'newest_features.instant_shipping.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.instant_shipping.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/instant-shipping/pre-authenticated.png'),
          benefitTitle:
            'newest_features.instant_shipping.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.instant_shipping.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/instant-shipping/wide-assortment.png'),
          benefitTitle:
            'newest_features.instant_shipping.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.instant_shipping.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.instant_shipping.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.instant_shipping.shop_now_banner.button_text',
        previousPage: 'newest_features.social_signin.title',
        previousPageLink: '/features/social-signin',
        nextPage: 'newest_features.shareable_wishlists_and_watchlists.title',
        nextPageLink: '/features/shareable-wishlists-and-watchlists',
      },
    }
  },
}
</script>
