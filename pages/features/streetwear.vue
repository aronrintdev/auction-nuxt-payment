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
      <div
        class="d-flex align-items-center justify-content-between position-relative options-section mb-5"
      >
        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="require('~/assets/img/features/streetwear/cloth.svg')"
            :title="$t('common.apparel')"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="require('~/assets/img/features/streetwear/hat.svg')"
            :title="$tc('common.hat', 2)"
            variant="round"
          />
        </div>

        <div class="card-wrapper">
          <FeatureCardHoverableRound
            :icon="require('~/assets/img/features/streetwear/watch.svg')"
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
        background-color: #F5F5F5

@media (max-width: 1200px)
  .features-container
    .feature-content
      .options-section
        margin: 0px 40px
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
          background-color: white
</style>
