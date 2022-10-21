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
        {{
          $t(
            'newest_features.shareable_wishlists_and_watchlists.what_you_can_do'
          )
        }}
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
          'newest_features.shareable_wishlists_and_watchlists.feature_banner_title',
        description:
          'newest_features.shareable_wishlists_and_watchlists.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/shareable-wishlists-and-watchlists-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/shareable-wishlists-and-watchlists-banner.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/save-items.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/share-lists.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/shareable-wishlists-and-watchlists/customize.png'),
          benefitTitle:
            'newest_features.shareable_wishlists_and_watchlists.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.shareable_wishlists_and_watchlists.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.shareable_wishlists_and_watchlists.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.shareable_wishlists_and_watchlists.shop_now_banner.button_text',
        previousPage: 'newest_features.instant_shipping.title',
        previousPageLink: '/features/instant-shipping',
      },
    }
  },
}
</script>
