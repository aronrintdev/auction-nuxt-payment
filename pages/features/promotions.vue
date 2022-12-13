<template>
  <div class="promotions-main">
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
        {{ $t('newest_features.promotions.prizes') }}
      </FeatureTitle>
      <div class="cards-wrapper-in-app d-flex flex-column align-items-center">
        <div class="in-app-cards">
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/promotions/car-2.svg')
            "
            :title="$t('newest_features.promotions.cards.title1')"
          />
          <span class="before d-md-none d-block mx-auto"></span>
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/promotions/shoes-2.svg')
            "
            :title="$t('newest_features.promotions.cards.title2')"
            class="feature-four-cards-center-promotions"
          />
          <span class="after d-md-none d-block mx-auto"></span>
          <FeatureFourCards
            :icon="
              require('~/assets/img/features/newest-feature/promotions/cash-2.svg')
            "
            :title="$t('newest_features.promotions.cards.title3')"
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
        backgroundImage: require('@/assets/img/features/newest-feature/promotions/promotions-banner.png'),
        backgroundImageXS: require('@/assets/img/features/newest-feature/promotions/promotions-banner-xs.png'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/promotions/new-raffles.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/promotions/new-raffles-xs.png'),
          benefitTitle:
            'newest_features.promotions.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.promotions.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/promotions/never-miss-a-promotion.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/promotions/never-miss-a-promotion-xs.png'),
          benefitTitle:
            'newest_features.promotions.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.promotions.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/promotions/exclusive-to-deadstock.png'),
          benefitImageXS: require('@/assets/img/features/newest-feature/promotions/exclusive-to-deadstock-xs.png'),
          benefitTitle:
            'newest_features.promotions.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.promotions.benefits.third_benefit_desc',
        },
      ],
      bottomBanner: {
        bottomBannerImage: require('@/assets/img/features/newest-feature/promotions/bottom-banner.png'),
        bottomBannerImageXS: require('@/assets/img/features/newest-feature/promotions/bottom-banner-xs.png'),
        bottomBannerDescription:
          'newest_features.promotions.bottom_banner.desc',
        bottomBannerDescriptionXS:
          'newest_features.promotions.bottom_banner.desc_xs',
        bottomBannerButtonLink: '/browse',
        bottomBannerButtonText:
          'newest_features.promotions.bottom_banner.button_text',
        previousPage:
          'newest_features.promotions.bottom_banner.previous_page_title',
        previousPageXS:
          'newest_features.promotions.bottom_banner.previous_page_xs_title',
        previousPageLink: '/features/csv-bulk-uploading',
        nextPage: 'newest_features.promotions.bottom_banner.next_page_title',
        nextPageXS:
          'newest_features.promotions.bottom_banner.next_page_xs_title',
        nextPageLink: '/features/damaged-packaging',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@media (min-width: 768px)
  .promotions-main::v-deep
      .cards-wrapper-in-app
        .in-app-cards
          .feature-four-cards-center-promotions
            img
              margin-top: -20px
            .feature-title
              margin-top: 10px

@media (max-width: 768px)
  .promotions-main::v-deep
    .cards-wrapper-in-app
      .in-app-cards
        .feature-four-cards
          border-radius: 50% !important
          .feature-title
            margin-top: -9px


@media screen and (max-width: 577px)
  .feature-title-my
    margin-top: 48px !important
    margin-bottom: 24px !important
</style>
