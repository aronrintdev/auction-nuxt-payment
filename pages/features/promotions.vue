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
        title: 'newest_features.promotions.feature_banner_title',
        description: 'newest_features.promotions.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/promotions/promotions-banner.svg'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/promotions/promotions-banner-sm.svg'),
      },
      benefits: [
        {
          benefitImage: require('@/assets/img/features/newest-feature/promotions/new-raffles.png'),
          benefitTitle:
            'newest_features.promotions.benefits.first_benefit_title',
          benefitDescription:
            'newest_features.promotions.benefits.first_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/promotions/never-miss-a-promotion.png'),
          benefitTitle:
            'newest_features.promotions.benefits.second_benefit_title',
          benefitDescription:
            'newest_features.promotions.benefits.second_benefit_desc',
        },
        {
          benefitImage: require('@/assets/img/features/newest-feature/promotions/exclusive-to-deadstock.png'),
          benefitTitle:
            'newest_features.promotions.benefits.third_benefit_title',
          benefitDescription:
            'newest_features.promotions.benefits.third_benefit_desc',
        },
      ],
      shopNowBanner: {
        shopNowDescription: 'newest_features.promotions.shop_now_banner.desc',
        shopNowButtonText:
          'newest_features.promotions.shop_now_banner.button_text',
        previousPage: 'newest_features.csv_bulk_uploading.title',
        previousPageLink: '/features/csv-bulk-uploading',
        nextPage: 'newest_features.damaged_box_items.title',
        nextPageLink: '/features/damaged-box-items',
      },
    }
  },
}
</script>
<style lang="sass" scoped>
@media (max-width: 768px)
  .cards-wrapper-in-app
    .in-app-cards
      .feature-four-cards
        border-radius: 50% !important
</style>
