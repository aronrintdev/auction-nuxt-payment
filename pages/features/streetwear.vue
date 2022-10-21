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
        {{ $t('newest_features.streetwear.new_products') }}
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
        title: 'newest_features.streetwear.feature_banner_title',
        description: 'newest_features.streetwear.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/streetwear/streetwear-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/streetwear/streetwear-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/streetwear/exclusive-streetwear.png'),
          benefitTitle:
            'newest_features.streetwear.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.streetwear.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/streetwear/access-to-streetwear.png'),
          benefitTitle:
            'newest_features.streetwear.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.streetwear.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/streetwear/sold-out-exclusive.png'),
          benefitTitle:
            'newest_features.streetwear.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.streetwear.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription: 'newest_features.streetwear.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.streetwear.shop_now_banner.button_text',
        previousPage: 'newest_features.auctions.title',
        previousPageLink: '/features/auctions',
        nextPage: 'newest_features.crypto_payments.title',
        nextPageLink: '/features/crypto-payments',
      },
    }
  },
}
</script>
