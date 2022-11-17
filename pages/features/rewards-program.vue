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
      <div
        class="cards-wrapper-main d-flex flex-md-row flex-column justify-content-center"
      >
        <div class="d-flex cards-wrapper">
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/rewards-program/first-aid.svg')
            "
            :title="$t('features.rewards_program.buying')"
            :description="$t('features.rewards_program.buying_desc')"
          />

          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/rewards-program/data.svg')
            "
            :title="$t('features.rewards_program.trading')"
            :description="$t('features.rewards_program.trading_desc')"
          />
        </div>
        <div class="d-flex cards-wrapper">
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/rewards-program/hammer.svg')
            "
            :title="$t('features.rewards_program.auctions')"
            :description="$t('features.rewards_program.auctions_desc')"
          />

          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/rewards-program/dollar.svg')
            "
            :title="$t('features.rewards_program.selling')"
            :description="$t('features.rewards_program.selling_desc')"
          />
        </div>
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'
import FeatureFourCards from '~/components/feature/FourCards'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    FeatureFourCards,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.rewards_program.feature_banner_title',
        description: 'newest_features.rewards_program.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/rewards-program/rewards-program-banner.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/rewards-program/rewards-program-banner-sm.svg'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/earn-points.svg'),
          benefitTitle:
            'newest_features.rewards_program.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.rewards_program.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/redeem-for-free-items.svg'),
          benefitTitle:
            'newest_features.rewards_program.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.rewards_program.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/track-rewards.svg'),
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

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.features-container::v-deep
  .feature-content
    .cards-wrapper-main
      padding: 0px 0px 100px 0px !important
      gap: 32px
      .cards-wrapper
        gap: 32px
        > div::v-deep
          min-height: 300px
          img
            min-height: 100px


@media (max-width: 1000px)
  .features-container
    .feature-content
      .cards-wrapper-main
        padding: 0px 0px 100px 0px !important
        gap: 18px
        .cards-wrapper
          gap: 18px

@media (max-width: 768px)
  .features-container
    .feature-content
      .cards-wrapper-main
        padding: 0px 16px 40px 16px !important
        gap: 9px
        .cards-wrapper
          gap: 9px
          justify-content: center
</style>
