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
        {{ $t('newest_features.virtual_giftcards.options') }}
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
        title: 'newest_features.virtual_giftcards.feature_banner_title',
        description: 'newest_features.virtual_giftcards.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/virtual-giftcards/virtual-giftcards-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/virtual-giftcards/virtual-giftcards-banner-sm.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/virtual-giftcards/no-expiration.png'),
          benefitTitle:
            'newest_features.virtual_giftcards.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.virtual_giftcards.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/virtual-giftcards/never-lose-your-card.png'),
          benefitTitle:
            'newest_features.virtual_giftcards.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.virtual_giftcards.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/virtual-giftcards/pay-in-partial-increments.png'),
          benefitTitle:
            'newest_features.virtual_giftcards.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.virtual_giftcards.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription:
          'newest_features.virtual_giftcards.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.virtual_giftcards.shop_now_banner.button_text',
        previousPage: 'newest_features.rewards_program.title',
        previousPageLink: '/features/rewards-program',
        nextPage: 'newest_features.int_buying_and_selling.title',
        nextPageLink: '/features/international-buying-and-selling',
      },
    }
  },
}
</script>
