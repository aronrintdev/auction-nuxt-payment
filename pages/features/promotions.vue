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
      <div
        class="d-flex align-items-center justify-content-between position-relative options-section mb-5"
      >
        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="
              require('~/assets/img/features/newest-feature/promotions/car.svg')
            "
            :title="$t('common.apparel')"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="
              require('~/assets/img/features/newest-feature/promotions/shoes.svg')
            "
            :title="$tc('common.hat', 2)"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="
              require('~/assets/img/features/newest-feature/promotions/cash.svg')
            "
            :title="$tc('common.accessory', 2)"
            variant="round"
          />
        </div>

        <div class="mid-line position-absolute"></div>
      </div>
    </FeatureContentWrapper>
  </div>
</template>
<script>
import FeatureContentWrapper from '~/components/feature/ContentWrapper'
import HorizontalBenefitBox from '~/components/feature/HorizontalBenefitBox'
import FeatureTitle from '~/components/feature/Title'
import FeatureCardHoverableRound from '~/components/feature/CardHoverableRound'

export default {
  components: {
    FeatureContentWrapper,
    HorizontalBenefitBox,
    FeatureTitle,
    FeatureCardHoverableRound,
  },

  layout: 'IndexLayout',

  data() {
    return {
      banner: {
        title: 'newest_features.promotions.feature_banner_title',
        description: 'newest_features.promotions.feature_banner_desc',
        backgroundImage: require('@/assets/img/features/newest-feature/promotions/promotions-banner.png'),
        backgroundImageSm: require('@/assets/img/features/newest-feature/promotions/promotions-banner-sm.png'),
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
@import '~/assets/css/_variables'
.features-container
  .feature-content

    .feature-item
      margin-bottom: 115px

    .options-section
      margin: 0px 80px
      .mid-line
        width: 100%
        border-bottom: 1px solid $color-black-1

      .card-wrapper
        z-index: 1
        background-color: $color-white-1
        padding: 0 20px
        background-color: $color-gray-1

@media (max-width: 1200px)
  .features-container
    .feature-content
      .options-section
        margin: 0px 0px
        .mid-line
          width: 100%
          border-bottom: 1px solid $color-black-1
@media (max-width: 1000px)
  .features-container
    .feature-content
      .options-section
        margin: 0px 0px
        .card-wrapper
          padding: 20px 0
          margin: 20px 0

@media (max-width: 578px)
  .features-container
    .feature-content
      .feature-item::v-deep
        flex-direction: column
        align-items: center
        .img-wrapper
          margin: 0
          margin-bottom: 20px

        .text-wrapper
          text-align: center
      .options-section
        margin: 0px 0px
        .card-wrapper
          padding: 0 10px
          background-color: $color-white-1
</style>
