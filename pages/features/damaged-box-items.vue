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
        {{ $t('newest_features.damaged_box_items.conditions') }}
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
        title: 'newest_features.damaged_box_items.feature_banner_title',
        description: 'newest_features.damaged_box_items.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/damaged-box-items/damaged-box-items-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/damaged-box-items/damaged-box-items-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-box-items/insights.png'),
          benefitTitle:
            'newest_features.damaged_box_items.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.damaged_box_items.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-box-items/access-to-more.png'),
          benefitTitle:
            'newest_features.damaged_box_items.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.damaged_box_items.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/damaged-box-items/info-on-apparel.png'),
          benefitTitle:
            'newest_features.damaged_box_items.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.damaged_box_items.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.damaged_box_items.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.damaged_box_items.shop_now_banner.button_text',
        previousPage: 'newest_features.promotions.title',
        previousPageLink: '/features/promotions',
        nextPage: 'newest_features.2fa_security.title',
        nextPageLink: '/features/2fa-security',
      },
    }
  },
}
</script>
