<template>
  <div class="rewards-program-main">
    <FeatureContentWrapper
      :backgroundImage="banner.backgroundImage"
      :backgroundImageXS="banner.backgroundImageXS"
      :bottomBannerImage="bottomBanner.bottomBannerImage"
      :bottomBannerImageXS="bottomBanner.bottomBannerImageXS"
      :bottomBannerDescription="bottomBanner.bottomBannerDescription"
      :bottomBannerDescriptionXS="bottomBanner.bottomBannerDescriptionXS"
      :bottomBannerButtonLink="bottomBanner.bottomBannerButtonLink"
      :bottomBannerButtonText="bottomBanner.bottomBannerButtonText"
      :previousPage="bottomBanner.previousPage"
      :previousPageXS="bottomBanner.previousPageXS"
      :previousPageLink="bottomBanner.previousPageLink"
      :nextPage="bottomBanner.nextPage"
      :nextPageXS="bottomBanner.nextPageXS"
      :nextPageLink="bottomBanner.nextPageLink"
    >
      <HorizontalBenefitBox
        v-for="(benefit, index) in benefits"
        :key="index"
        :benefitImage="benefit.benefitImage"
        :benefitImageXS="benefit.benefitImageXS"
        :benefitTitle="benefit.benefitTitle"
        :benefitDescription="benefit.benefitDescription"
      />
      <FeatureTitle class="feature-title-my">
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
              require('~/assets/img/features/newest-feature/rewards-program/hammer.png')
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
        backgroundImage: require('@/assets/img/features/newest-feature/rewards-program/rewards-program-banner.jpg'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/rewards-program/rewards-program-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/earn-points.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/rewards-program/earn-points-xs.png'),
          benefitTitle:
            'newest_features.rewards_program.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.rewards_program.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/redeem-for-free-items.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/rewards-program/redeem-for-free-items-xs.png'),
          benefitTitle:
            'newest_features.rewards_program.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.rewards_program.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/rewards-program/track-rewards.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/rewards-program/track-rewards-xs.png'),
          benefitTitle:
            'newest_features.rewards_program.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.rewards_program.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/rewards-program/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/rewards-program/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.rewards_program.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.rewards_program.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/view-rewards',
        bottomBannerButtonText:
          'newest_features.rewards_program.bottom_banner.button_text',
        previousPage:
          'newest_features.rewards_program.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.rewards_program.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/live-customer-service',
        nextPage:
          'newest_features.rewards_program.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.rewards_program.bottom_banner.next_page_xs_title',
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
  .rewards-program-main
    .feature-four-cards
      height: 231px
@media screen and (max-width: 577px)
  .features-container
    .feature-content
      .feature-title-my
        width: 100%
        margin-top: 48px !important
        margin-bottom: 24px !important
</style>
